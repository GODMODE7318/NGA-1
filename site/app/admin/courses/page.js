import { readDb } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { updateCourse } from '../actions';

export const dynamic = 'force-dynamic';

export default function AdminCourses({ searchParams }) {
  requireAdmin();
  const courses = [...readDb().courses].sort((a, b) => a.order - b.order);
  return (
    <>
      <h1>Courses</h1>
      <p className="muted">Changes update the public Courses page and course pages straight away. Each course has its own form below.</p>
      {searchParams?.saved ? <p className="notice">Saved.</p> : null}
      {courses.map((c) => (
        <details className="panel" key={c.slug}>
          <summary>{c.order}. {c.title} {c.hidden ? '(hidden)' : ''}</summary>
          <form action={updateCourse} className="stack">
            <input type="hidden" name="slug" value={c.slug} />
            <label>Name<input name="title" defaultValue={c.title} required /></label>
            <div className="grid2">
              <label>Duration (text)<input name="duration" defaultValue={c.duration} /></label>
              <label>Duration in days (sorting)<input name="durationDays" type="number" defaultValue={c.durationDays} /></label>
              <label>Order<input name="order" type="number" defaultValue={c.order} /></label>
              <label>Certificate name (leave blank to show &quot;Certificate&quot;)<input name="certificate" defaultValue={c.certificate || ''} /></label>
            </div>
            <label>Description<textarea name="description" rows={3} defaultValue={c.description} /></label>
            <label>What is included (one item per line)<textarea name="includes" rows={7} defaultValue={c.includes.join('\n')} /></label>
            <label>Poster image path<input name="poster" defaultValue={c.poster} /></label>
            <div className="checks">
              <label><input type="checkbox" name="trending" defaultChecked={c.trending} /> Most Trending badge</label>
              <label><input type="checkbox" name="hidden" defaultChecked={c.hidden} /> Hide this course</label>
            </div>
            <button className="btn btn-gold" type="submit">Save course</button>
          </form>
        </details>
      ))}
    </>
  );
}
