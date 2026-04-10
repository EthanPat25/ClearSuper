import pandas as pd
from abc import ABC, abstractmethod
import os


# Abolute path which gives data directory
DATA_DIRECTORY = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data")


def run_all_parsers():

    # Check Directory Exist
    if not os.path.isdir(DATA_DIRECTORY):
        return 1
    
    for Super_Fund in os.listdir(DATA_DIRECTORY):
        fund_dir = os.path.join(DATA_DIRECTORY, Super_Fund)

        if not os.path.isdir(fund_dir):
            continue

        raw_dir = os.path.join(fund_dir, "Raw")
        normalised_dir = os.path.join(fund_dir, "Normalised")

        if not os.path.isdir(raw_dir):
            continue

        # Make Normalises If doesn't exist
        if not os.path.isdir(normalised_dir):
            os.makedirs(normalised_dir, exist_ok=True)

        for raw_file in os.listdir(raw_dir):
            file_path = os.path.join(raw_dir, raw_file)
            fund = FUNDS[Super_Fund](file_path)
            fund.run(normalised_dir)


class superFund(ABC):
    def __init__(self, file_path):
        self.df = None
        self.totals_df = None 
        self.derivatives_df = None
        self.file_path = file_path 
        self.as_of_date = None

    def run(self, Normalised_Directory):
        self.parse() 
        self.remove_totals()
        self.normalise_company_names()
        self.normalise_percentage()
        self.normalise_dollar()
        self.remove_derivatives()
        self.recompute_percentages()
        self.save_to_normalized_file(Normalised_Directory)
        print(self.file_path + " " + os.path.splitext(os.path.basename(self.file_path))[0] + ": Completed")

    @abstractmethod
    def parse(self):
        """Each child fund implements its own parsing logic."""
        pass

    @abstractmethod
    def remove_totals(self):
        pass

    def remove_derivatives(self):
        # Default no-op. Funds that have derivative rows override this.
        pass

    def save_to_normalized_file(self, output_directory):
        file_name = os.path.splitext(os.path.basename(self.file_path))[0]
        full_output_path = os.path.join(output_directory, f"{file_name}.normalised.csv")
        self.df.to_csv(full_output_path, index=False)

    def normalise_percentage(self):
        if "Weighting_Percentage" in self.df.columns:
            self.df["Weighting_Percentage"] = pd.to_numeric(
                self.df["Weighting_Percentage"]
                .astype(str)
                .str.replace('%', '', regex=False)
                .str.strip(),
                errors="coerce"
            )
          
    def normalise_dollar(self):
        if "Dollar_Value" in self.df.columns:
          self.df["Dollar_Value"] = pd.to_numeric(
                self.df["Dollar_Value"]
                .astype(str)
                .str.replace(r'[$,]', '', regex=True)
                .str.replace(r'^\s*-\s*$', '', regex=True)
                .str.strip(),
                errors="coerce"
            )
          
    # Clean Names - remove trailing whitespace etc
    def normalise_company_names(self):
        if "Name" not in self.df.columns:
            return

        mask = (
            self.df["Listing_Status"].str.contains("Listed", case=False, na=False)
            & self.df["Asset_Class"].str.contains("Equity", case=False, na=False)
        )

        self.df.loc[mask, "Name"] = (
            self.df.loc[mask, "Name"]
            .str.replace(r"\s+", " ", regex=True)
            .str.strip()
            .str.title()
        )


    # Always check dollar values are in AUD
    def recompute_percentages(self):
        if "Dollar_Value" not in self.df.columns:
            return

        self.df["Dollar_Value"] = pd.to_numeric(self.df["Dollar_Value"], errors="coerce")

        null_count = self.df["Dollar_Value"].isna().sum()
        if null_count > 0:
            print(f"WARNING: {null_count} rows have unparseable Dollar_Value...")

        total = self.df["Dollar_Value"].sum()

        if total <= 0:
            raise ValueError(
                f"Dollar_Value total is {total}. All values may have failed to parse — "
                "check the source file format hasn't changed."
            )

        self.df["Weighting_Percentage_Clean"] = (self.df["Dollar_Value"] / total) * 100

