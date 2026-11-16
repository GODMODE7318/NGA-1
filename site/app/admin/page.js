import Link from 'next/link';
import { readDb } from '@/lib/db';
import { currentAdmin } from '@/lib/auth';
import { login } from './actions';

export const dynamic = 'force-dynamic';

export default function AdminPage({ searchParams }) {
  if (!currentAdmin()) {
    return (
      <section className="login-card">
        <h1>Staff login</h1>
        <p className="muted">For NGA staff only.</p>
        {searchParams?.error ? <p className="form-error">Email or password is incorrect.</p> : null}
        <form action={login} className="stack">
          <label>Email<input name="email" type="email" required autoComplete="username" /></label>
          <label>Password<input name="password" type="password" required autoComplete="current-password" /></label>
          <button className="btn btn-gold" type="submit">Log in</button>
        </form>
        <p className="muted small">Demo placeholder login, to be replaced by NGA before go live. Set ADMIN_EMAIL, ADMIN_PASSWORD and ADMIN_SECRET in the environment.</p>
      </section>
    );
  }

  const db = readDb();
  const total = db.enquiries.length;
  const newCount = db.enquiries.filter((e) => e.status === 'New').length;
  const seatsLeft = db.batches.reduce((n, b) => n + Number(b.seatsLeft || 0), 0);
  const latest = db.enquiries.slice(0, 5);

  return (
    <>
      <h1>Dashboard</h1>
      <div className="kpis">
        <div className="kpi"><span>Total enquiries</span><strong>{total}</strong></div>
        <div className="kpi"><span>New enquiries</span><strong>{newCount}</strong></div>
        <div className="kpi"><span>Batches</span><strong>{db.batches.length}</strong></div>
        <div className="kpi"><span>Seats left</span><strong>{seatsLeft}</strong></div>
        <div className="kpi"><span>Courses</span><strong>{db.courses.length}</strong></div>
      </div>

      <h2>Latest enquiries</h2>
      {latest.length === 0 ? <p className="muted">No enquiries yet.</p> : (
        <div className="cards">
          {latest.map((e) => (
            <div className="card-row" key={e.id}>
              <strong>{e.fields.name}</strong>
              <span>{e.fields.interest} | {e.fields.mobile}</span>
              <span className="muted small">{new Date(e.createdAt).toLocaleString('en-IN')} | {e.status}</span>
            </div>
          ))}
        </div>
      )}
      <p><Link href="/admin/enquiries">View all enquiries</Link></p>
    </>
  );
}
