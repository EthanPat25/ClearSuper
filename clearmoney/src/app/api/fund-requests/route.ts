import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: NextRequest) {
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const payload = body as Record<string, unknown>;
  const fundName = cleanText(payload.fundName, 160);
  const optionName = cleanText(payload.optionName, 160);

  if (!fundName) {
    return NextResponse.json({ error: "Fund name is required" }, { status: 400 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const { error } = await supabase.from("fund_requests").insert({
    fund_name: fundName,
    option_name: optionName || null,
  });

  if (error) {
    console.error("Fund request insert failed", error);
    return NextResponse.json({ error: "Could not submit request" }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
