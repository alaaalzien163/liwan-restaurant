import { getSupabaseClient } from "./client";

const STORAGE_PATH_PATTERN = /\/object\/public\/[^/]+\/(.+)$/;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";

export function isBlobUrl(url: string): boolean {
  return url.startsWith("blob:");
}

export function assertNotBlobUrl(value: string, context: string): void {
  if (isBlobUrl(value)) {
    throw new Error(
      `Assertion failed: blob URL detected in ${context}. This should never happen.`,
    );
  }
}

export function extractStoragePath(publicUrl: string): string | null {
  if (!publicUrl || isBlobUrl(publicUrl)) return null;
  if (publicUrl.startsWith("http://") || publicUrl.startsWith("https://")) {
    const match = publicUrl.match(STORAGE_PATH_PATTERN);
    return match?.[1] ? decodeURIComponent(match[1]) : null;
  }
  return publicUrl;
}

/**
 * Returns true only when `value` refers to a storage object that lives in the
 * CURRENT Supabase project's bucket. Legacy values copied from the old project
 * (full URLs against a different host) are treated as foreign and must never be
 * deleted or treated as belonging to the current bucket.
 */
export function belongsToCurrentBucket(value: string, bucket: string): boolean {
  if (!value || isBlobUrl(value)) return false;
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value.startsWith(
      `${supabaseUrl}/storage/v1/object/public/${bucket}/`,
    );
  }
  return true;
}

export async function uploadFile(
  bucket: string,
  file: File,
  folder?: string,
): Promise<string> {
  const supabase = getSupabaseClient();
  const ext = file.name.split(".").pop() ?? "png";
  const fileName = `${crypto.randomUUID()}.${ext}`;
  const filePath = folder ? `${folder}/${fileName}` : fileName;

  const { error } = await supabase.storage.from(bucket).upload(filePath, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) throw new Error(`Upload failed: ${error.message}`);

  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
  return data.publicUrl;
}

/**
 * Uploads `file` using the entity ID as the object key: `{entityId}.{ext}`.
 * The upload targets the specific bucket (e.g. `category-images`) and returns
 * the STORAGE PATH relative to that bucket (NOT a public URL) so callers can
 * persist only the path in the database.
 */
export async function uploadEntityImage(
  bucket: string,
  entityId: string,
  file: File,
): Promise<string> {
  const supabase = getSupabaseClient();
  const ext = file.name.split(".").pop() ?? "png";
  const filePath = `${entityId}.${ext}`;

  const { error } = await supabase.storage.from(bucket).upload(filePath, file, {
    cacheControl: "3600",
    upsert: true,
  });

  if (error) throw new Error(`Upload failed: ${error.message}`);

  return filePath;
}

/**
 * Deletes the storage object referenced by `value` (full public URL or storage
 * path) from `bucket`, but ONLY when it belongs to the current project's
 * bucket. Objects from the old Supabase project are never touched.
 */
export async function deleteStorageFile(
  publicUrl: string,
  bucket: string,
): Promise<void> {
  if (!publicUrl || isBlobUrl(publicUrl)) return;
  if (!belongsToCurrentBucket(publicUrl, bucket)) return;

  const storagePath = extractStoragePath(publicUrl);
  if (!storagePath) return;

  const supabase = getSupabaseClient();
  const { error } = await supabase.storage.from(bucket).remove([storagePath]);
  if (error) throw new Error(`Failed to delete file: ${error.message}`);
}
