let loggedUrlOnce = false;

export function logSupabaseClientCreated(url: string, keySet: boolean): void {
  if (loggedUrlOnce) return;
  console.log(
    "[supabase] client created with URL:",
    url,
    "| key present:",
    keySet,
  );
  loggedUrlOnce = true;
}

export function logFetchResult(
  source: string,
  table: string,
  count: number | null | undefined,
): void {
  console.log(`[supabase] ${source}: ${table} returned rows:`, count);
}

export function logQueryError(
  source: string,
  table: string,
  error: unknown,
): void {
  console.error(`[supabase] ${source}: ${table} query failed:`, error);
}
