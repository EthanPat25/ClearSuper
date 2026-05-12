import pandas as pd
from abc import ABC, abstractmethod
import os
import re

# Absolute path to the data directory, derived from wherever this script lives.
# This replaces the os.chdir() approach in etl.py, which was fragile — a single
# failed file would leave the process in the wrong directory for everything after it.
DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data")


def run_all_parsers():
    if not os.path.isdir(DATA_DIR):
        raise FileNotFoundError(f"Data directory not found: {DATA_DIR}")

    for fund_name in os.listdir(DATA_DIR):
        fund_dir = os.path.join(DATA_DIR, fund_name)
        if not os.path.isdir(fund_dir):
            continue

        raw_dir = os.path.join(fund_dir, "Raw")
        normalised_dir = os.path.join(fund_dir, "Normalised")

        if not os.path.isdir(raw_dir):
            continue

        if fund_name not in FUND_PARSERS:
            print(f"WARNING: No parser registered for '{fund_name}' — skipping.")
            continue

        os.makedirs(normalised_dir, exist_ok=True)

        for raw_file in os.listdir(raw_dir):
            file_path = os.path.join(raw_dir, raw_file)
            try:
                parser_class = FUND_PARSERS[fund_name]
                parser = parser_class(file_path)
                parser.run(normalised_dir)
                print(f"{fund_name} {os.path.splitext(raw_file)[0]}: Completed")
            except Exception as e:
                # One bad file should not crash the whole run. Log and continue.
                print(f"ERROR: {fund_name}/{raw_file} failed — {e}")


