import Link from 'next/link';
import { readDb } from '@/lib/db';
import { WA_BASE } from '@/lib/site';
import Footer from '@/components/Footer';
import FloatingBar from '@/components/FloatingBar';

export const dynamic = 'force-dynamic';

export default function SiteLayout({ children }) {
  const db = readDb();
  const s = db.settings;
  const seats = db.batches[0]?.seatsLeft ?? '';
  const items = s.announcement.replace('{seats}', seats).split('|').map((t) => t.trim());

  return (
    <>
      <div className="announce">
        {items.map((t, i) => {
          const isLink = /Enquire Now|Reserve Your Seat/.test(t);
          return (
            <span key={i}>
              {isLink ? <Link href="/contact/">{t}</Link> : t}
            </span>
          );
        })}
      </div>

      <header className="site-header">
        <div className="wrap nav-row">
          <Link href="/" className="brand" aria-label="National Global Academy home">
            <img src="/assets/brand/nga-logo.png" alt="National Global Academy" width="200" height="56" />
          </Link>
          <nav className="nav-links" aria-label="Main">
            <Link href="/">Home</Link>
            <Link href="/courses/all/">Courses</Link>
            <Link href="/about/">About</Link>
            <Link href="/guides/">Guides</Link>
            <Link href="/contact/">Contact</Link>
            <a href={`tel:${s.phoneTel}`} className="phone">{s.phone}</a>
            <Link href="/contact/" className="btn btn-gold">Apply Now</Link>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <Footer s={s} />
      <FloatingBar whatsapp={WA_BASE} phoneTel={s.phoneTel} phone={s.phone} />
    </>
  );
}
