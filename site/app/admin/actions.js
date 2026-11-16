'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { readDb, writeDb } from '@/lib/db';
import { COOKIE, sign, checkCredentials, assertAdmin } from '@/lib/auth';

const str = (fd, k) => String(fd.get(k) ?? '').trim();
const int = (fd, k, d = 0) => {
  const n = parseInt(str(fd, k), 10);
  return Number.isFinite(n) ? n : d;
};

function refreshSite() {
  revalidatePath('/', 'layout');
}

export async function login(formData) {
  const email = str(formData, 'email');
  const password = str(formData, 'password');
  if (!checkCredentials(email, password)) redirect('/admin?error=1');
  cookies().set(COOKIE, sign(email), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 12 * 3600,
  });
  redirect('/admin');
}

export async function logout() {
  cookies().delete(COOKIE);
  redirect('/admin');
}

export async function updateCourse(formData) {
  assertAdmin();
  const slug = str(formData, 'slug');
  const db = readDb();
  const c = db.courses.find((x) => x.slug === slug);
  if (!c) throw new Error('Course not found');
  c.title = str(formData, 'title') || c.title;
  c.duration = str(formData, 'duration') || c.duration;
  c.durationDays = int(formData, 'durationDays', c.durationDays);
  c.description = str(formData, 'description');
  c.includes = str(formData, 'includes').split('\n').map((s) => s.trim()).filter(Boolean);
  c.poster = str(formData, 'poster') || c.poster;
  c.certificate = str(formData, 'certificate');
  c.order = int(formData, 'order', c.order);
  c.trending = formData.get('trending') === 'on';
  c.hidden = formData.get('hidden') === 'on';
  writeDb(db);
  refreshSite();
  revalidatePath('/admin/courses');
  redirect('/admin/courses?saved=1');
}

export async function updateBatch(formData) {
  assertAdmin();
  const id = str(formData, 'id');
  const db = readDb();
  const b = db.batches.find((x) => x.id === id);
  if (!b) throw new Error('Batch not found');
  b.name = str(formData, 'name') || b.name;
  b.startDate = str(formData, 'startDate');
  b.seatsTotal = int(formData, 'seatsTotal', b.seatsTotal);
  b.seatsLeft = Math.max(0, int(formData, 'seatsLeft', b.seatsLeft));
  if (formData.has('announcement')) {
    db.settings.announcement = str(formData, 'announcement') || db.settings.announcement;
  }
  writeDb(db);
  refreshSite();
  revalidatePath('/admin/batches');
  redirect('/admin/batches?saved=1');
}

export async function updateSettings(formData) {
  assertAdmin();
  const db = readDb();
  const s = db.settings;
  s.phone = str(formData, 'phone') || s.phone;
  s.phoneTel = str(formData, 'phoneTel') || s.phoneTel;
  s.whatsapp = str(formData, 'whatsapp') || s.whatsapp;
  s.email = str(formData, 'email') || s.email;
  s.address = str(formData, 'address').split('\n').map((x) => x.trim()).filter(Boolean);
  s.mapQuery = str(formData, 'mapQuery') || s.mapQuery;
  s.hours = str(formData, 'hours') || s.hours;
  db.home.heroEyebrow = str(formData, 'heroEyebrow') || db.home.heroEyebrow;
  db.home.heroTitle = str(formData, 'heroTitle') || db.home.heroTitle;
  db.home.heroText = str(formData, 'heroText') || db.home.heroText;
  writeDb(db);
  refreshSite();
  revalidatePath('/admin/site');
  redirect('/admin/site?saved=1');
}

export async function updateEnquiry(formData) {
  assertAdmin();
  const id = str(formData, 'id');
  const status = str(formData, 'status');
  const allowed = ['New', 'Contacted', 'Counselling Done', 'Enrolled', 'Closed'];
  const db = readDb();
  const e = db.enquiries.find((x) => x.id === id);
  if (!e) throw new Error('Enquiry not found');
  if (allowed.includes(status)) e.status = status;
  e.notes = str(formData, 'notes');
  writeDb(db);
  revalidatePath('/admin/enquiries');
  redirect('/admin/enquiries?saved=1');
}
