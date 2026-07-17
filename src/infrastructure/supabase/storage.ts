import { getSupabaseClient } from "./client";

export function resolveImageUrl(
  bucket: string,
  path: string | null | undefined,
): string {
  if (!path) return "";
  if (
    path.startsWith("blob:") ||
    path.startsWith("http://") ||
    path.startsWith("https://")
  )
    return path;

  try {
    const supabase = getSupabaseClient();
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  } catch {
    return path;
  }
}