class superFund(ABC):
    def __init__(self, file_path):
        self.df = None
        self.totals_df = None
        self.derivatives_df = None
        self.file_path = file_path
        # Parsers that can extract a date from their source file should set this.
        # It gets stamped on the output filename so you can distinguish quarterly snapshots.
        # Parsers that can't find a date leave it as None and a warning is printed.
        self.as_of_date = None

    def run(self, output_directory):
        self.parse()
        self.remove_totals()
        self.remove_derivatives()
        self.normalise_company_names()
        self.normalise_percentage()
        self.normalise_dollar()
        self.recompute_percentages()
        self.save_to_normalized_file(output_directory)

    @abstractmethod
    def parse(self):
        pass

    @abstractmethod
    def remove_totals(self):
        pass

    def remove_derivatives(self):
        # Default no-op. Funds that have derivative rows override this.
        pass

    def _validate_columns(self, df, expected_cols):
        """Raise early with a clear message if source columns have changed."""
        missing = [c for c in expected_cols if c not in df.columns]
        if missing:
            raise ValueError(
                f"{self.__class__.__name__}: source file is missing expected columns: {missing}. "
                "The fund may have changed their disclosure format."
            )

    def save_to_normalized_file(self, output_directory):
        base = os.path.splitext(os.path.basename(self.file_path))[0]
        if self.as_of_date:
            output_name = f"{base}_{self.as_of_date}.normalised.csv"
        else:
            output_name = f"{base}.normalised.csv"
            print(f"  WARNING: No as_of_date found for {base} — output has no date stamp. "
                  "Consider naming raw files with a date suffix, e.g. Balanced_2024-09.csv.")
        full_output_path = os.path.join(output_directory, output_name)
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
            self.df["Dollar_Value"] = (
                self.df["Dollar_Value"]
                .astype(str)
                .str.replace(r'[$,]', '', regex=True)
                # Only replace a dash that is the entire cell value — it means empty/zero
                # in some fund formats. Do NOT strip the minus sign from negative numbers
                # like "-4,922,222" (short positions, hedges). The original code stripped
                # ALL dashes which silently made negative values positive.
                .str.replace(r'^\s*-\s*$', '', regex=True)
            )

    def normalise_company_names(self):
        if "Name" not in self.df.columns or "Listing_Status" not in self.df.columns:
            return

        mask = (
            self.df["Listing_Status"].str.contains("Listed", case=False, na=False)
            & self.df["Asset_Class"].str.contains("Equity", case=False, na=False)
        )

        suffixes = ["GROUP", "LTD", "LIMITED", "CORP", "CORPORATION",
                    "INC", "HOLDINGS?", "PTY", "PLC", "CO", "LP"]
        suffix_pattern = r"\b(" + "|".join(suffixes) + r")\b"

        self.df.loc[mask, "Name"] = (
            self.df.loc[mask, "Name"]
            .str.replace(suffix_pattern, "", regex=True, case=False)
            .str.replace(",", "", regex=False)
            .str.replace(r"\.(?!com\b)(?!co\b)", "", regex=True)
            .str.replace(r"\s+", " ", regex=True)
            .str.strip()
            .str.title()
        )

        # Overrides use a list (not a dict) to guarantee order. More specific patterns
        # must come before general ones — e.g. "citigroup.*" -> "Citi" must run before
        # "citi.*" -> "Citi Bank", otherwise Citigroup first becomes "Citi" then gets
        # replaced again to "Citi Bank". The original code used a dict which has
        # insertion-order in Python 3.7+ but the Citi/Citigroup entries were in the
        # wrong order, causing the bug.
        overrides = [
            (r"(?i)^citigroup.*",               "Citi"),           # before generic "citi.*"
            (r"(?i)^amazon.*",                  "Amazon"),
            (r"(?i)^eli lilly.*",               "Eli Lilly"),
            (r"(?i)^booking holdings.*",         "Booking Holdings"),
            (r"(?i)^merck.*",                   "Merck"),
            (r"(?i)^bhp$",                      "BHP"),
            (r"(?i)^national.*australia.*bank.*","NAB"),
            (r"(?i)^westpac.*",                 "Westpac"),
            (r"(?i)^taiwan semiconductor.*",    "TSMC"),
            (r"(?i)^commonwealth bank.*",       "CommBank"),
            (r"(?i)^auckland.*airport.*",       "Auckland Airport"),
            (r"(?i)^mirvac.*",                  "Mirvac"),
            (r"(?i)^carsales.*",                "Carsales"),
            (r"(?i)^goodman.*",                 "Goodman"),
            (r"(?i)^jpmorgan.*",                "JPMorgan"),
            (r"(?i)^downer.*",                  "Downer Group"),
            (r"(?i)^citi.*",                    "Citi Bank"),      # after "citigroup.*"
            (r"(?i)^costco.*",                  "Costco"),
            (r"(?i)^meta.*",                    "Meta"),
        ]

        for pattern, replacement in overrides:
            self.df.loc[mask, "Name"] = self.df.loc[mask, "Name"].str.replace(
                pattern, replacement, regex=True
            )

    def recompute_percentages(self):
        if "Dollar_Value" not in self.df.columns:
            return

        self.df["Dollar_Value"] = pd.to_numeric(self.df["Dollar_Value"], errors="coerce")

        null_count = self.df["Dollar_Value"].isna().sum()
        if null_count > 0:
            print(f"  WARNING: {null_count} rows have unparseable Dollar_Value — "
                  "these rows are excluded from the total, so all percentages will be slightly inflated.")

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

        expected = [
            "Option Name", "Asset Class", "Name", "Filter", "Sub-Filter",
            "Name Type", "Currency", "Security Identifier", "$ Value", "Weighting (%)"
        ]
        self._validate_columns(df, expected)

        df = df[expected]

        df["combined"] = df["Filter"].fillna('') + " " + df["Sub-Filter"].fillna('')
        df["Listing_Status"] = df["combined"].str.extract(r'(?i)(Listed|Unlisted)', expand=False)
        df["Management_Type"] = df["combined"].str.extract(r'(?i)(Internally Managed|Externally Managed)', expand=False)
        df.drop(columns=["combined", "Filter", "Sub-Filter"], inplace=True)

        df["Management_Type"] = df["Management_Type"].fillna("").str.title().replace(
            {"Internally Managed": "Internally", "Externally Managed": "Externally"}
        )
        df["Listing_Status"] = df["Listing_Status"].fillna("").str.title()
        df["Super_Fund"] = self.__class__.__name__

        df.rename(columns={
            "Option Name":       "Option_Name",
            "Asset Class":       "Asset_Class",
            "Name Type":         "Name_Type",
            "Security Identifier": "Security_Identifier",
            "$ Value":           "Dollar_Value",
            "Weighting (%)":     "Weighting_Percentage",
        }, inplace=True)

        self.df = df
        # AustralianSuper disclosures don't include a date inside the file.
        # Name your raw files with a date suffix (e.g. Balanced_2024-09.csv)
        # and set self.as_of_date here by parsing the filename if you want dated outputs.

    def remove_totals(self):
        if 'Name' in self.df.columns and 'Name_Type' in self.df.columns:
            mask = (
                self.df['Name'].astype(str).str.strip().str.fullmatch(r"(?i)Total")
                & self.df['Name_Type'].astype(str).str.strip().str.fullmatch(r"(?i)Total")
            )
            self.totals_df = self.df[mask]
            self.df = self.df[~mask].drop(columns=['Name_Type']).reset_index(drop=True)

    def remove_derivatives(self):
        if 'Asset_Class' in self.df.columns:
            mask = self.df['Asset_Class'].astype(str).str.strip().str.contains(r'(?i)^Derivatives', na=False)
            self.derivatives_df = self.df[mask]
            self.df = self.df[~mask].reset_index(drop=True)


