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
  const companyId = searchParams.get("companyId");

  if (!fund || !companyId) {
    return new Response(JSON.stringify({ error: "Missing parameters" }), {
      status: 400,
    });
  }

  const [{ data: allOptionsRaw, error: allError }, { data: companyRows, error: companyError }] =
    await Promise.all([
      supabase
        .from("Holdings")
        .select("Option_Name")
        .eq("Super_Fund", fund)
        .eq("Listing_Status", "Listed"),
      supabase
        .from("Holdings")
        .select("Option_Name, Weighting_Percentage_Clean")
        .eq("Super_Fund", fund)
        .eq("Company_Id", companyId)
        .eq("Listing_Status", "Listed"),
    ]);

  if (allError || companyError) {
    return new Response(JSON.stringify({ error: "Database fetch failed" }), {
      status: 500,
    });
  }

  const allOptions = [...new Set((allOptionsRaw ?? []).map((r) => r.Option_Name))];

  const weightingByOption = new Map(
    (companyRows ?? []).map((r) => [r.Option_Name, r.Weighting_Percentage_Clean]),
  );

  const options = allOptions
    .map((name) => ({
      Option_Name: name,
      Weighting_Percentage_Clean: weightingByOption.get(name) ?? 0,
    }))
    .sort((a, b) => b.Weighting_Percentage_Clean - a.Weighting_Percentage_Clean);

  return new Response(JSON.stringify({ options }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
