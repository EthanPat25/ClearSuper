import { createClient } from "@supabase/supabase-js";
import { NextRequest } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable",
  );
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Returns holdings of an option given fund and option
export async function GET(Request: NextRequest) {
  try {
    const { searchParams } = new URL(Request.url);
    const fund = searchParams.get("fund");
    const option = searchParams.get("option");

    if (!fund || !option) {
      return new Response(JSON.stringify({ error: "Missing parameters" }), {
        status: 400,
      });
    }

    const selectString = `
      Super_Fund, 
      Full_Name, 
      Listing_Status, 
      Dollar_Value, 
      Weighting_Percentage_Clean, 
      Asset_Class, 
      Management_Type,
      Company_Id,
      Option_Id,
      companies!Company_Id (
        id,
        Parsed_Name,
        Sector,
        Description,
        Country
      ),
      options!Option_Id (
        as_of_date
      )
    `;

    const { data, error } = await supabase
      .from("Holdings")
      .select(selectString)
      .eq("Option_Id", option)
      .order("Dollar_Value", { ascending: false, nullsFirst: false });

    if (error) {
      return new Response(JSON.stringify({ error: "Database fetch failed" }), {
        status: 500,
      });
    }

    const rows = data ?? [];

    // Listing status alone is not enough to identify public companies. Some
    // fixed-interest records are marked "Listed" in the source data, even
    // though they belong in the bonds section and have no company record.
    const assetClass = (row: { Asset_Class?: string | null }) =>
      String(row.Asset_Class ?? "").trim().toLowerCase();
    const isFixedIncome = (row: { Asset_Class?: string | null }) =>
      assetClass(row).includes("fixed income");
    const isCash = (row: { Asset_Class?: string | null }) =>
      assetClass(row) === "cash";

    const public_holdings = rows.filter(
      (row) =>
        row.Listing_Status === "Listed" &&
        !isFixedIncome(row) &&
        !isCash(row) &&
        (row.Dollar_Value === null || row.Dollar_Value > 0),
    );

    const private_investments = rows.filter(
      (row) =>
        row.Listing_Status === "Unlisted" &&
        !isFixedIncome(row) &&
        !isCash(row),
    );
    const bonds = rows.filter((row) => isFixedIncome(row));
    const cash = rows.filter((row) => isCash(row));

    return new Response(
      JSON.stringify({
        public_holdings,
        private_investments,
        bonds,
        cash,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