class Rest(superFund):
    def parse(self):
        # header=1 because Rest's Excel has a blank/title row before the real headers.
        df = pd.read_excel(self.file_path, header=1, engine="openpyxl")

        expected = [
            "ASSET CLASS", "INTERNALLY MANAGED OR EXTERNALLY MANAGED",
            "NAME / KIND OF INVESTMENT ITEM", "NAME OF INSTITUTION",
            "NAME OF ISSUER / COUNTERPARTY", "NAME OF FUND MANAGER",
            "VALUE(AUD)", "WEIGHTING(%)", "SECURITY IDENTIFIER", "CURRENCY"
        ]
        self._validate_columns(df, expected)

        df["Name"] = (
            df["NAME / KIND OF INVESTMENT ITEM"].replace("-", pd.NA)
            .fillna(df["NAME OF INSTITUTION"].replace("-", pd.NA))
            .fillna(df["NAME OF ISSUER / COUNTERPARTY"].replace("-", pd.NA))
            .fillna(df["NAME OF FUND MANAGER"].replace("-", pd.NA))
        )

        df = df[[
            "ASSET CLASS", "INTERNALLY MANAGED OR EXTERNALLY MANAGED",
            "Name", "VALUE(AUD)", "WEIGHTING(%)", "SECURITY IDENTIFIER", "CURRENCY"
        ]]

        df["Listing_Status"] = df["ASSET CLASS"].str.extract(r'(?i)^(LISTED|UNLISTED)', expand=False)
        df["ASSET CLASS"] = df["ASSET CLASS"].str.replace(r'(?i)^(LISTED|UNLISTED)\s*', '', regex=True)
        df["Listing_Status"] = df["Listing_Status"].fillna("").str.title()
        df["ASSET CLASS"] = df["ASSET CLASS"].fillna("").str.title()
        df["Super_Fund"] = self.__class__.__name__

        # Option name is derived from the filename since it's not inside the Excel file.
        # If you add dates to filenames (e.g. "Balanced_2024-09.xlsx"), strip the date
        # portion before setting Option_Name so it doesn't become "Balanced 2024 09".
        file_stem = os.path.splitext(os.path.basename(self.file_path))[0]
        option_name = re.sub(r'_\d{4}-\d{2}(-\d{2})?$', '', file_stem)
        df["Option_Name"] = option_name.replace("_", " ").strip().title()

        df.rename(columns={
            "ASSET CLASS":                              "Asset_Class",
            "INTERNALLY MANAGED OR EXTERNALLY MANAGED": "Management_Type",
            "CURRENCY":                                 "Currency",
            "SECURITY IDENTIFIER":                      "Security_Identifier",
            "VALUE(AUD)":                               "Dollar_Value",
            "WEIGHTING(%)":                             "Weighting_Percentage",
        }, inplace=True)

        df["Management_Type"] = df["Management_Type"].fillna("").str.title()
        self.df = df

    def remove_totals(self):
        if 'Asset_Class' in self.df.columns:
            mask = self.df['Asset_Class'].astype(str).str.strip().str.contains(
                r'(?i)^(SUB TOTAL|TOTAL)', na=False
            ).fillna(False)
            self.totals_df = self.df[mask]
            self.df = self.df[~mask].reset_index(drop=True)


