import { getSupabaseClient } from "./client";

export function resolveImageUrl(
  bucket: string,
  path: string | null | undefined,
): string {
  if (!path || path.startsWith("blob:")) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;

  try {
    const supabase = getSupabaseClient();
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  } catch {
    return path;
  }
}
