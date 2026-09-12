// Admin-only endpoint: returns the number of accounts created in Supabase Auth.
// Only authenticated admins may call this; the heavy lifting uses service-role.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.74.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Require a valid user auth token.
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Missing auth" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const token = authHeader.replace(/^Bearer\s+/i, "");
    const { data: userData, error: userErr } = await userClient.auth.getUser(token);
    if (userErr || !userData?.user?.id) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const userId = userData.user.id;

    // Verify admin role.
    const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    });
    const { data: roleRow } = await admin
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();
    if (!roleRow) {
      return new Response(JSON.stringify({ error: "Admin only" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // auth.admin.listUsers is paginated. Count total + confirmed by walking pages.
    const PAGE = 1000;
    let total = 0;
    let confirmed = 0;
    let page = 1;
    while (true) {
      const { data, error } = await admin.auth.admin.listUsers({
        page,
        perPage: PAGE,
      });
      if (error) throw error;

      const users = data?.users ?? [];
      if (users.length === 0) break;

      total += users.length;
      confirmed += users.filter((u) => !!u.email_confirmed_at || !!u.phone_confirmed_at).length;

      if (users.length < PAGE) break;
      page++;
    }

    // Engagement: how many accounts actually complete topics / tick subsections.
    const collect = async (table: "user_topic_progress" | "user_subsection_progress") => {
      const PAGE_SIZE = 1000;
      const users = new Set<string>();
      let rows = 0;
      let from = 0;
      // Cap at 50k rows to keep the response fast.
      while (from < 50000) {
        const { data, error } = await admin
          .from(table)
          .select("user_id")
          .range(from, from + PAGE_SIZE - 1);
        if (error) throw error;
        const batch = data ?? [];
        for (const r of batch) if (r.user_id) users.add(r.user_id as string);
        rows += batch.length;
        if (batch.length < PAGE_SIZE) break;
        from += PAGE_SIZE;
      }
      return { learners: users.size, rows };
    };

    const [topics, subsections] = await Promise.all([
      collect("user_topic_progress"),
      collect("user_subsection_progress"),
    ]);

    return new Response(
      JSON.stringify({
        total,
        confirmed,
        learnersCompletingTopics: topics.learners,
        topicCompletions: topics.rows,
        learnersTickingSubsections: subsections.learners,
        subsectionTicks: subsections.rows,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("admin-user-count error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