class AwareSuper(superFund):
    def parse(self):
        # Row 0 of Aware's CSV is a metadata line, e.g.:
        # "PHD SCHEDULE 8D ... - ASSETS - 2025-06-30"
        # Row 1 is the actual column headers. So we skip row 0 and use row 1 as header.
        with open(self.file_path, encoding="utf-8") as f:
            metadata_line = f.readline()
        date_match = re.search(r'(\d{4}-\d{2}-\d{2})', metadata_line)
        if date_match:
            self.as_of_date = date_match.group(1)

        df = pd.read_csv(self.file_path, skiprows=1)

        expected = [
            "ASSET CLASS", "INTERNALLY MANAGED OR EXTERNALLY MANAGED",
            "NAME OF INSTITUTION", "NAME / KIND OF INVESTMENT ITEM",
            "NAME OF ISSUER / COUNTERPARTY", "NAME OF FUND MANAGER",
            "VALUE(AUD)", "WEIGHTING(%)", "SECURITY IDENTIFIER", "CURRENCY"
        ]
        self._validate_columns(df, expected)

        df["Name"] = (
            df["NAME / KIND OF INVESTMENT ITEM"].replace("-", pd.NA)
            .fillna(df["NAME OF INSTITUTION"].replace("-", pd.NA))
            .fillna(df["NAME OF ISSUER / COUNTERPARTY"].replace("-", pd.NA))
            .fillna(df["NAME OF FUND MANAGER"].replace("-", pd.NA))
        )

        df = df[[
            "ASSET CLASS", "INTERNALLY MANAGED OR EXTERNALLY MANAGED",
            "Name", "VALUE(AUD)", "WEIGHTING(%)", "SECURITY IDENTIFIER", "CURRENCY"
        ]]

        df["Listing_Status"] = df["ASSET CLASS"].str.extract(r'(?i)^(LISTED|UNLISTED)', expand=False)
        df["ASSET CLASS"] = df["ASSET CLASS"].str.replace(r'(?i)^(LISTED|UNLISTED)\s*', '', regex=True)
        df["Listing_Status"] = df["Listing_Status"].fillna("").str.title()
        df["ASSET CLASS"] = df["ASSET CLASS"].fillna("").str.title()
        df["Super_Fund"] = self.__class__.__name__

        file_stem = os.path.splitext(os.path.basename(self.file_path))[0]
        option_name = re.sub(r'_\d{4}-\d{2}(-\d{2})?$', '', file_stem)
        df["Option_Name"] = option_name.replace("_", " ").strip().title()

        df.rename(columns={
            "ASSET CLASS":                              "Asset_Class",
            "INTERNALLY MANAGED OR EXTERNALLY MANAGED": "Management_Type",
            "CURRENCY":                                 "Currency",
            "SECURITY IDENTIFIER":                      "Security_Identifier",
            "VALUE(AUD)":                               "Dollar_Value",
            "WEIGHTING(%)":                             "Weighting_Percentage",
        }, inplace=True)

        df["Management_Type"] = df["Management_Type"].fillna("").str.title().replace(
            {"Internally Managed": "Internally", "Externally Managed": "Externally"}
        )
        self.df = df

    def remove_totals(self):
        if 'Asset_Class' in self.df.columns:
            mask = self.df['Asset_Class'].astype(str).str.strip().str.contains(
                r'(?i)^(SUB TOTAL|TOTAL)', na=False
            ).fillna(False)
            self.totals_df = self.df[mask]
            self.df = self.df[~mask].reset_index(drop=True)

    def remove_derivatives(self):
        if 'Asset_Class' in self.df.columns:
            mask = self.df['Asset_Class'].astype(str).str.strip().str.contains(
                r'(?i)^Derivatives', na=False
            )
            self.derivatives_df = self.df[mask]
            self.df = self.df[~mask].reset_index(drop=True)


