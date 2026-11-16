import fs from 'fs';
import path from 'path';

// Continuous one-row logo marquee. Only logos whose SVG file exists are shown,
// so no broken images appear. The list is duplicated so the loop has no gap.
export default function LogoMarquee({ logos }) {
  const dir = path.join(process.cwd(), 'public', 'assets', 'logos');
  const present = logos.filter((l) => fs.existsSync(path.join(dir, l.file)));
  if (present.length === 0) return null;
  const loop = [...present, ...present];
  return (
    <div className="marquee" aria-label="Employers and cruise lines">
      <div className="marquee-track">
        {loop.map((l, i) => (
          <div className="logo-item" key={`${l.file}-${i}`} aria-hidden={i >= present.length ? 'true' : undefined}>
            <img src={`/assets/logos/${l.file}`} alt={i < present.length ? l.name : ''} />
          </div>
        ))}
      </div>
    </div>
  );
}
