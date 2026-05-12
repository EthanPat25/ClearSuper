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

  console.log("API hit — fund:", fund);

  const { data, error } = await supabase
    .from("options")
    .select("id, option_name")
    .eq("super_fund_id", fund);

  console.log("data:", data);
  console.log("error:", error);

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
