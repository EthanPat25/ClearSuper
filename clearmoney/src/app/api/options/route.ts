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

// Returns the options for a given fund and reporting date
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const fund = searchParams.get("fund");

  if (!fund) {
    return Response.json({ error: "Missing fund" }, { status: 400 });
  }

  // 1. Get the fund's options
  const { data: options, error: optionsError } = await supabase
    .from("options")
    .select("id, option_name, option_name_abbreviation, as_of_date")
    .eq("super_fund_id", fund);

  if (optionsError) {
    return Response.json(
      { error: optionsError.message },
      { status: 500 },
    );
  }

  const optionIds = options.map((option) => option.id);

  // 2. Get allocations for those options
  const { data: allocationRows, error: allocationsError } = await supabase
    .from("option_asset_class_summary")
    .select("Option_Id, category, percentage")
    .in("Option_Id", optionIds);

  if (allocationsError) {
    return Response.json(
      { error: allocationsError.message },
      { status: 500 },
    );
  }

  // 3. Attach allocations to each option
  const data = options.map((option) => ({
    ...option,
    allocations: allocationRows.filter(
      (row) => row.Option_Id === option.id,
    ),
  }));

  return Response.json(data);
}