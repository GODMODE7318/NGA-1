# National Global Academy website and admin panel

## Run locally

    npm install
    npm run dev        # http://localhost:3000

## Before go live

1. **Admin login.** Set these environment variables. The defaults in `lib/auth.js` are a demo placeholder only:
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
   - `ADMIN_SECRET` (a long random string, used to sign admin sessions)
2. **Database.** Content and enquiries are stored in `data/db.json` through `lib/db.js`. That file is writable locally but read-only on Vercel, so admin edits will not save on a Vercel deployment. Replace `readDb` and `writeDb` in `lib/db.js` with a real database (for example Postgres or Supabase) before launch.
3. **Logo.** `public/assets/brand/nga-logo.png` is the brown logo on white, used as a white chip in the footer. Replace it with `national-global-academy-live-logo-cropped-white.png` (transparent) once available.
4. **Missing brand logos.** Carnival, Holland America, Viking and P&O SVGs are not yet in `public/assets/logos/`. The logo strip skips any logo whose file is missing, so add the files and the strip updates.
5. **Industry videos.** Set a video path per industry in `data/db.json` (field `video`). Until then the card shows the poster image.
6. **Guides.** Guide articles are added in the admin panel once they are verified. None are published yet.

## Pages

- `/` Home
- `/courses/all/` Courses hub (sorted shortest first)
- `/courses/<slug>/` Six course detail pages
- `/contact/` Contact and Book Free Counselling
- `/about/` About
- `/guides/` Guides index
- `/admin/` Staff login and dashboard (not linked from the public site)

## Enquiries

Form submissions are stored in `data/db.json` and open WhatsApp with all 10 fields in the same order. Export from `/admin/enquiries/` as CSV.
