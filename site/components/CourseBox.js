import Link from 'next/link';

// One wide course box: poster left, title and description right.
export default function CourseBox({ course, showDetailLink = true }) {
  return (
    <article className="course-box" id={course.slug}>
      <div className="course-poster">
        <img src={course.poster} alt="" loading="lazy" />
      </div>
      <div className="course-body">
        <h3>{course.title}</h3>
        <p>{course.description}</p>
        <div className="highlights">
          <div className="hl">
            <span>Duration</span>
            <strong>{course.duration}</strong>
          </div>
          <div className="hl">
            <span>Certificate</span>
            <strong>{course.certificate || 'Certificate'}</strong>
          </div>
        </div>
        <h4>What is included</h4>
        <ul className="checklist">
          {course.includes.map((i) => <li key={i}>{i}</li>)}
        </ul>
        {showDetailLink ? (
          <Link className="btn btn-outline" href={`/courses/${course.slug}/`}>View Course</Link>
        ) : null}
      </div>
    </article>
  );
}
