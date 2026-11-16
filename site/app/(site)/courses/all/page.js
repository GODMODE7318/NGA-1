import { readDb } from '@/lib/db';
import IndustryCards from '@/components/IndustryCards';
import CourseBox from '@/components/CourseBox';

export const dynamic = 'force-dynamic';

export default function CoursesPage() {
  const db = readDb();
  const courses = db.courses
    .filter((c) => !c.hidden)
    .sort((a, b) => a.durationDays - b.durationDays || a.order - b.order);
  const anchorFor = { cruise: 'cruise-industry', 'merchant-navy': 'merchant-navy', aviation: 'aviation', hospitality: 'hospitality' };
  const seen = new Set();

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">COURSES</p>
          <h1>Find a course that fits your plans.</h1>
          <p className="lead">Explore our courses by duration, from shortest to longest.</p>
        </div>
      </section>

      <section className="section tint">
        <div className="wrap">
          <h2 className="center">Choose an industry to see its courses.</h2>
          <IndustryCards industries={db.industries} />
        </div>
      </section>

      <section className="section">
        <div className="wrap course-list">
          {courses.map((c) => {
            const anchor = anchorFor[c.industry];
            const first = anchor && !seen.has(anchor);
            if (first) seen.add(anchor);
            return (
              <div key={c.slug}>
                {first && c.industry === 'merchant-navy' ? (
                  <h2 className="group-heading" id={anchor}>Merchant Navy</h2>
                ) : first ? (
                  <span className="anchor" id={anchor} />
                ) : null}
                <CourseBox course={c} />
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
