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
  const fundName = searchParams.get("fund_name");

  if (!fundName) {
    return new Response(JSON.stringify({ error: "Missing parameters" }), {
      status: 400,
    });
  }

  const { data: fund, error: fundError } = await supabase
    .from("SuperFunds")
    .select("mysuper_is_lifecycle")
    .eq("fund_name", fundName)
    .single();

  if (fundError) {
    return new Response(JSON.stringify({ error: "Database fetch failed" }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ fund }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
