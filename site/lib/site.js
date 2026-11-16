// Shared, non-server helpers (safe to import from client components).
export const WA_BASE = 'https://wa.me/918858334842';

export const INTERESTS = ['Cruise Industry', 'Merchant Navy', 'Aviation', 'Hospitality'];

// The 10 enquiry fields, in the order the spec requires. Used by the form,
// the API, the WhatsApp message and the admin export.
export const FIELDS = [
  { name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Your full name' },
  { name: 'age', label: 'Age', type: 'number', required: true, placeholder: 'Your age in years' },
  { name: 'location', label: 'Location', type: 'text', required: true, placeholder: 'City, State' },
  { name: 'qualification', label: 'Highest Qualification', type: 'text', required: true, placeholder: 'e.g. 12th Science, B.Com, ITI' },
  { name: 'experience', label: 'Experience', type: 'text', placeholder: 'e.g. Fresher, or 2 years in hospitality' },
  { name: 'stcw', label: 'STCW', type: 'select', required: true, options: ['Yes', 'No'] },
  { name: 'mobile', label: 'Mobile no.', type: 'tel', required: true, prefix: '+91' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
  { name: 'interest', label: 'Interested in', type: 'select', required: true, options: INTERESTS },
  { name: 'help', label: 'What would you like help with?', type: 'textarea' },
];

export function validateEnquiry(fields) {
  for (const f of FIELDS) {
    if (f.required && !String(fields[f.name] ?? '').trim()) return `${f.label} is required.`;
  }
  if (!/^\d{10}$/.test(String(fields.mobile ?? '').trim())) return 'Enter a 10 digit mobile number.';
  if (!['Yes', 'No'].includes(fields.stcw)) return 'Select Yes or No for STCW.';
  if (!INTERESTS.includes(fields.interest)) return 'Select an industry.';
  return null;
}

export function buildWaMessage(fields) {
  const lines = ['Hello NGA, I would like free admission counselling.'];
  for (const f of FIELDS) {
    let v = String(fields[f.name] ?? '').trim() || '-';
    if (f.name === 'mobile' && v !== '-') v = `+91 ${v}`;
    lines.push(`${f.label}: ${v}`);
  }
  return lines.join('\n');
}

export function waLink(text) {
  return text ? `${WA_BASE}?text=${encodeURIComponent(text)}` : WA_BASE;
}

export function mapEmbed(query) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

export function mapDirections(query) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
}
