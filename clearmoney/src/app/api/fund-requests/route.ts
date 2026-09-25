import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const requestCounts = new Map<string, { count: number; windowStartedAt: number }>();

function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function getClientKey(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function checkRateLimit(key: string) {
  const now = Date.now();
  if (requestCounts.size > 10_000) {
    for (const [storedKey, value] of requestCounts) {
      if (now - value.windowStartedAt >= RATE_LIMIT_WINDOW_MS) requestCounts.delete(storedKey);
    }
  }
  const current = requestCounts.get(key);
  if (!current || now - current.windowStartedAt >= RATE_LIMIT_WINDOW_MS) {
    requestCounts.set(key, { count: 1, windowStartedAt: now });
    return { allowed: true, retryAfter: 0 };
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfter: Math.ceil((RATE_LIMIT_WINDOW_MS - (now - current.windowStartedAt)) / 1000),
    };
  }

  current.count += 1;
  return { allowed: true, retryAfter: 0 };
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

  const rateLimit = checkRateLimit(getClientKey(request));
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfter) } },
    );
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
