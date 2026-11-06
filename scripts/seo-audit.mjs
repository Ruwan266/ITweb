// Technical SEO audit for this site's own pages.
//
//   npm run seo:audit                 audits the local build in out/
//   npm run seo:audit -- --live       audits https://smartinfinityn.com (sequential, same-origin only)
//
// Writes seo-reports/audit.json and audit.md. Exits 1 if any error-severity issue is found.
import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ORIGIN = 'https://smartinfinityn.com';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'out');
const reportDir = join(root, 'seo-reports');
const live = process.argv.includes('--live');

/** Routes that vercel.json rewrites to the SPA shell, so links to them resolve. */
const SHELL_ROUTES = [/^\/admin(\/|$)/, /^\/projects\/[^/]+$/];
const TITLE_MAX = 70;
const DESCRIPTION_RANGE = [70, 170];
const LARGE_FILE_BYTES = 300 * 1024;

const issues = [];
const report = (severity, issue, url, evidence, fix) => issues.push({ severity, issue, url, evidence, recommendation: fix, status: 'open' });

const fetchText = async (path) => {
  const res = await fetch(`${ORIGIN}${path}`, { redirect: 'manual', headers: { 'User-Agent': 'SmartInfinity-SEO-Audit/1.0' } });
  return { status: res.status, location: res.headers.get('location'), robotsHeader: res.headers.get('x-robots-tag'), body: await res.text() };
};

const readLocal = async (file) => {
  try {
    return await readFile(join(outDir, file), 'utf8');
  } catch {
    return null;
  }
};

const walk = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(entries.map((e) => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)])));
  return nested.flat();
};

const attr = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]*)"`, 'i'))?.[1] ?? null;
const metaContent = (html, key, value) => {
  for (const tag of html.match(/<meta\b[^>]*>/gi) ?? []) if (attr(tag, key) === value) return attr(tag, 'content');
  return null;
};
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#x27;/g, "'");
const stripTags = (s) => s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

function auditJsonLd(url, html) {
  const blocks = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  if (blocks.length === 0) return report('error', 'Missing structured data', url, 'No JSON-LD block', 'Check the page entry in src/seo/pages.ts.');
  for (const [, json] of blocks) {
    let data;
    try {
      data = JSON.parse(json);
    } catch (err) {
      report('error', 'Invalid JSON-LD', url, err.message, 'Fix serialization in src/seo/schema.ts.');
      continue;
    }
    const nodes = data['@graph'] ?? [data];
    const ids = nodes.map((n) => n['@id']).filter(Boolean);
    for (const id of ids) {
      if (ids.indexOf(id) !== ids.lastIndexOf(id)) report('error', 'Duplicate JSON-LD @id', url, id, 'Keep one node per @id.');
      if (!id.startsWith(ORIGIN)) report('error', 'Non-production JSON-LD @id', url, id, 'Use SITE_URL for identifiers.');
    }
    for (const ref of JSON.stringify(data).matchAll(/\{"@id":"([^"]+)"\}/g)) {
      if (!ids.includes(ref[1])) report('error', 'Dangling JSON-LD reference', url, ref[1], 'Reference a node present in the graph.');
    }
    const faq = nodes.find((n) => n['@type'] === 'FAQPage');
    for (const question of faq?.mainEntity ?? []) {
      if (!decode(stripTags(html)).includes(question.name)) {
        report('error', 'FAQ schema not visible on page', url, question.name, 'FAQ markup must match visible text.');
      }
    }
  }
}

function auditHeadings(url, html) {
  const body = html.slice(html.indexOf('<body'));
  const levels = [...body.matchAll(/<h([1-6])\b/gi)].map((m) => Number(m[1]));
  const h1Count = levels.filter((l) => l === 1).length;
  if (h1Count !== 1) report(h1Count === 0 ? 'error' : 'warning', 'Page should have exactly one h1', url, `Found ${h1Count}`, 'Use one h1 and h2 onward for sections.');
  levels.forEach((level, i) => {
    if (i > 0 && level > levels[i - 1] + 1) report('info', 'Heading level skipped', url, `h${levels[i - 1]} followed by h${level}`, 'Keep the heading outline sequential.');
  });
}

function auditImages(url, html) {
  for (const tag of html.match(/<img\b[^>]*>/gi) ?? []) {
    if (attr(tag, 'alt') === null) report('warning', 'Image missing alt attribute', url, (attr(tag, 'src') ?? tag).slice(0, 100), 'Add descriptive alt text, or alt="" if decorative.');
  }
}

