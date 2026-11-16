import crypto from 'crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const COOKIE = 'nga_admin';
const SECRET = process.env.ADMIN_SECRET || 'demo-only-secret-set-ADMIN_SECRET-before-launch';

// Admin login is read from environment variables. The fallback values are a
// DEMO PLACEHOLDER only. NGA must set ADMIN_EMAIL, ADMIN_PASSWORD and
// ADMIN_SECRET before go live.
export function checkCredentials(email, password) {
  const E = process.env.ADMIN_EMAIL || 'demo-admin@example.com';
  const P = process.env.ADMIN_PASSWORD || 'DemoOnly-Change-Before-Launch';
  return email === E && password === P;
}

export function sign(email) {
  const exp = Date.now() + 12 * 3600 * 1000;
  const payload = `${email}|${exp}`;
  const sig = crypto.createHmac('sha256', SECRET).update(payload).digest('hex');
  return `${payload}|${sig}`;
}

export function verify(token) {
  if (!token) return null;
  const [email, exp, sig] = token.split('|');
  const good = crypto.createHmac('sha256', SECRET).update(`${email}|${exp}`).digest('hex');
  if (!sig || sig !== good || Date.now() > Number(exp)) return null;
  return email;
}

export function currentAdmin() {
  return verify(cookies().get(COOKIE)?.value);
}

export function assertAdmin() {
  if (!currentAdmin()) throw new Error('Not authorised');
}

// For admin pages: send logged out visitors to the login screen.
export function requireAdmin() {
  if (!currentAdmin()) redirect('/admin');
}
