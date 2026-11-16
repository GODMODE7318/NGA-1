import { readDb } from '@/lib/db';
import { WA_BASE } from '@/lib/site';
import EnquiryForm from '@/components/EnquiryForm';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'Contact | National Global Academy' };

export default function ContactPage() {
  const db = readDb();
  const s = db.settings;
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">CONTACT</p>
          <h1>Choose the easiest way to connect.</h1>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div className="contact-options">
            <div className="option">
              <h3>Call</h3>
              <a href={`tel:${s.phoneTel}`}>{s.phone}</a>
              <p>{s.hours}</p>
            </div>
            <div className="option">
              <h3>WhatsApp</h3>
              <a href={WA_BASE} target="_blank" rel="noopener noreferrer">Start an admission chat</a>
              <p>Include your qualification and career interest.</p>
            </div>
            <div className="option">
              <h3>Address</h3>
              <p>{s.address.join(', ')}</p>
              <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(s.mapQuery)}`} target="_blank" rel="noopener noreferrer">Get Directions</a>
            </div>
          </div>

          <div className="form-card" id="enquiry">
            <h2>Book Free Counselling</h2>
            <EnquiryForm source="/contact/" />
          </div>
        </div>
      </section>

      <section className="section tint">
        <div className="wrap narrow">
          <h2 className="center">Frequently asked questions</h2>
          {db.contactFaqs.map((f) => (
            <details className="faq" key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
