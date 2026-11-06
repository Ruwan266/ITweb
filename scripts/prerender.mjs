// Post-build step: writes one static HTML file per public route, plus 404.html, spa.html,
// sitemap.xml and robots.txt, into the client build output. Run through `npm run build`.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'out');
const ssrDir = join(root, '.ssr-build');

const HEAD_BLOCK = /<!--seo:start-->[\s\S]*?<!--seo:end-->/;
const ROOT_DIV = '<div id="root"></div>';

const server = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href);
const template = await readFile(join(outDir, 'index.html'), 'utf8');

if (!HEAD_BLOCK.test(template) || !template.includes(ROOT_DIV)) {
  throw new Error('index.html is missing the seo markers or the empty root element');
}

// React emits resource hints at the start of its output; they belong in <head>, not inside #root.
const LEADING_PRELOADS = /^(?:<link rel="preload"[^>]*\/>)+/;

const buildPage = (head, app = '') => {
  const preloads = app.match(LEADING_PRELOADS)?.[0] ?? '';
  const body = app.slice(preloads.length);
  return template
    .replace(HEAD_BLOCK, () => (preloads ? `${head}\n    ${preloads}` : head))
    .replace(ROOT_DIV, () => `<div id="root">${body}</div>`);
};

const writeOut = async (relativePath, contents) => {
  const file = join(outDir, relativePath);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, contents);
};

const pages = server.prerenderPages();
for (const { path, head, app } of pages) {
  if (!app.includes('<h1')) throw new Error(`Prerender of ${path} produced no <h1>`);
  // Vercel's cleanUrls serves about.html at /about.
  await writeOut(path === '/' ? 'index.html' : `${path.slice(1)}.html`, buildPage(head, app));
}

const notFound = server.prerenderNotFound();
await writeOut('404.html', buildPage(notFound.head, notFound.app));
await writeOut('spa.html', buildPage(server.shellHead()));
await writeOut('sitemap.xml', server.buildSitemapXml());
await writeOut('robots.txt', server.buildRobotsTxt());
console.log(`Prerendered ${pages.length} pages, 404.html, spa.html, sitemap.xml and robots.txt`);

// Cleanup only: Windows can briefly lock these files, which must not fail a finished build.
await rm(ssrDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 }).catch((err) => {
  console.warn(`Could not remove .ssr-build: ${err.message}`);
});
