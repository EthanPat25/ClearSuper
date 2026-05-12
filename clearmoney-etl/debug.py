"""
ETL debug tool — runs the parser directly and tags each row with why it was removed.

Usage:
    python debug.py --fund AustralianSuper
    python debug.py --fund Rest

Output:
    data/{fund}/Debug/{filename}_debug.csv
    _status column values: kept | removed_totals | removed_derivatives
"""

import argparse
import os
import sys

from etl import FUNDS

data_directory = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data")

Fund_Extension = {
    "AustralianSuper": ".csv",
    "Rest":            ".xlsx",
    "Aware":           ".csv",
    "ART":             ".csv",
}


def most_recent_file(directory: str, ext: str) -> str | None:
    candidates = [
        os.path.join(directory, f)
        for f in os.listdir(directory)
        if f.endswith(ext) and not f.startswith(".")
    ]
    if not candidates:
        return None
    return max(candidates, key=os.path.getmtime)


# Pass in fund name 
# import FUNDS Dictonary  
def run_debug(fund_name: str):

    superFundClass = FUNDS[fund_name]

    raw_dir    = os.path.join(data_directory, fund_name, "Raw")
    ext        = Fund_Extension[fund_name]

    raw_path = most_recent_file(raw_dir, ext)
    if raw_path is None:
        sys.exit(f"ERROR: no raw files found in {raw_dir}")

    superFundObject = superFundClass(raw_path)

    #Structure Data
    superFundObject.parse()

    # Stamp every row with a stable index before any mutations or resets
    superFundObject.df["_debug_idx"] = range(len(superFundObject.df))
    snapshot = superFundObject.df.copy()           # all original parsed columns + _debug_idx

    superFundObject.remove_totals()
    after_totals = set(superFundObject.df["_debug_idx"])

    superFundObject.remove_derivatives()
    after_derivatives = set(superFundObject.df["_debug_idx"])

    def classify(idx):
        if idx not in after_totals:
            return "removed_totals"
        if idx not in after_derivatives:
            return "removed_derivatives"
        return "kept"

    snapshot["_status"]   = snapshot["_debug_idx"].map(classify)
    snapshot = snapshot.drop(columns=["_debug_idx"])

    return snapshot, raw_path


def main():
    parser = argparse.ArgumentParser(description="Tag ETL removals by stage")
    parser.add_argument("--fund", required=True, choices=list(FUNDS.keys()))
    args = parser.parse_args()

    print(f"Parsing {args.fund}...")
    df, raw_path = run_debug(args.fund)

    stem    = os.path.splitext(os.path.basename(raw_path))[0]
    out_dir = os.path.join(data_directory, args.fund, "Debug")

    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, f"{stem}_debug.csv")

    df.to_csv(out_path, index=False)

    n_kept        = (df["_status"] == "kept").sum()
    n_totals      = (df["_status"] == "removed_totals").sum()
    n_derivatives = (df["_status"] == "removed_derivatives").sum()

    print(f"Raw:                 {os.path.relpath(raw_path)}")
    print(f"Output:              {os.path.relpath(out_path)}")
    print(f"Total rows:          {len(df)}")
    print(f"Kept:                {n_kept}")
    print(f"Removed (totals):    {n_totals}")
    print(f"Removed (derivs):    {n_derivatives}")


if __name__ == "__main__":
    main()
