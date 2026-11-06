import en from './en/common';

// English ships in the main bundle; other languages load when a visitor selects them.
const loaders = import.meta.glob<{ default: Record<string, string> }>(['./*/common.ts', '!./en/common.ts']);

export const messages: Record<string, { translation: Record<string, string> }> = {
  en: { translation: en },
};

export async function loadLocale(lang: string): Promise<Record<string, string> | null> {
  const loader = loaders[`./${lang}/common.ts`];
  return loader ? (await loader()).default : null;
}
