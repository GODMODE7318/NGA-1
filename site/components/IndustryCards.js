import Link from 'next/link';

// Used on the home page and the Courses hub, so both always show the same cards.
export default function IndustryCards({ industries }) {
  return (
    <div className="industry-grid">
      {industries.map((ind) => (
        <article className="industry-card" key={ind.id} id={ind.id}>
          <div className="industry-media">
            {ind.video ? (
              <video autoPlay muted loop playsInline poster={ind.image} preload="metadata" aria-hidden="true">
                <source src={ind.video} type="video/mp4" />
              </video>
            ) : (
              <img src={ind.image} alt="" loading="lazy" />
            )}
            {ind.trending ? <span className="badge">Most Trending</span> : null}
          </div>
          <div className="industry-body">
            <h3>{ind.title}</h3>
            <ul>
              {ind.items.map((it) => (
                <li key={it.name}>
                  <span>{it.name}</span>
                  {it.duration ? <em>{it.duration}</em> : null}
                </li>
              ))}
            </ul>
            <Link className="btn btn-outline" href={ind.link}>View Courses</Link>
          </div>
        </article>
      ))}
    </div>
  );
}
