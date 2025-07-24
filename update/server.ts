'use server'
import { createClient } from "@updatedev/js";
import { createSupabaseClient, supabaseUrl } from "@/lib/supabase/server";

export async function createUpdateClient() {
  const key = process.env.NEXT_PUBLIC_UPDATE_PUBLISHABLE_KEY;
  if (!key) {
    throw new Error("NEXT_PUBLIC_UPDATE_PUBLISHABLE_KEY is not defined");
  }
  return createClient(key, {
    getSessionToken: async () => {
      // This must be replaced with your own logic to get your session token
      // For example, with Supabase:
      const supabase = await createSupabaseClient();
      const { data } = await supabase.auth.getSession();
      if (data.session == null) return;
      return data.session.access_token;
    },
    environment: process.env.NODE_ENV === "production" ? "live" : "test",
  });
}
