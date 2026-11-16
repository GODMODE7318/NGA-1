import Link from 'next/link';
import { mapEmbed, mapDirections } from '@/lib/site';

export default function Footer({ s }) {
  const query = s.mapQuery;
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <div className="logo-chip">
            <img src="/assets/brand/nga-logo.png" alt="National Global Academy" width="200" height="56" />
          </div>
          <h4>About</h4>
          <p>National Global Academy is a training and career guidance institute in Noida for cruise, Merchant Navy, aviation and hospitality pathways.</p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/courses/all/">Courses</Link></li>
            <li><Link href="/about/">About</Link></li>
            <li><Link href="/guides/">Guides</Link></li>
            <li><Link href="/contact/">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4>Career Pathways</h4>
          <ul>
            <li><Link href="/courses/all/#cruise-industry">Cruise Line Careers</Link></li>
            <li><Link href="/courses/all/#merchant-navy">Merchant Navy Careers</Link></li>
            <li><Link href="/courses/all/#aviation">Aviation Careers</Link></li>
            <li><Link href="/courses/all/#hospitality">Hospitality Careers</Link></li>
          </ul>
        </div>

        <div>
          <h4>Talk to a Counsellor</h4>
          <ul className="contact-list">
            <li><a href={`tel:${s.phoneTel}`}>{s.phone}</a></li>
            <li><a href={`mailto:${s.email}`}>{s.email}</a></li>
            <li>{s.address.join(', ')}</li>
          </ul>
          <iframe
            className="map"
            title="Map of National Global Academy, Noida"
            src={mapEmbed(query)}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <a className="directions" href={mapDirections(query)} target="_blank" rel="noopener noreferrer">Get Directions</a>
        </div>
      </div>
      <div className="wrap copy">Copyright 2026 National Global Academy. All rights reserved.</div>
    </footer>
  );
}
