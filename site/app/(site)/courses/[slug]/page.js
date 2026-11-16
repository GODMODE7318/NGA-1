import Link from 'next/link';
import { notFound } from 'next/navigation';
import { readDb } from '@/lib/db';
import { WA_BASE } from '@/lib/site';
import CourseBox from '@/components/CourseBox';

export const dynamic = 'force-dynamic';

export function generateMetadata({ params }) {
  const c = readDb().courses.find((x) => x.slug === params.slug);
  return { title: c ? `${c.title} | National Global Academy` : 'Course | National Global Academy' };
}

export default function CoursePage({ params }) {
  const db = readDb();
  const course = db.courses.find((c) => c.slug === params.slug && !c.hidden);
  if (!course) notFound();
  const related = db.courses.filter((c) => c.slug !== course.slug && !c.hidden).sort((a, b) => a.order - b.order);

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">{course.duration}</p>
          <h1>{course.title}</h1>
        </div>
      </section>

      <section className="section">
        <div className="wrap narrow">
          <CourseBox course={course} showDetailLink={false} />
          <div className="btn-row">
            <Link className="btn btn-gold" href="/contact/#enquiry">Enquire Now</Link>
            <a className="btn btn-outline" href={WA_BASE} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>
      </section>

      <section className="section tint">
        <div className="wrap">
          <h2 className="center">Related Courses</h2>
          <div className="related">
            {related.map((c) => (
              <Link className="related-card" href={`/courses/${c.slug}/`} key={c.slug}>
                <img src={c.poster} alt="" loading="lazy" />
                <span>{c.title}</span>
                <em>{c.duration}</em>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
