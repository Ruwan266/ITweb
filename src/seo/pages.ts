import { PUBLISHED_SERVICES, getServiceBySlug, type ServicePage } from './services';

export type PageType = 'home' | 'about' | 'collection' | 'contact' | 'webpage' | 'service';

export interface PageSeo {
  path: string;
  title: string;
  description: string;
  type: PageType;
  /** False removes the page from search and the sitemap. */
  indexable: boolean;
  /** Parent chain for breadcrumbs, excluding this page. */
  breadcrumbs?: { name: string; path: string }[];
  breadcrumbName?: string;
  lastModified?: string;
  service?: ServicePage;
}

const STATIC_PAGES: PageSeo[] = [
  {
    path: '/',
    title: 'IT Solutions & Software Company in Dubai | Samarat Infinity',
    description:
      'Samarat Infinity Network Solutions is a Dubai IT company for networking, CCTV, access control, cloud and PBX, POS systems, software development and IT support.',
    type: 'home',
    indexable: true,
  },
  {
    path: '/about',
    title: 'About Us: Dubai-Based IT Solutions Group | Samarat Infinity',
    description:
      'Meet Samarat Infinity Network Solutions, an IT solutions group founded in Dubai. Learn about our mission, values, process, industries and technologies.',
    type: 'about',
    indexable: true,
    breadcrumbName: 'About',
  },
  {
    path: '/services',
    title: 'IT Services in Dubai: Networks, Security & Software | Samarat Infinity',
    description:
      'Explore our IT services in Dubai: structured cabling, network and firewall administration, CCTV, access control, cloud and PBX, POS, software and IT support.',
    type: 'collection',
    indexable: true,
    breadcrumbName: 'Services',
  },
  {
    path: '/projects',
    title: 'Projects & Case Studies | Samarat Infinity',
    description:
      'Browse projects by Samarat Infinity Network Solutions across websites, web and mobile applications, automation, POS and billing, and custom development.',
    type: 'collection',
    indexable: true,
    breadcrumbName: 'Projects',
  },
  {
    path: '/contact',
    title: 'Contact Us & Get an IT Quote in Dubai | Samarat Infinity',
    description:
      'Contact Samarat Infinity Network Solutions at Doz 11, Academic City, Dubai. Call +971 558343973 or email info@smartinfinityn.com to request an IT quote.',
    type: 'contact',
    indexable: true,
    breadcrumbName: 'Contact',
  },
];

const SERVICE_PAGE_SEO: PageSeo[] = PUBLISHED_SERVICES.map((service) => ({
  path: `/services/${service.slug}`,
  title: service.metaTitle,
  description: service.metaDescription,
  type: 'service',
  indexable: true,
  breadcrumbs: [{ name: 'Services', path: '/services' }],
  breadcrumbName: service.name,
  lastModified: service.lastModified,
  service,
}));

/** Every page prerendered to static HTML and listed in the sitemap. */
export const INDEXABLE_PAGES: PageSeo[] = [...STATIC_PAGES, ...SERVICE_PAGE_SEO];

const noindexPage = (path: string, title: string, description: string): PageSeo => ({
  path,
  title,
  description,
  type: 'webpage',
  indexable: false,
});

export const NOT_FOUND_SEO = noindexPage(
  '/404',
  'Page Not Found | Samarat Infinity',
  'The page you are looking for could not be found.',
);

const normalize = (pathname: string): string => pathname.replace(/\/+$/, '') || '/';

/** Metadata for any client route; unknown and private routes resolve to noindex. */
export function getPageSeo(pathname: string): PageSeo {
  const path = normalize(pathname);
  const known = INDEXABLE_PAGES.find((p) => p.path === path);
  if (known) return known;

  if (path === '/admin' || path.startsWith('/admin/')) {
    return noindexPage(path, 'Admin | Samarat Infinity', 'Private administration area.');
  }
  // Project details are placeholder case studies today, so they stay out of search
  // until real, approved projects replace MOCK_PROJECTS.
  if (/^\/projects\/[^/]+$/.test(path)) {
    return noindexPage(path, 'Project Details | Samarat Infinity', 'Project details from Samarat Infinity Network Solutions.');
  }
  if (path.startsWith('/services/') && !getServiceBySlug(path.slice('/services/'.length))) {
    return NOT_FOUND_SEO;
  }
  return NOT_FOUND_SEO;
}
