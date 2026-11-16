// Filters enquiries for the admin list and the CSV export.
export function filterEnquiries(all, sp = {}) {
  const q = (sp.q || '').toLowerCase();
  return all.filter((e) => {
    if (sp.status && e.status !== sp.status) return false;
    if (sp.interest && e.fields.interest !== sp.interest) return false;
    const day = e.createdAt.slice(0, 10);
    if (sp.from && day < sp.from) return false;
    if (sp.to && day > sp.to) return false;
    if (q) {
      const hay = `${e.fields.name} ${e.fields.mobile} ${e.fields.email} ${e.fields.location}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}