class AustralianSuper(superFund):
    def parse(self):
        df = pd.read_csv(self.file_path)

        df = df[[
            "Option Name", "Asset Class", "Name", "Filter", "Sub-Filter","Name Type",
            "Currency", "Security Identifier", "$ Value", "Weighting (%)"
        ]]

        df["combined"] = df["Filter"].fillna('') + " " + df["Sub-Filter"].fillna('')
        df["Listing_Status"] = df["combined"].str.extract(r'(?i)(Listed|Unlisted)', expand=False)
        df["Management_Type"] = df["combined"].str.extract(r'(?i)(Internally Managed|Externally Managed)', expand=False)
        df.drop(columns=["combined", "Filter", "Sub-Filter"], inplace=True)

        df["Management_Type"] = df["Management_Type"].fillna("").str.title()
        df["Listing_Status"] = df["Listing_Status"].fillna("").str.title()
        df["Super_Fund"] = self.__class__.__name__

        df["Management_Type"] = (
            df["Management_Type"]
            .replace({
                "Internally Managed": "Internally",
                "Externally Managed": "Externally"
            })
        )

        df.rename(columns = {
            "Option Name": "Option_Name",
            "Asset Class": "Asset_Class",
            "Name Type": "Name_Type",
            "Security Identifier": "Security_Identifier",
            "$ Value": "Dollar_Value",
            "Weighting (%)": "Weighting_Percentage",
        }, inplace=True)

        self.df = df


    def remove_totals(self):
        if 'Name' in self.df.columns and 'Name_Type' in self.df.columns:
            mask = (self.df['Name'].astype(str).str.strip().str.fullmatch(r"(?i)Total")) & \
                   (self.df['Name_Type'].astype(str).str.strip().str.fullmatch(r"(?i)Total"))
            
            self.totals_df = self.df[mask]
            self.df = self.df[~mask]
            self.df = self.df.drop(columns=['Name_Type'])
            # Rest Index
            self.df = self.df.reset_index(drop=True)

    def remove_derivatives(self):
        if 'Asset_Class' in self.df.columns:
            mask = self.df['Asset_Class'].astype(str).str.strip().str.contains(r'(?i)^Derivatives', na=False)
            
            self.derivatives_df = self.df[mask]
            self.df = self.df[~mask]
            
            self.df = self.df.reset_index(drop=True)

    
class Rest(superFund):
    def parse(self):
        df = pd.read_excel(self.file_path, header=1, engine="openpyxl")

        df["Name"] = (
            df["NAME / KIND OF INVESTMENT ITEM"].replace("-", pd.NA)
            .fillna(df["NAME OF INSTITUTION"].replace("-", pd.NA))
            .fillna(df["NAME OF ISSUER / COUNTERPARTY"].replace("-", pd.NA))
            .fillna(df["NAME OF FUND MANAGER"].replace("-", pd.NA))
        )

       
        df = df[[
            "ASSET CLASS", "INTERNALLY MANAGED OR EXTERNALLY MANAGED", "Name", "VALUE(AUD)", "WEIGHTING(%)", "SECURITY IDENTIFIER", "CURRENCY"
        ]]

        df["Listing_Status"] = df["ASSET CLASS"].str.extract(r'(?i)^(LISTED|UNLISTED)', expand=False)
        df["ASSET CLASS"] = df["ASSET CLASS"].str.replace(r'(?i)^(LISTED|UNLISTED)\s*', '', regex=True)
        df["Listing_Status"] = df["Listing_Status"].fillna("").str.title()
        df["ASSET CLASS"] = df["ASSET CLASS"].fillna("").str.title()
        df["Super_Fund"] = self.__class__.__name__
        file_name = os.path.splitext(os.path.basename(self.file_path))[0]
        option_name = file_name.replace("_", " ").strip().title()
        df["Option_Name"] = option_name
        
        df.rename(columns = {
            "ASSET CLASS": "Asset_Class",
            "INTERNALLY MANAGED OR EXTERNALLY MANAGED": "Management_Type", 
            "CURRENCY": "Currency",
            "SECURITY IDENTIFIER": "Security_Identifier",
            "VALUE(AUD)": "Dollar_Value",
            "WEIGHTING(%)": "Weighting_Percentage",
        }, inplace=True)

        df["Management_Type"] = df["Management_Type"].fillna("").str.title()

        self.df = df


    def remove_totals(self):
      if 'Asset_Class' in self.df.columns:
        values = self.df['Asset_Class'].astype(str).str.strip()
        mask = values.str.contains(r'(?i)total', na=False)
        clean_mask = mask.fillna(False)
        self.totals_df = self.df[clean_mask]
        self.df = self.df[~clean_mask]
        self.df = self.df.reset_index(drop=True)


