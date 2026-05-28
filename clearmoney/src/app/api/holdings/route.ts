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
      .order("Dollar_Value", { ascending: false });

    if (error) {
      return new Response(JSON.stringify({ error: "Database fetch failed" }), {
        status: 500,
      });
    }

    const rows = data ?? [];

    const public_holdings = rows.filter(
      (row) => row.Listing_Status === "Listed",
    );

    const private_investments = rows.filter(
      (row) => row.Listing_Status === "Unlisted",
    );
    const bonds = rows.filter((row) => row.Asset_Class === "Fixed Income");
    const cash = rows.filter((row) => row.Asset_Class === "Cash");

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
