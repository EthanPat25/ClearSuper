"""
Unit tests for ETL parsers.

Run with:
    python -m pytest test_etl.py -v
"""

import importlib.util
import os
import sys
import types

import pandas as pd
import pytest


_etl_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "etl_v2.py")
_spec = importlib.util.spec_from_file_location("etl_v2", _etl_path)
_mod = types.ModuleType(_spec.name)
_mod.__spec__ = _spec
_mod.__file__ = _etl_path
_mod.run_all_parsers = lambda: None 
sys.modules["etl_v2"] = _mod
_spec.loader.exec_module(_mod)

AustralianSuper = _mod.AustralianSuper

# acceptable deviation from 100%
PERCENTAGE_DEVIATION_TOLERANCE = 1.0 


def run_pipeline(rows: list[dict]) -> pd.DataFrame:
    """Run the post-parse pipeline and return the final dataframe."""
    parser = make_parser(rows)
    parser.remove_totals()
    parser.remove_derivatives()
    parser.normalise_company_names()
    parser.normalise_percentage()
    parser.normalise_dollar()
    parser.recompute_percentages()
    return parser.df


def assert_sums_to_100(df: pd.DataFrame):
    total = df["Weighting_Percentage_Clean"].sum()
    assert abs(total - 100.0) <= PERCENTAGE_DEVIATION_TOLERANCE, (
        f"Weighting_Percentage_Clean sums to {total:.4f}%, expected ~100%"
    )

def test_no_derivatives_sums_to_100():
    rows = [
        {"Asset_Class": "Cash",   "Dollar_Value": 5_000_000},
        {"Asset_Class": "Equity", "Dollar_Value": 45_000_000},
        {"Asset_Class": "Bonds",  "Dollar_Value": 50_000_000},
    ]
    assert_sums_to_100(run_pipeline(rows))


def test_derivatives_removed_sums_to_100():
    rows = [
        {"Asset_Class": "Cash",        "Dollar_Value": 30_000_000},
        {"Asset_Class": "Equity",      "Dollar_Value": 50_000_000},
        {"Asset_Class": "Derivatives", "Dollar_Value": 20_000_000},  # stripped
    ]
    df = run_pipeline(rows)

    has_deriv = df["Asset_Class"].str.contains("Derivatives", case=False, na=False).any()
    assert not has_deriv, "Derivatives rows should have been removed"

    assert_sums_to_100(df)


def test_multiple_derivative_subtypes_removed():
    rows = [
        {"Asset_Class": "Cash",                         "Dollar_Value": 40_000_000},
        {"Asset_Class": "Equity",                       "Dollar_Value": 40_000_000},
        {"Asset_Class": "Derivatives - Equity Options", "Dollar_Value": 10_000_000},
        {"Asset_Class": "Derivatives - FX Forwards",    "Dollar_Value": 10_000_000},
    ]
    df = run_pipeline(rows)

    deriv_rows = [c for c in df["Asset_Class"].unique() if str(c).lower().startswith("derivatives")]
    assert deriv_rows == [], f"Expected no derivative rows, found: {deriv_rows}"

    assert_sums_to_100(df)


def test_totals_row_excluded():
    rows = [
        {"Asset_Class": "Cash",   "Name": "ANZ",   "Name_Type": "Name of Institution", "Dollar_Value": 60_000_000},
        {"Asset_Class": "Equity", "Name": "BHP",   "Name_Type": "Name of Institution", "Dollar_Value": 40_000_000},
        {"Asset_Class": "Cash",   "Name": "Total", "Name_Type": "Total",               "Dollar_Value": 100_000_000},  # stripped
    ]
    assert_sums_to_100(run_pipeline(rows))
