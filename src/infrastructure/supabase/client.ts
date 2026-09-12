import { createClient } from "@supabase/supabase-js";
import { logSupabaseClientCreated } from "./debug";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";

function createSupabaseClient() {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "Supabase environment variables are missing. " +
        "Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local",
    );
  }
  logSupabaseClientCreated(supabaseUrl, Boolean(supabaseKey));
  return createClient(supabaseUrl, supabaseKey);
}

let client: ReturnType<typeof createSupabaseClient> | null = null;

export function getSupabaseClient() {
  if (!client) {
    client = createSupabaseClient();
  }
  return client;
}

export async function getCurrentUserId(): Promise<string | null> {
  const supabase = getSupabaseClient();
  const { data } = await supabase.auth.getUser();
  return data.user?.id ?? null;
}
