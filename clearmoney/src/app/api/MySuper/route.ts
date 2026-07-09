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

  if (!fund) {
    return new Response(JSON.stringify({ error: "Missing parameters" }), {
      status: 400,
    });
  }

  const { data: option, error: optionsError } = await supabase
    .from("options")
    .select("id, option_name, as_of_date")
    .eq("super_fund_id", fund)
    .eq("is_mysuper_default", true)
    .single();

  if (optionsError) {
    return new Response(JSON.stringify({ error: "Database fetch failed" }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ option }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