function collectInternalLinks(html) {
  const body = html.slice(html.indexOf('<body'));
  return [...body.matchAll(/<a\b[^>]*\bhref="([^"]+)"/gi)]
    .map((m) => decode(m[1]))
    .filter((href) => href.startsWith('/') && !href.startsWith('//'))
    .map((href) => href.split('#')[0].split('?')[0])
    .filter(Boolean);
}

function auditPage(url, path, html, expectIndexable) {
  const title = decode(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? '');
  const description = decode(metaContent(html, 'name', 'description') ?? '');
  const robots = metaContent(html, 'name', 'robots') ?? '';
  const canonicalTag = (html.match(/<link\b[^>]*>/gi) ?? []).find((t) => attr(t, 'rel') === 'canonical');
  const canonical = canonicalTag ? attr(canonicalTag, 'href') : null;
  const expected = path === '/' ? `${ORIGIN}/` : `${ORIGIN}${path}`;

  if (!title) report('error', 'Missing title', url, '', 'Set a title in src/seo/pages.ts.');
  else if (title.length > TITLE_MAX) report('warning', 'Long title', url, `${title.length} chars: ${title}`, `Keep titles under ${TITLE_MAX} characters.`);
  if (!description) report('error', 'Missing meta description', url, '', 'Set a description in src/seo/pages.ts.');
  else if (description.length < DESCRIPTION_RANGE[0] || description.length > DESCRIPTION_RANGE[1]) {
    report('warning', 'Meta description length', url, `${description.length} chars`, `Aim for ${DESCRIPTION_RANGE.join(' to ')} characters.`);
  }
  if (expectIndexable) {
    if (canonical !== expected) report('error', 'Incorrect canonical', url, `Found ${canonical}, expected ${expected}`, 'Canonical must self-reference the production URL.');
    if (robots.includes('noindex')) report('error', 'Sitemap page is noindex', url, robots, 'Remove noindex or drop the page from the sitemap.');
    if (!metaContent(html, 'property', 'og:image')) report('warning', 'Missing Open Graph image', url, '', 'Check buildHeadTags in src/seo/head.ts.');
    auditJsonLd(url, html);
  }
  if (/localhost|127\.0\.0\.1|\.vercel\.app/i.test(html.slice(0, html.indexOf('<body')))) {
    report('error', 'Development URL in head', url, 'localhost or vercel.app found', 'Only the production origin may appear in head tags.');
  }
  const text = stripTags(html.slice(html.indexOf('<body')).replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, ''));
  if (expectIndexable && text.length < 500) report('error', 'Thin crawlable HTML', url, `${text.length} characters of text`, 'Page must prerender its main content.');
  auditHeadings(url, html);
  auditImages(url, html);
  return { url, path, title, description, links: [...new Set(collectInternalLinks(html))] };
}

function reportDuplicates(pages, field, label) {
  const seen = new Map();
  for (const page of pages) {
    if (!page[field]) continue;
    if (seen.has(page[field])) report('error', `Duplicate ${label}`, page.url, `Same as ${seen.get(page[field])}: ${page[field]}`, `Give each page a unique ${label}.`);
    else seen.set(page[field], page.url);
  }
}