class AwareSuper(superFund):
    def parse(self):

        # Broader Encoding for AwareSuper
        df = pd.read_csv(self.file_path, skiprows=1, encoding="latin-1")

        # Remove "-"
        def clean(col):
            return df[col].replace("-", None).replace("", None)
        
        df["Name"] = (
            clean("NAME OF INSTITUTION")
            .fillna(clean("NAME / KIND OF INVESTMENT ITEM"))
            .fillna(clean("NAME OF ISSUER / COUNTERPARTY"))
            .fillna(clean("NAME OF FUND MANAGER"))
        )

        df = df[[
            "ASSET CLASS", "INTERNALLY MANAGED OR EXTERNALLY MANAGED", "Name", "VALUE(AUD)", "WEIGHTING(%)", "SECURITY IDENTIFIER"
        ]]

        df["Listing_Status"] = df["ASSET CLASS"].str.extract(r'(?i)^(LISTED|UNLISTED)', expand=False)
        df["ASSET CLASS"] = df["ASSET CLASS"].str.replace(r'(?i)^(LISTED|UNLISTED)\s*', '', regex=True)

        df["Management_Type"] = df["INTERNALLY MANAGED OR EXTERNALLY MANAGED"].replace("-", None)
        df["Management_Type"] = df["Management_Type"].replace({
            "Internally Managed": "Internally",
            "Externally Managed": "Externally"
        })

        df["Super_Fund"] = self.__class__.__name__


        df.rename(columns={
            "ASSET CLASS": "Asset_Class",
            "SECURITY IDENTIFIER": "Security_Identifier",
            "VALUE(AUD)": "Dollar_Value",
            "WEIGHTING(%)": "Weighting_Percentage",
        }, inplace=True)

        self.df = df


    def remove_totals(self):
        if 'Name' in self.df.columns and 'Name_Type' in self.df.columns:
            mask = (self.df['Name'].astype(str).str.strip().str.fullmatch(r"(?i)Total")) & \
                   (self.df['Name_Type'].astype(str).str.strip().str.fullmatch(r"(?i)Total"))
            
            self.totals_df = self.df[mask]
            self.df = self.df[~mask]
            self.df = self.df.drop(columns=['Name_Type'])
            # Rest Index
            self.df = self.df.reset_index(drop=True)

    def remove_derivatives(self):
        if 'Asset_Class' in self.df.columns:
            mask = self.df['Asset_Class'].astype(str).str.strip().str.contains(r'(?i)^Derivatives', na=False)
            
            self.derivatives_df = self.df[mask]
            self.df = self.df[~mask]
            
            self.df = self.df.reset_index(drop=True)



class ART(superFund):
    def parse(self):
        df = pd.read_csv(self.file_path)

        df = df[[
            "OptionName", "Type", "Name", "Currency", "SecurityIdentifier", "Value", "Weighting"
        ]]

        df["Super_Fund"] = self.__class__.__name__

        df.rename(columns = {
            "OptionName": "Option_Name",
            "Type": "Asset_Class",
            "SecurityIdentifier": "Security_Identifier",
            "Value": "Dollar_Value",
            "Weighting": "Weighting_Percentage",
        }, inplace=True)

        self.df = df

    def remove_totals(self):
        pass


    def remove_derivatives(self):
        pass

def test(df):
    suffixes = ["GROUP", "LTD", "LIMITED", "CORP", "CORPORATION",
                    "INC", "HOLDINGS?", "PTY", "PLC", "CO", "LP"]

    pattern = r"\b(" + "|".join(suffixes) + r")\b"

    mask = df["Listing_Status"].str.contains("Listed", case=False, na=False) & \
        df["Asset_Class"].str.contains("Equity", case=False, na=False)
    
    df.loc[mask, "Name"] = (
        df.loc[mask, "Name"]
        .str.replace(pattern, "", regex=True, case=False)   
        .str.replace(",", "", regex=False)                
        .str.replace(r"\.(?!com\b)(?!co\b)", "", regex=True)  
        .str.replace(r"\s+", " ", regex=True)            
        .str.strip()                                     
        .str.title()
    )
        
FUNDS = {
    "AustralianSuper": AustralianSuper,
    "Rest":            Rest,
    "Aware":           AwareSuper,
    "ART":             ART,
}

if __name__ == "__main__":
    run_all_parsers()

