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
      )
    `;

    const { data: public_holdings, error: publicError } = await supabase
      .from("Holdings")
      .select(selectString)
      .eq("Option_Id", option)
      .eq("Listing_Status", "Listed")
      .order("Dollar_Value", { ascending: false });

    const { data: private_investments, error: privateError } = await supabase
      .from("Holdings")
      .select(selectString)
      .eq("Option_Id", option)
      .eq("Listing_Status", "Unlisted")
      .order("Dollar_Value", { ascending: false });

    const { data: bonds, error: bondsError } = await supabase
      .from("Holdings")
      .select(selectString)
      .eq("Option_Id", option)
      .eq("Asset_Class", "Fixed Income")
      .order("Dollar_Value", { ascending: false });

    const { data: cash, error: cashError } = await supabase
      .from("Holdings")
      .select(selectString)
      .eq("Option_Id", option)
      .eq("Asset_Class", "Cash")
      .order("Dollar_Value", { ascending: false });

    if (publicError || privateError || bondsError || cashError) {
      return new Response(JSON.stringify({ error: "Database fetch failed" }), {
        status: 500,
      });
    }

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
