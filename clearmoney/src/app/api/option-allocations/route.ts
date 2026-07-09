import { createClient } from "@supabase/supabase-js";
import { NextRequest } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(Request: NextRequest) {
  const { searchParams } = new URL(Request.url);
  const option_ids = searchParams.get("option_ids")?.split(",") ?? [];

  const { data, error } = await supabase
    .from("option_asset_class_summary")
    .select("Option_Id, category, percentage")
    .in("Option_Id", option_ids);

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
