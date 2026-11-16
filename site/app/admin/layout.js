import Link from 'next/link';
import { currentAdmin } from '@/lib/auth';
import { logout } from './actions';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'NGA Admin', robots: { index: false, follow: false } };

export default function AdminLayout({ children }) {
  const email = currentAdmin();
  return (
    <div className="admin">
      <header className="admin-top">
        <div className="admin-brand">NGA Admin Panel</div>
        {email ? (
          <nav className="admin-nav" aria-label="Admin">
            <Link href="/admin">Dashboard</Link>
            <Link href="/admin/enquiries">Enquiries</Link>
            <Link href="/admin/courses">Courses</Link>
            <Link href="/admin/batches">Batches</Link>
            <Link href="/admin/site">Site Settings</Link>
            <form action={logout}>
              <button className="linkbtn" type="submit">Log out</button>
            </form>
          </nav>
        ) : null}
      </header>
      <div className="admin-body">{children}</div>
    </div>
  );
}
