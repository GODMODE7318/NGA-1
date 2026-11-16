import Link from 'next/link';
import { readDb } from '@/lib/db';
import { WA_BASE } from '@/lib/site';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'About | National Global Academy' };

const BENEFITS = [
  'Structured training across cruise, Merchant Navy, aviation and hospitality.',
  'Route first counselling, with aptitude, education and goals compared before a course is suggested.',
  'Parents included at every step.',
  'Monthly batch intakes.',
  'Hands on preparation for service, guest care and onboard routines.',
  'Interview and workplace readiness, including communication and grooming.',
  'Certification and documentation guidance, with clear steps after training.',
  'Interview opportunities with cruise lines and shipping employers, with preparation.',
  'Admission support from first enquiry to seat confirmation.',
];

const ROLES = [
  { title: 'Academic and Maritime Guidance', text: 'Helps students understand course content, certification steps and the technical side of Merchant Navy pathways.' },
  { title: 'Student and Parent Counselling', text: 'Talks through options, timelines and documents with the student and the family together.' },
  { title: 'Hospitality and Interview Preparation', text: 'Prepares students for service roles, guest interaction and interviews with cruise lines and employers.' },
];

export default function AboutPage() {
  const db = readDb();
  const a = db.about;
  return (
    <>
      <section className="about-hero">
        <div className="wrap">
          <h1>About National Global Academy, Noida</h1>
        </div>
        <div className="wrap collage">
          <img src="/assets/hero-cruise.jpg" alt="Cruise ship at sea" loading="lazy" />
          <img src="/assets/nga-training.webp" alt="Trainees in navy uniforms in a training hall" loading="lazy" />
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div>
            <p className="eyebrow">{a.eyebrow}</p>
            <h2>{a.title}</h2>
            <p>{a.intro}</p>
            <p>Global Career Training Institute, Noida, with 10+ years of guidance experience across cruise, Merchant Navy, aviation and hospitality. Parents are included at every step, and our Placement Support wording is shared in writing.</p>
          </div>
          <div className="split-media">
            <img src="/assets/nga-training.webp" alt="Trainees practising service and safety training" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="section tint">
        <div className="wrap stats-2x2">
          {db.stats.map((s) => (
            <div className="stat-card" key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="wrap vm">
          <div className="vm-card">
            <h3>Vision</h3>
            <p>{a.vision}</p>
          </div>
          <div className="vm-card">
            <h3>Mission</h3>
            <p>{a.mission}</p>
          </div>
        </div>
      </section>

      <section className="section dark">
        <div className="wrap">
          <h2 className="center">What you get with NGA</h2>
          <p className="center lead-small">Training and guidance that helps you decide well, then prepares you to succeed.</p>
          <ul className="benefits">
            {BENEFITS.map((b) => (
              <li key={b}><span className="gold-dot" aria-hidden="true" />{b}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2 className="center">Our teams</h2>
          <div className="roles">
            {ROLES.map((r) => (
              <div className="role-card" key={r.title}>
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </div>
            ))}
          </div>
          <div className="cta-inline">
            <h3>Speak to the NGA team</h3>
            <div className="btn-row">
              <a className="btn btn-outline" href={`tel:${db.settings.phoneTel}`}>Call {db.settings.phone}</a>
              <a className="btn btn-outline" href={WA_BASE} target="_blank" rel="noopener noreferrer">WhatsApp</a>
              <Link className="btn btn-gold" href="/contact/">Enquire Now</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="wrap">
          <h2>Start Your Journey Today</h2>
          <Link className="btn btn-gold" href="/contact/">Register Now</Link>
        </div>
      </section>
    </>
  );
}
