import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

// In-memory store
const rateLimitMap = new Map<string, number[]>();

const MAX_REQUESTS = 5;
const WINDOW_MS = 60_000;

serve(async (req) => {
  // ✅ Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
      status: 204,
    });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", {
      status: 405,
      headers: corsHeaders,
    });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("cf-connecting-ip") ??
    "unknown";

  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter(t => now - t < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) {
    return new Response(
      JSON.stringify({ error: "Rate limit exceeded" }),
      { status: 429, headers: corsHeaders }
    );
  }

  recent.push(now);
  rateLimitMap.set(ip, recent);

  const { email } = await req.json();

  if (!email || !email.includes("@")) {
    return new Response(
      JSON.stringify({ error: "Invalid email" }),
      { status: 400, headers: corsHeaders }
    );
  }

  const {count, error:countError}=await supabase.from("user_registrations").select("*", { count: "exact", head: true });
  console.log("Queue size is", count);
  if(countError){
    return new Response(
      JSON.stringify({ error: countError.message }),
      { status: 500, headers: corsHeaders }
    );
  }
  if(count!=undefined && count >= 50){
    console.log("Queue is full, adding to notifiers");
    const {error}=await supabase.from("notifiers").insert([{ email }]);
    return new Response(
      JSON.stringify({ error: "Queue is full" }),
      { status: 429, headers: corsHeaders }
    );
  }

  const { error } = await supabase
    .from("user_registrations")
    .insert([{ email }]);

  if (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }

  return new Response(
    JSON.stringify({ success: true }),
    { status: 200, headers: corsHeaders }
  );
});
