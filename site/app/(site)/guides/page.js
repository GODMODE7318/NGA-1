import { readDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'Guides | National Global Academy' };

// Lists only the published guide articles stored in the admin panel. No new guide pages.
export default function GuidesPage() {
  const posts = readDb().posts.filter((p) => p.published);
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">GUIDES</p>
          <h1>Guides for students and parents</h1>
        </div>
      </section>
      <section className="section">
        <div className="wrap narrow">
          {posts.length === 0 ? (
            <p className="center">Guides will appear here once they are published.</p>
          ) : (
            posts.map((p) => (
              <details className="faq" key={p.id}>
                <summary>{p.title}</summary>
                {p.body.split('\n').filter(Boolean).map((para, i) => <p key={i}>{para}</p>)}
              </details>
            ))
          )}
        </div>
      </section>
    </>
  );
}