class ART(superFund):
    def parse(self):
        df = pd.read_csv(self.file_path)

        expected = ["AsAtDate", "OptionName", "Type", "Name", "Currency",
                    "SecurityIdentifier", "Value", "Weighting"]
        self._validate_columns(df, expected)

        # ART includes a date column on every row — use the first value as the snapshot date.
        raw_date = df["AsAtDate"].dropna().iloc[0] if not df["AsAtDate"].dropna().empty else None
        if raw_date:
            try:
                self.as_of_date = pd.to_datetime(raw_date, dayfirst=True).strftime("%Y-%m-%d")
            except Exception:
                pass

        df = df[[
            "OptionName", "Type", "Name", "Currency", "SecurityIdentifier", "Value", "Weighting"
        ]]

        # Extract Listing_Status from the Type column (e.g. "Listed Equities", "Unlisted Infrastructure")
        # so normalise_company_names() can correctly filter to listed equities only.
        df["Listing_Status"] = df["Type"].str.extract(r'(?i)^(Listed|Unlisted)', expand=False).fillna("").str.title()
        df["Type"] = df["Type"].str.replace(r'(?i)^(Listed|Unlisted)\s*', '', regex=True).str.title()
        df["Super_Fund"] = self.__class__.__name__

        df.rename(columns={
            "OptionName":        "Option_Name",
            "Type":              "Asset_Class",
            "SecurityIdentifier": "Security_Identifier",
            "Value":             "Dollar_Value",
            "Weighting":         "Weighting_Percentage",
        }, inplace=True)

        self.df = df

    def remove_totals(self):
        if 'Name' in self.df.columns:
            mask = self.df['Name'].astype(str).str.strip().str.fullmatch(r"(?i)Total")
            self.totals_df = self.df[mask]
            self.df = self.df[~mask].reset_index(drop=True)


class Hesta(superFund):
    def parse(self):
        df = pd.read_csv(self.file_path)

        expected = [
            "Effective Date", "Option", "Asset Class",
            "Internal/External", "Name/kind of investment item",
            "Value (AUD)", "Weighting", "Currency", "Security Identifier"
        ]
        self._validate_columns(df, expected)

        raw_date = df["Effective Date"].dropna().iloc[0] if not df["Effective Date"].dropna().empty else None
        if raw_date:
            try:
                self.as_of_date = pd.to_datetime(raw_date, dayfirst=True).strftime("%Y-%m-%d")
            except Exception:
                pass

        df["Listing_Status"] = df["Asset Class"].str.extract(r'(?i)^(Listed|Unlisted)', expand=False).fillna("").str.title()
        df["Asset Class"] = df["Asset Class"].str.replace(r'(?i)^(Listed|Unlisted)\s*', '', regex=True).str.strip().str.title()

        df["Super_Fund"] = self.__class__.__name__

        df.rename(columns={
            "Option":                       "Option_Name",
            "Asset Class":                  "Asset_Class",
            "Internal/External":            "Management_Type",
            "Name/kind of investment item": "Name",
            "Value (AUD)":                  "Dollar_Value",
            "Weighting":                    "Weighting_Percentage",
            "Currency":                     "Currency",
            "Security Identifier":          "Security_Identifier",
        }, inplace=True)

        df = df[[
            "Option_Name", "Asset_Class", "Listing_Status", "Management_Type",
            "Name", "Dollar_Value", "Weighting_Percentage", "Currency",
            "Security_Identifier", "Super_Fund"
        ]]

        df["Management_Type"] = df["Management_Type"].fillna("").str.title()
        self.df = df

    def remove_totals(self):
        if 'Name' in self.df.columns:
            mask = self.df['Name'].astype(str).str.strip().str.contains(
                r'(?i)^(Total|Sub.?total)', na=False
            )
            self.totals_df = self.df[mask]
            self.df = self.df[~mask].reset_index(drop=True)


# HostPlus uses a multi-section CSV where each asset class is a separate table
# with its own header row. This requires a custom multi-pass reader and is not
# yet implemented. Files in HostPlus/Raw/ will be skipped with a warning.


# Registry mapping fund folder names to parser classes.
# If a folder has no entry here, run_all_parsers() prints a warning and skips it.
# Adding a new fund means: write a parser class above, then add it here.
FUND_PARSERS = {
    "AustralianSuper": AustralianSuper,
    "Rest":            Rest,
    "Aware":           AwareSuper,
    "ART":             ART,
    "Hesta":           Hesta,
    # "HostPlus": not yet implemented
}

run_all_parsers()
