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

  // Fetch all listed holdings for the fund with their sector, across all options
  const { data, error } = await supabase
    .from("Holdings")
    .select(
      "Option_Name, Weighting_Percentage_Clean, companies!Company_Id(Sector)",
    )
    .eq("Super_Fund", fund)
    .eq("Listing_Status", "Listed");

  if (error) {
    return new Response(JSON.stringify({ error: "Database fetch failed" }), {
      status: 500,
    });
  }

  const rows = data ?? [];

  // All distinct options in this fund
  const allOptions = [...new Set(rows.map((r) => r.Option_Name))];

  // Sum weighting for the requested sector per option
  const weightingByOption: Record<string, number> = {};
  rows.forEach((r) => {
    const rowSector = (r.companies as unknown as { Sector: string } | null)?.Sector;
    if (rowSector === sector) {
      weightingByOption[r.Option_Name] =
        (weightingByOption[r.Option_Name] ?? 0) + r.Weighting_Percentage_Clean;
    }
  });

  const options = allOptions
    .map((name) => ({
      Option_Name: name,
      Weighting_Percentage_Clean: weightingByOption[name] ?? 0,
    }))
    .sort((a, b) => b.Weighting_Percentage_Clean - a.Weighting_Percentage_Clean);

  return new Response(JSON.stringify({ options }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
