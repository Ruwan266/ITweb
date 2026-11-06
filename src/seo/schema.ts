import type { PageSeo } from './pages';
import { PUBLISHED_SERVICES } from './services';
import { ORGANIZATION_ID, SITE, WEBSITE_ID, absoluteUrl } from './site';

type JsonLdNode = Record<string, unknown>;

const WEB_PAGE_TYPES: Record<PageSeo['type'], string> = {
  home: 'WebPage',
  about: 'AboutPage',
  collection: 'CollectionPage',
  contact: 'ContactPage',
  webpage: 'WebPage',
  service: 'WebPage',
};

function organizationNode(): JsonLdNode {
  return {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: SITE.name,
    alternateName: [...SITE.alternateNames],
    url: absoluteUrl('/'),
    logo: absoluteUrl(SITE.logoPath),
    description: SITE.description,
    email: SITE.email,
    telephone: SITE.phone,
    address: { '@type': 'PostalAddress', ...SITE.address },
    areaServed: SITE.serviceArea,
    sameAs: [...SITE.sameAs],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: SITE.phone,
      email: SITE.email,
    },
  };
}

function websiteNode(): JsonLdNode {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: absoluteUrl('/'),
    name: SITE.name,
    alternateName: [...SITE.alternateNames],
    publisher: { '@id': ORGANIZATION_ID },
    inLanguage: 'en',
  };
}

function breadcrumbNode(page: PageSeo): JsonLdNode | null {
  if (page.path === '/' || !page.breadcrumbName) return null;
  const trail = [{ name: 'Home', path: '/' }, ...(page.breadcrumbs ?? []), { name: page.breadcrumbName, path: page.path }];
  return {
    '@type': 'BreadcrumbList',
    '@id': `${absoluteUrl(page.path)}#breadcrumb`,
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

function webPageNode(page: PageSeo, breadcrumb: JsonLdNode | null): JsonLdNode {
  const url = absoluteUrl(page.path);
  return {
    '@type': WEB_PAGE_TYPES[page.type],
    '@id': `${url}#webpage`,
    url,
    name: page.title,
    description: page.description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': page.service ? `${url}#service` : ORGANIZATION_ID },
    inLanguage: 'en',
    ...(breadcrumb ? { breadcrumb: { '@id': breadcrumb['@id'] } } : {}),
    ...(page.lastModified ? { dateModified: page.lastModified } : {}),
  };
}

/** The JSON-LD graph for a page. Everything in it mirrors visible page content. */
export function buildJsonLd(page: PageSeo): JsonLdNode {
  const breadcrumb = breadcrumbNode(page);
  const graph: JsonLdNode[] = [organizationNode(), websiteNode(), webPageNode(page, breadcrumb)];
  if (breadcrumb) graph.push(breadcrumb);

  if (page.path === '/services') {
    graph.push({
      '@type': 'ItemList',
      '@id': `${absoluteUrl('/services')}#services`,
      itemListElement: PUBLISHED_SERVICES.map((service, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: service.name,
        url: absoluteUrl(`/services/${service.slug}`),
      })),
    });
  }

  if (page.service) {
    const url = absoluteUrl(page.path);
    graph.push({
      '@type': 'Service',
      '@id': `${url}#service`,
      name: page.service.name,
      serviceType: page.service.serviceType,
      description: page.service.overview,
      url,
      provider: { '@id': ORGANIZATION_ID },
      areaServed: SITE.serviceArea,
    });
    if (page.service.faqs.length > 0) {
      graph.push({
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: page.service.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      });
    }
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

/** JSON safe to place inside a <script> element. */
export function serializeJsonLd(data: unknown): string {
  const unsafe = new RegExp(`[<>&${String.fromCharCode(0x2028, 0x2029)}]`, 'g');
  const backslash = String.fromCharCode(92);
  return JSON.stringify(data).replace(unsafe, (c) => `${backslash}u${c.charCodeAt(0).toString(16).padStart(4, '0')}`);
}
