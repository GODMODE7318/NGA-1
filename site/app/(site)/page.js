import Link from 'next/link';
import { readDb } from '@/lib/db';
import LogoMarquee from '@/components/LogoMarquee';
import IndustryCards from '@/components/IndustryCards';
import EnquiryForm from '@/components/EnquiryForm';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const db = readDb();
  const h = db.home;
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <p className="eyebrow">{h.heroEyebrow}</p>
            <h1>{h.heroTitle}</h1>
            <p className="lead">{h.heroText}</p>
            <div className="btn-row">
              <Link className="btn btn-gold" href="/courses/all/">Explore Courses</Link>
              <Link className="btn btn-outline-light" href="/contact/">Talk to an Advisor</Link>
            </div>
          </div>
          <div className="hero-media">
            <img src="/assets/hero-cruise.jpg" alt="Cruise ship sailing at sea" />
          </div>
        </div>
        <div className="wrap stats">
          {db.stats.map((s) => (
            <div className="stat" key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2 className="center">{h.logosHeading}</h2>
        </div>
        <LogoMarquee logos={db.logos} />
      </section>

      <section className="section tint">
        <div className="wrap">
          <h2 className="center">{h.industriesHeading}</h2>
          <IndustryCards industries={db.industries} />
        </div>
      </section>

      <section className="section dark">
        <div className="wrap split">
          <div className="split-media">
            <img src="/assets/nga-training.webp" alt="Trainees in navy uniforms practising cruise restaurant service in a training hall" loading="lazy" />
          </div>
          <div>
            <h2>{h.whyTitle}</h2>
            <ul className="points">
              {h.whyPoints.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2 className="center">How it works</h2>
          <ol className="steps">
            {h.steps.map((s) => (
              <li key={s.n}>
                <span className="step-n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section tint">
        <div className="wrap narrow">
          <h2 className="center">Questions families ask</h2>
          {h.faqs.map((f) => (
            <details className="faq" key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="section" id="enquiry">
        <div className="wrap split">
          <div>
            <h2>Book your free counselling call</h2>
            <p>We will discuss your course options, batch timing and the questions your family should ask next.</p>
          </div>
          <div className="form-card">
            <EnquiryForm source="/" />
          </div>
        </div>
      </section>
    </>
  );
}
