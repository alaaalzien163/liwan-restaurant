import { getSupabaseClient } from "./client";

const STORAGE_PATH_PATTERN = /\/object\/public\/[^/]+\/(.+)$/;

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
  console.log(
    "[uploadFile] bucket:",
    bucket,
    "filePath:",
    filePath,
    "return value:",
    data.publicUrl,
  );
  return data.publicUrl;
}

export async function deleteStorageFile(
  publicUrl: string,
  bucket: string,
): Promise<void> {
  if (!publicUrl || isBlobUrl(publicUrl)) return;

  const storagePath = extractStoragePath(publicUrl);
  if (!storagePath) return;

  const supabase = getSupabaseClient();
  const { error } = await supabase.storage.from(bucket).remove([storagePath]);
  if (error) throw new Error(`Failed to delete file: ${error.message}`);
}
