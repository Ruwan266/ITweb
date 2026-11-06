# SEO, deployment and search setup

For whoever deploys and maintains this site. Production is `https://smartinfinityn.com`, hosted on Vercel.

## How it works

`npm run build` runs three steps:

1. `vite build` produces the client app in `out/`.
2. `vite build --ssr` bundles `src/entry-server.tsx`.
3. `scripts/prerender.mjs` renders the real React tree into static HTML for every public route.

Visitors and crawlers get the same HTML, which React then hydrates. The build also writes:

| File | Purpose |
|---|---|
| `out/<route>.html` | Public pages, served at clean URLs through `cleanUrls` in `vercel.json` |
| `out/404.html` | Real 404 status, noindex |
| `out/spa.html` | Empty noindex shell for `/admin/*` and `/projects/:slug` |
| `out/sitemap.xml`, `out/robots.txt` | Generated from the page registry |

## Where to change things

| To change | Edit |
|---|---|
| Business name, phone, address, service area, social profiles | `src/seo/site.ts` |
| Titles, descriptions, indexing for main pages | `src/seo/pages.ts` |
| Service page content and FAQs | `src/seo/services.ts` |
| Structured data | `src/seo/schema.ts` |
| Redirects, rewrites, headers | `vercel.json` |

A new service page only needs an entry in `SERVICE_PAGES`. The route, sitemap, schema and metadata follow automatically. Set `published: false` to hold a page back. Only add services the business actually sells.

## Commands

| Command | What it does |
|---|---|
| `npm run build` | Full production build with prerender |
| `npm run seo:audit` | Audits `out/` and writes `seo-reports/audit.md` and `audit.json` |
| `npm run seo:audit -- --live` | Audits the deployed site, one request at a time |
| `npm run seo:keywords -- validate` | Checks `seo/keyword-map.csv` against the sitemap |
| `npm run seo:keywords -- import file.csv --source "Google Search Console"` | Merges a keyword export, removing duplicates |

## Keyword data

`seo/keyword-map.csv` is planning data only. It never generates pages or tags and is not deployed. Seed rows have blank metrics on purpose. The importer drops search volume, competition and position values unless a source is named, so use real exports only.

Rows with status `needs-business-confirmation` (ERP, HRMS, CRM, mobile apps, managed IT) are searches with no matching page. Confirm that the business sells the service before creating one.

## Deployment checklist

1. Deploy to a Vercel **preview** first. Vercel sets the output folder and build command from `vercel.json`, overriding the dashboard.
2. On the preview, confirm:
   - `/about` and `/services/cybersecurity` return 200 when loaded directly.
   - `/nope` returns 404.
   - `/admin` loads and sends `X-Robots-Tag: noindex`.
   - `/projects/finflow-digital-banking` loads and sends `X-Robots-Tag: noindex`.
   - Admin login works.
3. Set any verification tokens (below), then promote to production.
4. Run `npm run seo:audit -- --live`.
5. Submit the sitemap (below).

`vercel.json` could only be tested against a local emulation of its rules, so step 2 is the first real test of the routing.

## Rollback

- **Vercel:** Deployments, choose the previous production deployment, then Instant Rollback. No code or data changes are needed.
- **Code:** this folder is not a git repository, so run `git init` and commit before further work.
- **Other hosts:** Vercel rules do not apply on cPanel. Apache also needs a rewrite that serves `<path>.html`, and the build folder is `out/`, not `dist/` as `SETUP.md` says. This setup has not been tested.

## Search engine setup (requires account ownership)

**Google Search Console**

1. Add a Domain property for `smartinfinityn.com` and verify it with the DNS TXT record. This is the preferred method. Alternatively, set `VITE_GOOGLE_SITE_VERIFICATION` in Vercel and redeploy.
2. Submit `https://smartinfinityn.com/sitemap.xml`.
3. Use URL Inspection on the homepage and two service pages, then request indexing for those few.
4. Monitor the Pages report for excluded URLs and canonical conflicts.

Do not use Google's Indexing API for these pages. It is restricted to job postings and livestream content. Sitemaps and internal links are the right mechanism.

**Bing Webmaster Tools**

Import from Search Console, or set `VITE_BING_SITE_VERIFICATION`, then submit the sitemap. IndexNow is optional. It needs a key file, and only known URLs should be submitted.

**Business profiles**

Claim Google Business Profile and Bing Places using the same name, address and phone as `src/seo/site.ts`.

**Validation after deployment**

Run a service page through the [Rich Results Test](https://search.google.com/test/rich-results) and the [Schema Markup Validator](https://validator.schema.org/). FAQ markup is valid but does not guarantee FAQ rich results.

## Decisions worth keeping

- **`/admin` is not disallowed in robots.txt.** Crawlers must be able to fetch it to see noindex. Login is what protects it.
- **No hreflang.** All 11 languages share one URL and switch on the client, and most translations are partial. Hreflang needs one URL per language, so only English is indexed.
- **No `llms.txt`.** It is not a Google ranking feature, and the prerendered pages already give AI crawlers the same content.
- **`dark:` classes remain in components but do nothing.** Nothing sets the `dark` class any more. `darkMode: 'class'` must stay in the Tailwind config, or those classes would start following the visitor's OS setting.
