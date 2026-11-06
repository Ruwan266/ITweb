import { renderToString } from 'react-dom/server';
import { I18nextProvider } from 'react-i18next';
import { StaticRouter } from 'react-router-dom';
import i18n from './i18n';
import { AppRoutes } from './router';
import { buildRobotsTxt, buildSitemapXml, renderHeadHtml } from './seo/head';
import { INDEXABLE_PAGES, NOT_FOUND_SEO } from './seo/pages';

/** Build-time only: renders the same React tree visitors get, so crawlers see identical content. */
function renderRoute(url: string): string {
  return renderToString(
    <I18nextProvider i18n={i18n}>
      <StaticRouter location={url} basename={__BASE_PATH__}>
        <AppRoutes />
      </StaticRouter>
    </I18nextProvider>,
  );
}

export const prerenderPages = () =>
  INDEXABLE_PAGES.map((page) => ({
    path: page.path,
    head: renderHeadHtml(page),
    app: renderRoute(page.path),
  }));

export const prerenderNotFound = () => ({
  head: renderHeadHtml(NOT_FOUND_SEO),
  app: renderRoute('/__not-found__'),
});

/** Head for the empty SPA shell that serves /admin and project-detail URLs. */
export const shellHead = () =>
  renderHeadHtml({ ...NOT_FOUND_SEO, path: '/', title: 'Samarat Infinity Network Solutions', description: 'Samarat Infinity Network Solutions.' });

export { buildRobotsTxt, buildSitemapXml };
