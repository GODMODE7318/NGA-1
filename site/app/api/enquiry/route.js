import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';
import { FIELDS, validateEnquiry } from '@/lib/site';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }
  const input = body.fields || {};
  const fields = {};
  for (const f of FIELDS) fields[f.name] = String(input[f.name] ?? '').trim();

  const error = validateEnquiry(fields);
  if (error) return NextResponse.json({ ok: false, error }, { status: 400 });

  let saved = true;
  try {
    const db = readDb();
    db.enquiries.unshift({
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      source: String(body.source || '').slice(0, 120),
      status: 'New',
      notes: '',
      fields,
    });
    writeDb(db);
  } catch (e) {
    // The data file is read-only on some hosts (for example Vercel). The
    // enquiry is still sent to WhatsApp by the browser, but it is not stored.
    saved = false;
  }
  return NextResponse.json({ ok: true, saved });
}
