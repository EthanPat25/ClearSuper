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
  const { searchParams } = new URL(Request.url);
  const fund = searchParams.get("fund");
  const sector = searchParams.get("sector");

  if (!fund || !sector) {
    return new Response(JSON.stringify({ error: "Missing parameters" }), {
      status: 400,
    });
  }

  const [
    { data: optionsList, error: optionsError },
    { data: sectorRows, error: sectorError },
  ] = await Promise.all([
    supabase
      .from("options")
      .select("id, option_name, as_of_date")
      .eq("super_fund_id", fund),
    supabase
      .from("Holdings")
      .select(
        "Option_Id, Weighting_Percentage_Clean, companies!Company_Id!inner(Sector)",
      )
      .eq("Super_Fund", fund)
      .eq("Listing_Status", "Listed")
      .eq("companies.Sector", sector),
  ]);

  if (optionsError || sectorError) {
    return new Response(JSON.stringify({ error: "Database fetch failed" }), {
      status: 500,
    });
  }

  const allOptions = optionsList ?? [];

  // Sum the weighting for each option (a sector can have multiple companies per option)
  const weightingByOption = new Map<string, number>();
  (sectorRows ?? []).forEach((row) => {
    weightingByOption.set(
      row.Option_Id,
      (weightingByOption.get(row.Option_Id) ?? 0) +
        row.Weighting_Percentage_Clean,
    );
  });

  const options = allOptions
    .map((row) => ({
      id: row.id,
      option_name: row.option_name,
      as_of_date: row.as_of_date,
      Weighting_Percentage_Clean: weightingByOption.get(row.id) ?? 0,
    }))
    .sort(
      (a, b) => b.Weighting_Percentage_Clean - a.Weighting_Percentage_Clean,
    );

  return new Response(JSON.stringify({ options }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
