import { readDb } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { updateSettings } from '../actions';

export const dynamic = 'force-dynamic';

export default function AdminSite({ searchParams }) {
  requireAdmin();
  const db = readDb();
  const s = db.settings;
  return (
    <>
      <h1>Site settings</h1>
      {searchParams?.saved ? <p className="notice">Saved and live on the website.</p> : null}
      <form action={updateSettings} className="panel stack">
        <h2>Contact</h2>
        <div className="grid2">
          <label>Phone (shown)<input name="phone" defaultValue={s.phone} /></label>
          <label>Phone (tel link, digits with country code)<input name="phoneTel" defaultValue={s.phoneTel} /></label>
          <label>WhatsApp number (digits with country code)<input name="whatsapp" defaultValue={s.whatsapp} /></label>
          <label>Email<input name="email" type="email" defaultValue={s.email} /></label>
        </div>
        <label>Address (one line per row)<textarea name="address" rows={3} defaultValue={s.address.join('\n')} /></label>
        <label>Map search text<input name="mapQuery" defaultValue={s.mapQuery} /></label>
        <label>Visiting and calling hours<input name="hours" defaultValue={s.hours} /></label>

        <h2>Home hero</h2>
        <label>Eyebrow<input name="heroEyebrow" defaultValue={db.home.heroEyebrow} /></label>
        <label>Headline<input name="heroTitle" defaultValue={db.home.heroTitle} /></label>
        <label>Subtext<textarea name="heroText" rows={3} defaultValue={db.home.heroText} /></label>

        <button className="btn btn-gold" type="submit">Save settings</button>
      </form>
    </>
  );
}
