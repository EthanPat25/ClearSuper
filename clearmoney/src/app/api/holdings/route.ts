import { createClient } from "@supabase/supabase-js";
import { NextRequest } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable"
  );
}

const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(Request: NextRequest) {
  const { searchParams } = new URL(Request.url);
  const fund = searchParams.get("fund");
  const option = searchParams.get("option");

  const { data: public_companies, error: publicError } = await supabase
    .from("Holdings")
    .select(
      "Super_Fund, Option_Name, Listing_Status, Dollar_Value, Weighting_Percentage, Asset_Class, Name, Domain, Parsed_Name, Weighting_Percentage_Clean"
    )
    .eq("Super_Fund", fund)
    .eq("Option_Name", option)
    .eq("Listing_Status", "Listed")
    .order("Dollar_Value", { ascending: false });

  if (publicError) {
    console.error("Error fetching public companies:", publicError.message);
  }
  const { data: Private_Investments, error: privateError } = await supabase
    .from("Holdings")
    .select(
      "Super_Fund, Option_Name, Listing_Status, Dollar_Value, Weighting_Percentage, Asset_Class, Name, Domain, Parsed_Name, Weighting_Percentage_Clean"
    )
    .eq("Super_Fund", fund)
    .eq("Option_Name", option)
    .eq("Listing_Status", "Unlisted")
    .order("Dollar_Value", { ascending: false });

  if (privateError) {
    console.error("Error fetching public companies:", privateError.message);
  }

  const { data: Bonds, error: BondsError } = await supabase
    .from("Holdings")
    .select(
      "Super_Fund, Option_Name, Listing_Status, Dollar_Value, Weighting_Percentage, Asset_Class, Name, Domain, Parsed_Name, Weighting_Percentage_Clean"
    )
    .eq("Super_Fund", fund)
    .eq("Option_Name", option)
    .eq("Asset_Class", "Fixed Income")
    .order("Dollar_Value", { ascending: false });

  if (BondsError) {
    console.error("Error fetching public companies:", BondsError.message);
  }

  const { data: Cash, error: CashError } = await supabase
    .from("Holdings")
    .select(
      "Super_Fund, Option_Name, Listing_Status, Dollar_Value, Weighting_Percentage, Asset_Class, Name, Domain, Parsed_Name, Weighting_Percentage_Clean"
    )
    .eq("Super_Fund", fund)
    .eq("Option_Name", option)
    .eq("Asset_Class", "Cash")
    .order("Dollar_Value", { ascending: false });

  if (CashError) {
    console.error("Error fetching public companies:", CashError.message);
  }

  const response = {
    public_companies,
    Private_Investments,
    Bonds,
    Cash,
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
