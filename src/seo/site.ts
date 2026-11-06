/**
 * Business identity used by metadata and structured data.
 * Only facts already published on the site belong here. Do not add awards,
 * certifications, ratings or founding dates until the business has confirmed them.
 */

/** Hard-coded so preview and local builds can never emit a non-production canonical. */
export const SITE_URL = 'https://smartinfinityn.com';

export const SITE = {
  /** Name used in site copy and the footer copyright. */
  name: 'Samarat Infinity Network Solutions',
  shortName: 'Samarat Infinity',
  /** Names on the logo, domain and social handles. */
  alternateNames: ['SmartInfinity Solutions', 'SmartInfinity', 'SINS Technology'],
  description:
    'Dubai-based IT solutions group providing network infrastructure, security systems, cloud and PBX, POS and accounting software, web development, and remote and onsite IT support.',
  email: 'info@smartinfinityn.com',
  phone: '+971558343973',
  address: {
    streetAddress: 'Doz 11, Academic City',
    addressLocality: 'Dubai',
    addressCountry: 'AE',
  },
  /** Verified office location. Widen only after the business confirms wider coverage. */
  serviceArea: {
    '@type': 'City',
    name: 'Dubai',
    containedInPlace: { '@type': 'Country', name: 'United Arab Emirates' },
  },
  logoPath: '/logo.png',
  ogImagePath: '/og-image.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  /** Only real profiles. The footer's generic linkedin.com, x.com, github.com and youtube.com links are excluded. */
  sameAs: [
    'https://www.facebook.com/share/1EUkwbC7VZ/',
    'https://www.instagram.com/sins.technology',
    'https://www.tiktok.com/@sins.technology.u',
  ],
} as const;

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/** Absolute production URL for a site path, without a trailing slash except the root. */
export function absoluteUrl(path: string): string {
  if (path === '/') return `${SITE_URL}/`;
  return `${SITE_URL}${path.replace(/\/+$/, '')}`;
}
