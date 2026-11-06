import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { applyHead } from './head';
import { getPageSeo } from './pages';

/** Updates title, meta tags, canonical and JSON-LD whenever the route changes. */
export function useSeoHead(): void {
  const { pathname } = useLocation();

  useEffect(() => {
    applyHead(getPageSeo(pathname));
  }, [pathname]);
}
