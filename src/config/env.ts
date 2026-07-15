import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_APP_NAME: z.string().default("Liwan Restaurant"),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_APP_LOCALE: z.enum(["en", "ar"]).default("en"),
  NEXT_PUBLIC_APP_DIRECTION: z.enum(["ltr", "rtl"]).default("ltr"),
  NEXT_PUBLIC_API_URL: z.string().url().default("http://localhost:8080/api"),
  API_TIMEOUT: z.coerce.number().default(30000),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().default(""),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().default(""),
});

function validateEnv() {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.errors.map(
        (e) => `${e.path.join(".")}: ${e.message}`,
      );
      console.error("Invalid environment variables:", messages);
      // Return defaults instead of throwing in dev
      if (process.env.NODE_ENV === "development") {
        return envSchema.parse({});
      }
      throw new Error(`Invalid environment variables:\n${messages.join("\n")}`);
    }
    throw error;
  }
}

export const env = validateEnv();
