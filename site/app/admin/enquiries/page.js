import Link from 'next/link';
import { readDb } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { INTERESTS, FIELDS } from '@/lib/site';
import { filterEnquiries } from '@/lib/filter';
import { updateEnquiry } from '../actions';

export const dynamic = 'force-dynamic';

const STATUSES = ['New', 'Contacted', 'Counselling Done', 'Enrolled', 'Closed'];

export default function EnquiriesPage({ searchParams }) {
  requireAdmin();
  const sp = searchParams || {};
  const all = readDb().enquiries;
  const rows = filterEnquiries(all, sp);
  const qs = new URLSearchParams(Object.entries(sp).filter(([, v]) => v)).toString();

  return (
    <>
      <div className="row-between">
        <h1>Enquiries ({rows.length})</h1>
        <a className="btn btn-outline" href={`/admin/enquiries/export/${qs ? `?${qs}` : ''}`}>Export CSV</a>
      </div>
      {sp.saved ? <p className="notice">Saved.</p> : null}

      <form className="filters" method="get">
        <input name="q" placeholder="Search name, mobile, email, location" defaultValue={sp.q || ''} />
        <select name="interest" defaultValue={sp.interest || ''}>
          <option value="">All interests</option>
          {INTERESTS.map((i) => <option key={i} value={i}>{i}</option>)}
        </select>
        <select name="status" defaultValue={sp.status || ''}>
          <option value="">All statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <input type="date" name="from" defaultValue={sp.from || ''} aria-label="From date" />
        <input type="date" name="to" defaultValue={sp.to || ''} aria-label="To date" />
        <button className="btn btn-gold" type="submit">Filter</button>
        <Link className="btn btn-outline" href="/admin/enquiries">Reset</Link>
      </form>

      {rows.length === 0 ? <p className="muted">No enquiries match these filters.</p> : (
        <div className="cards">
          {rows.map((e) => (
            <article className="enq" key={e.id}>
              <header>
                <strong>{e.fields.name}</strong>
                <span className="pill">{e.status}</span>
              </header>
              <dl>
                <dt>Date</dt><dd>{new Date(e.createdAt).toLocaleString('en-IN')}</dd>
                <dt>Source page</dt><dd>{e.source || '-'}</dd>
                {FIELDS.map((f) => (
                  <div key={f.name} className="kv">
                    <dt>{f.label}</dt>
                    <dd>{f.name === 'mobile' ? `+91 ${e.fields.mobile}` : (e.fields[f.name] || '-')}</dd>
                  </div>
                ))}
              </dl>
              <form action={updateEnquiry} className="enq-edit">
                <input type="hidden" name="id" value={e.id} />
                <select name="status" defaultValue={e.status}>
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <input name="notes" placeholder="Notes" defaultValue={e.notes || ''} />
                <button className="btn btn-gold" type="submit">Save</button>
              </form>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
