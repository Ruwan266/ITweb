import type { PageSeo } from './pages';
import { INDEXABLE_PAGES } from './pages';
import { buildJsonLd, serializeJsonLd } from './schema';
import { SITE, SITE_URL, absoluteUrl } from './site';

type Attrs = Record<string, string>;

export interface HeadTags {
  title: string;
  meta: Attrs[];
  links: Attrs[];
  jsonLd: string | null;
}

/** Search engine ownership tokens; safe to expose, and only emitted when configured. */
function verificationMeta(): Attrs[] {
  const env = (import.meta as unknown as { env?: Record<string, string | undefined> }).env ?? {};
  const tags: Attrs[] = [];
  if (env.VITE_GOOGLE_SITE_VERIFICATION) {
    tags.push({ name: 'google-site-verification', content: env.VITE_GOOGLE_SITE_VERIFICATION });
  }
  if (env.VITE_BING_SITE_VERIFICATION) {
    tags.push({ name: 'msvalidate.01', content: env.VITE_BING_SITE_VERIFICATION });
  }
  return tags;
}

export function buildHeadTags(page: PageSeo): HeadTags {
  const url = absoluteUrl(page.path);
  const image = absoluteUrl(SITE.ogImagePath);
  const meta: Attrs[] = [
    { name: 'description', content: page.description },
    { name: 'robots', content: page.indexable ? 'index, follow, max-image-preview:large' : 'noindex, follow' },
  ];
  const links: Attrs[] = [];

  if (page.indexable) {
    links.push({ rel: 'canonical', href: url });
    meta.push(
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: SITE.name },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:url', content: url },
      { property: 'og:title', content: page.title },
      { property: 'og:description', content: page.description },
      { property: 'og:image', content: image },
      { property: 'og:image:width', content: String(SITE.ogImageWidth) },
      { property: 'og:image:height', content: String(SITE.ogImageHeight) },
      { property: 'og:image:alt', content: `${SITE.name} logo` },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: page.title },
      { name: 'twitter:description', content: page.description },
      { name: 'twitter:image', content: image },
    );
    if (page.path === '/') meta.push(...verificationMeta());
  }

  return {
    title: page.title,
    meta,
    links,
    jsonLd: page.indexable ? serializeJsonLd(buildJsonLd(page)) : null,
  };
}

const escapeHtml = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const attrsToHtml = (attrs: Attrs): string =>
  Object.entries(attrs)
    .map(([key, value]) => `${key}="${escapeHtml(value)}"`)
    .join(' ');

/** Static head markup used by the prerender step. */
export function renderHeadHtml(page: PageSeo): string {
  const head = buildHeadTags(page);
  return [
    `<title>${escapeHtml(head.title)}</title>`,
    ...head.meta.map((m) => `<meta data-seo ${attrsToHtml(m)} />`),
    ...head.links.map((l) => `<link data-seo ${attrsToHtml(l)} />`),
    ...(head.jsonLd ? [`<script data-seo type="application/ld+json">${head.jsonLd}</script>`] : []),
  ].join('\n    ');
}

/** Keeps document head in sync during client-side navigation. */
export function applyHead(page: PageSeo): void {
  const head = buildHeadTags(page);
  document.title = head.title;
  document.head.querySelectorAll('[data-seo]').forEach((el) => el.remove());

  const append = (tag: string, attrs: Attrs, text?: string) => {
    const el = document.createElement(tag);
    el.setAttribute('data-seo', '');
    Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
    if (text) el.textContent = text;
    document.head.appendChild(el);
  };

  head.meta.forEach((attrs) => append('meta', attrs));
  head.links.forEach((attrs) => append('link', attrs));
  if (head.jsonLd) append('script', { type: 'application/ld+json' }, head.jsonLd);
}

export function buildSitemapXml(): string {
  const urls = INDEXABLE_PAGES.map((page) => {
    const lastmod = page.lastModified ? `\n    <lastmod>${page.lastModified}</lastmod>` : '';
    return `  <url>\n    <loc>${escapeHtml(absoluteUrl(page.path))}</loc>${lastmod}\n  </url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
}

/**
 * /admin is deliberately not disallowed: a crawler must be able to fetch those URLs
 * to see their noindex. Authentication, not robots.txt, is what protects them.
 */
export function buildRobotsTxt(): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
}
