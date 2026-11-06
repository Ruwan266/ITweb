import { useEffect, useState } from 'react';

/**
 * False during prerender and the hydration pass, true right after. Use it for
 * browser-only media: React omits `muted` from server HTML, and events such as
 * `canplay` can fire before hydration, so hero videos must be created on the client.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