async function run() {
  const sitemap = live ? (await fetchText('/sitemap.xml')).body : await readLocal('sitemap.xml');
  const robotsTxt = live ? (await fetchText('/robots.txt')).body : await readLocal('robots.txt');
  if (!sitemap?.includes('<urlset')) report('error', 'Missing sitemap', `${ORIGIN}/sitemap.xml`, 'No urlset found', 'Run npm run build and deploy.');
  if (!robotsTxt?.includes(`Sitemap: ${ORIGIN}/sitemap.xml`)) report('error', 'robots.txt missing sitemap', `${ORIGIN}/robots.txt`, robotsTxt?.slice(0, 80) ?? 'not found', 'Run npm run build and deploy.');
  if (/^Disallow:\s*\/\s*$/im.test(robotsTxt ?? '')) report('error', 'robots.txt blocks the site', `${ORIGIN}/robots.txt`, 'Disallow: /', 'Remove the rule.');

  const urls = [...(sitemap ?? '').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (new Set(urls).size !== urls.length) report('error', 'Duplicate sitemap URL', `${ORIGIN}/sitemap.xml`, '', 'Each URL once.');

  const pages = [];
  for (const url of urls) {
    if (!url.startsWith(`${ORIGIN}`)) {
      report('error', 'Non-production sitemap URL', url, '', 'Use the production origin.');
      continue;
    }
    const path = url.slice(ORIGIN.length).replace(/\/$/, '') || '/';
    let html;
    if (live) {
      const res = await fetchText(path);
      if (res.status !== 200) {
        report('error', 'Sitemap URL does not return 200', url, `HTTP ${res.status} ${res.location ?? ''}`, 'Sitemap URLs must resolve directly.');
        continue;
      }
      if (res.robotsHeader?.includes('noindex')) report('error', 'Sitemap URL has X-Robots-Tag noindex', url, res.robotsHeader, 'Remove the header.');
      html = res.body;
    } else {
      html = await readLocal(path === '/' ? 'index.html' : `${path.slice(1)}.html`);
      if (html === null) {
        report('error', 'Sitemap URL has no prerendered file', url, path, 'Check scripts/prerender.mjs.');
        continue;
      }
    }
    pages.push(auditPage(url, path, html, true));
  }

  reportDuplicates(pages, 'title', 'title');
  reportDuplicates(pages, 'description', 'meta description');

  const known = new Set(pages.map((p) => p.path));
  const inbound = new Map(pages.map((p) => [p.path, 0]));
  const broken = new Map();
  for (const page of pages) {
    for (const link of page.links) {
      const path = link.replace(/\/$/, '') || '/';
      if (inbound.has(path) && path !== page.path) inbound.set(path, inbound.get(path) + 1);
      if (known.has(path) || SHELL_ROUTES.some((re) => re.test(path))) continue;
      broken.set(path, [...(broken.get(path) ?? []), page.path]);
    }
  }
  for (const [path, from] of broken) {
    report('error', 'Broken internal link', `${ORIGIN}${path}`, `Linked from ${from.length} page(s), e.g. ${from[0]}`, 'Create the page or remove the link.');
  }
  for (const [path, count] of inbound) {
    if (path !== '/' && count === 0) report('warning', 'Orphaned page', `${ORIGIN}${path}`, 'No internal links from other pages', 'Link it from a related page.');
  }

  if (live) {
    for (const [path, expected] of [['/this-page-should-not-exist', 404]]) {
      const res = await fetchText(path);
      if (res.status !== expected) report('error', 'Unexpected status code', `${ORIGIN}${path}`, `HTTP ${res.status}, expected ${expected}`, 'Check vercel.json; soft 404s harm indexing.');
    }
    const admin = await fetchText('/admin');
    if (!admin.robotsHeader?.includes('noindex')) report('error', 'Admin not noindex', `${ORIGIN}/admin`, `X-Robots-Tag: ${admin.robotsHeader}`, 'Check vercel.json headers.');
  } else {
    const notFound = await readLocal('404.html');
    if (!notFound?.includes('noindex')) report('error', '404 page is indexable', `${ORIGIN}/404`, '', 'The 404 page must be noindex.');
    const shell = await readLocal('spa.html');
    if (!shell?.includes('noindex')) report('error', 'SPA shell is indexable', `${ORIGIN}/spa`, '', 'The SPA shell must be noindex.');
    for (const file of await walk(outDir)) {
      if (file.endsWith('.map')) continue;
      const { size } = await stat(file);
      const name = relative(outDir, file).split(sep).join('/');
      if (size > LARGE_FILE_BYTES) report('info', 'Large file', name, `${Math.round(size / 1024)} KB`, 'Compress it or load it on demand.');
    }
  }
  return pages;
}

const pages = await run();
const counts = Object.fromEntries(['error', 'warning', 'info'].map((s) => [s, issues.filter((i) => i.severity === s).length]));
await mkdir(reportDir, { recursive: true });
const scope = live ? ORIGIN : 'local build (out/)';
await writeFile(join(reportDir, 'audit.json'), JSON.stringify({ scope, generatedAt: new Date().toISOString(), pagesAudited: pages.length, counts, issues }, null, 2));
const rows = issues.map((i) => `| ${i.severity} | ${i.issue} | ${i.url} | ${String(i.evidence).replace(/\|/g, '\\|')} | ${i.recommendation} | ${i.status} |`);
await writeFile(
  join(reportDir, 'audit.md'),
  `# SEO audit: ${scope}\n\nPages audited: ${pages.length}. Errors: ${counts.error}. Warnings: ${counts.warning}. Info: ${counts.info}.\n\n| Severity | Issue | URL | Evidence | Recommendation | Status |\n|---|---|---|---|---|---|\n${rows.join('\n')}\n`,
);
console.log(`Audited ${pages.length} pages in ${scope}: ${counts.error} errors, ${counts.warning} warnings, ${counts.info} info`);
for (const i of issues) console.log(`  [${i.severity}] ${i.issue}: ${i.url} ${i.evidence}`);
process.exitCode = counts.error > 0 ? 1 : 0;
