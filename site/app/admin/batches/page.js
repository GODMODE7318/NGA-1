import { readDb } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { updateBatch } from '../actions';

export const dynamic = 'force-dynamic';

export default function AdminBatches({ searchParams }) {
  requireAdmin();
  const db = readDb();
  return (
    <>
      <h1>Batches</h1>
      {searchParams?.saved ? <p className="notice">Saved. The announcement bar is updated on the live site.</p> : null}
      {db.batches.map((b) => (
        <form action={updateBatch} className="panel stack" key={b.id}>
          <input type="hidden" name="id" value={b.id} />
          <label>Batch name<input name="name" defaultValue={b.name} /></label>
          <div className="grid2">
            <label>Start date (optional)<input name="startDate" type="date" defaultValue={b.startDate} /></label>
            <label>Seats total<input name="seatsTotal" type="number" min="0" defaultValue={b.seatsTotal} /></label>
            <label>Seats left<input name="seatsLeft" type="number" min="0" defaultValue={b.seatsLeft} /></label>
          </div>
          <label>Upcoming Batch announcement bar text<textarea name="announcement" rows={2} defaultValue={db.settings.announcement} /></label>
          <p className="muted small">Use {'{seats}'} where the seats left number should appear. Separate items with a vertical bar (|).</p>
          <button className="btn btn-gold" type="submit">Save batch</button>
        </form>
      ))}
    </>
  );
}
