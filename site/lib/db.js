// Simple file-backed data store. Edits made in /admin are written to data/db.json.
// NOTE: Vercel's filesystem is read-only at runtime. Before go live, move this
// to a real database (for example Postgres or Supabase) and replace readDb/writeDb.
import fs from 'fs';
import path from 'path';

const FILE = path.join(process.cwd(), 'data', 'db.json');

export function readDb() {
  return JSON.parse(fs.readFileSync(FILE, 'utf8'));
}

export function writeDb(db) {
  fs.writeFileSync(FILE, JSON.stringify(db, null, 2));
}
