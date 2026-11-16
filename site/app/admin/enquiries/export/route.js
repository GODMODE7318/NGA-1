import { readDb } from '@/lib/db';
import { currentAdmin } from '@/lib/auth';
import { FIELDS } from '@/lib/site';
import { filterEnquiries } from '@/lib/filter';

export const dynamic = 'force-dynamic';

const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;

export async function GET(req) {
  if (!currentAdmin()) return new Response('Not authorised', { status: 401 });
  const sp = Object.fromEntries(new URL(req.url).searchParams.entries());
  const rows = filterEnquiries(readDb().enquiries, sp);
  const header = ['Date', 'Source page', 'Status', 'Notes', ...FIELDS.map((f) => f.label)];
  const lines = [header.map(esc).join(',')];
  for (const e of rows) {
    lines.push([
      new Date(e.createdAt).toISOString(),
      e.source,
      e.status,
      e.notes,
      ...FIELDS.map((f) => (f.name === 'mobile' && e.fields.mobile ? `+91 ${e.fields.mobile}` : e.fields[f.name] || '')),
    ].map(esc).join(','));
  }
  return new Response(lines.join('\n'), {
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': 'attachment; filename="nga-enquiries.csv"',
    },
  });
}
