#!/usr/bin/env node
/**
 * Supabase backup script.
 *
 * Usage:
 *   1. Create scripts/.supabase-env with:
 *        SUPABASE_URL=https://xxxx.supabase.co
 *        SUPABASE_ANON_KEY=eyJ...
 *   2. Run: node scripts/backup-supabase.mjs
 *
 * Output: a timestamped JSON file in scripts/backups/ containing
 * all rows from every table, plus a .sql file with INSERT statements
 * to restore them.
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envFile = join(__dirname, ".supabase-env");

function readEnvFile(path) {
  const raw = readFileSync(path, "utf-8");
  const env = {};
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim();
    env[key] = value;
  }
  return env;
}

let env;
try {
  env = readEnvFile(envFile);
} catch {
  console.error(
    "ERROR: Could not read scripts/.supabase-env\n" +
      "Create it with:\n" +
      "  SUPABASE_URL=https://xxxx.supabase.co\n" +
      "  SUPABASE_ANON_KEY=eyJ...",
  );
  process.exit(1);
}

const url = env.SUPABASE_URL;
const key = env.SUPABASE_ANON_KEY;
if (!url || !key) {
  console.error("ERROR: SUPABASE_URL and SUPABASE_ANON_KEY are both required.");
  process.exit(1);
}

const supabase = createClient(url, key);

// List every table you want backed up here.
const TABLES = ["categories", "menu_items"];

function escapeSqlValue(value) {
  if (value === null || value === undefined) return "NULL";
  if (typeof value === "number") return String(value);
  if (typeof value === "boolean") return value ? "TRUE" : "FALSE";
  const s = String(value);
  return "'" + s.replace(/'/g, "''") + "'";
}

function sanitize(value) {
  if (value === undefined) return null;
  if (typeof value === "string" && value.startsWith("blob:")) return null;
  return value;
}

async function run() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const outDir = join(__dirname, "backups");
  mkdirSync(outDir, { recursive: true });

  const backup = {};
  const sqlLines = [];

  for (const table of TABLES) {
    console.log(`Exporting ${table}...`);
    const { data, error } = await supabase.from(table).select("*");

    if (error) {
      console.error(`  FAILED to fetch ${table}: ${error.message}`);
      console.error(
        "  If this is a billing restriction, the anon key read access may be blocked.",
      );
      process.exitCode = 1;
      continue;
    }

    const rows = (data ?? []).map((row) => {
      const clean = {};
      for (const [k, v] of Object.entries(row)) clean[k] = sanitize(v);
      return clean;
    });

    backup[table] = rows;
    console.log(`  -> ${rows.length} rows`);

    if (rows.length > 0) {
      const cols = Object.keys(rows[0]);
      sqlLines.push(`-- ===== ${table} =====`);
      sqlLines.push(
        `INSERT INTO ${table} (${cols.join(", ")}) VALUES`,
      );
      const valueRows = rows.map((row) => `  (${cols.map((c) => escapeSqlValue(row[c])).join(", ")})`);
      sqlLines.push(valueRows.join(",\n") + ";");
      sqlLines.push("");
    }
  }

  const jsonPath = join(outDir, `backup-${timestamp}.json`);
  writeFileSync(jsonPath, JSON.stringify(backup, null, 2));
  console.log(`\nJSON backup written to: ${jsonPath}`);

  const sqlPath = join(outDir, `backup-${timestamp}.sql`);
  writeFileSync(sqlPath, sqlLines.join("\n"));
  console.log(`SQL backup written to:  ${sqlPath}`);
}

run();