import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import LogoImage from '@/components/base/LogoImage';
import { setLanguage } from '@/i18n';

const NAV_LINKS = [
  { labelKey: 'nav.home', path: '/' },
  { labelKey: 'nav.about', path: '/about' },
  { labelKey: 'nav.services', path: '/services' },
  { labelKey: 'nav.projects', path: '/projects' },
  { labelKey: 'nav.contact', path: '/contact' },
];

const LANGUAGES: { code: string; labelKey: string; native: string }[] = [
  { code: 'en', labelKey: 'lang.en', native: 'EN' },
  { code: 'si', labelKey: 'lang.si', native: 'සිං' },
  { code: 'ar', labelKey: 'lang.ar', native: 'AR' },
  { code: 'zh', labelKey: 'lang.zh', native: '中文' },
  { code: 'ja', labelKey: 'lang.ja', native: '日本語' },
  { code: 'fr', labelKey: 'lang.fr', native: 'FR' },
  { code: 'it', labelKey: 'lang.it', native: 'IT' },
  { code: 'af', labelKey: 'lang.af', native: 'AF' },
  { code: 'hi', labelKey: 'lang.hi', native: 'हि' },
  { code: 'ur', labelKey: 'lang.ur', native: 'UR' },
  { code: 'ta', labelKey: 'lang.ta', native: 'த' },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { scrollY, scrollDirection, isScrolled } = useScrollPosition();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const langRefMobile = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => {
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [location, closeMenu]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [mobileOpen]);

  // Close language dropdown on outside click
  useEffect(() => {
    if (!langOpen) return;
    const handler = (e: MouseEvent) => {
      const node = e.target as Node;
      const insideDesktop = langRef.current?.contains(node);
      const insideMobile = langRefMobile.current?.contains(node);
      if (!insideDesktop && !insideMobile) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [langOpen]);

  // Set document dir for RTL
  const changeLang = useCallback((code: string) => {
    void setLanguage(code);
    try { localStorage.setItem('sins-lang', code); } catch { /* noop */ }
    setLangOpen(false);
    document.documentElement.dir = (code === 'ar' || code === 'ur') ? 'rtl' : 'ltr';
    document.documentElement.lang = code;
  }, []);

  // Restore language on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('sins-lang');
      if (saved && ['en', 'si', 'ar', 'zh', 'ja', 'fr', 'it', 'af', 'hi', 'ur', 'ta'].includes(saved) && saved !== i18n.language) {
        void setLanguage(saved);
        document.documentElement.dir = (saved === 'ar' || saved === 'ur') ? 'rtl' : 'ltr';
        document.documentElement.lang = saved;
      }
    } catch { /* noop */ }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isTransparent = scrollY < 60 && !mobileOpen;

  const navClasses = [
    'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
    'pt-[env(safe-area-inset-top)]',
    scrollDirection === 'down' && isScrolled && !mobileOpen ? '-translate-y-full' : 'translate-y-0',
    isTransparent
      ? 'bg-transparent text-white'
      : 'bg-white/85 backdrop-blur-xl text-navy dark:bg-navy/85 dark:text-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_2px_6px_rgba(0,0,0,0.05)]',
  ]
    .filter(Boolean)
    .join(' ');

  const currentLang = LANGUAGES.find((l) => l.code === i18n.language) || LANGUAGES[0];

  return (
    <nav ref={navRef} className={navClasses} role="navigation" aria-label={t('nav.menu_open')}>
      <div className="site-gutter">
        {/* Desktop: logo | centred links | controls. Equal outer columns keep the links truly centred. */}
        <div className="flex lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-4 items-center justify-between h-16 sm:h-[80px] md:h-[88px] lg:h-[96px]">
          <Link
            to="/"
            className="flex items-center justify-center lg:justify-self-start whitespace-nowrap cursor-pointer min-w-0 flex-shrink-0 h-full"
          >
            <LogoImage
              className="h-12 sm:h-14 md:h-[70px] lg:h-[76px] w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1" role="menubar">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap cursor-pointer transition-colors duration-200 ${
                  location.pathname === link.path
                    ? isTransparent
                      ? 'bg-white/15 text-white'
                      : 'bg-accent-50 text-accent-600 dark:text-accent-400'
                    : isTransparent
                      ? 'text-white/80 hover:text-white hover:bg-white/10'
                      : 'text-foreground-600 dark:text-slate-300 hover:text-navy dark:hover:text-white hover:bg-background-100 dark:hover:bg-white/10'
                }`}
                role="menuitem"
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </div>

          {/* Desktop controls */}
          <div className="hidden lg:flex lg:justify-self-end items-center gap-2">
            {/* Language Selector - Desktop */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-sm font-medium cursor-pointer transition-colors duration-200 hover:bg-white/10 whitespace-nowrap"
                aria-label={t('lang.select')}
              >
                <i className="ri-global-line text-base" />
                <span>{currentLang.native}</span>
                <i className={`ri-arrow-down-s-line text-xs transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
              </button>

              {langOpen && (
                <div className="nav-lang-dropdown absolute top-full right-0 mt-1 bg-white dark:bg-[#0f1a2e] border border-background-200 dark:border-slate-700 rounded-xl shadow-lg py-1 min-w-[130px] z-50">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLang(lang.code)}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors duration-150 hover:bg-background-50 dark:hover:bg-white/5 whitespace-nowrap ${
                        i18n.language === lang.code
                          ? 'text-accent-500 font-semibold'
                          : 'text-foreground-700 dark:text-slate-300'
                      }`}
                    >
                      {t(lang.labelKey)}
                      {i18n.language === lang.code && (
                        <i className="ri-check-line ml-2 text-xs" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CTA */}
            <Link
              to="/contact"
              className="whitespace-nowrap cursor-pointer px-5 py-2.5 rounded-full bg-accent-500 text-white text-sm font-medium hover:bg-accent-600 transition-colors duration-200 ml-1"
            >
              {t('nav.get_quote')}
            </Link>
          </div>

          {/* Mobile hamburger + controls */}
          <div className="flex lg:hidden items-center gap-0.5 sm:gap-1 flex-shrink-0">
            {/* Language Selector - Mobile */}
            <div ref={langRefMobile} className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-0.5 px-1.5 sm:px-2 py-1.5 rounded-lg text-xs sm:text-sm font-medium cursor-pointer transition-colors duration-200 whitespace-nowrap"
                aria-label={t('lang.select')}
              >
                <i className={`ri-global-line text-sm sm:text-base ${isTransparent && !mobileOpen ? 'text-white' : 'text-navy dark:text-white'}`} />
                <span className={`${isTransparent && !mobileOpen ? 'text-white' : 'text-navy dark:text-white'} hidden xs:inline`}>
                  {currentLang.native}
                </span>
                <i className={`ri-arrow-down-s-line text-[10px] sm:text-xs transition-transform duration-200 ${langOpen ? 'rotate-180' : ''} ${isTransparent && !mobileOpen ? 'text-white' : 'text-navy dark:text-white'} hidden xs:inline`} />
              </button>

              {langOpen && (
                <div className="nav-lang-dropdown absolute top-full right-0 mt-1 bg-white dark:bg-[#0f1a2e] border border-background-200 dark:border-slate-700 rounded-xl shadow-lg py-1 min-w-[110px] sm:min-w-[130px] z-50 max-h-[60vh] overflow-y-auto">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLang(lang.code)}
                      className={`w-full text-left px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm transition-colors duration-150 hover:bg-background-50 dark:hover:bg-white/5 whitespace-nowrap ${
                        i18n.language === lang.code
                          ? 'text-accent-500 font-semibold'
                          : 'text-foreground-700 dark:text-slate-300'
                      }`}
                    >
                      {t(lang.labelKey)}
                      {i18n.language === lang.code && (
                        <i className="ri-check-line ml-2 text-xs" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg cursor-pointer flex-shrink-0 ml-0.5"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? t('nav.close_menu') : t('nav.open_menu')}
              aria-expanded={mobileOpen}
            >
              <div className="flex flex-col gap-1 sm:gap-1.5">
                <span
                  className={`block w-4 sm:w-5 h-[2px] transition-all duration-300 ${
                    isTransparent && !mobileOpen ? 'bg-white' : 'bg-navy dark:bg-white'
                  } ${mobileOpen ? 'rotate-45 translate-y-[5px] sm:translate-y-[7px]' : ''}`}
                />
                <span
                  className={`block w-4 sm:w-5 h-[2px] transition-all duration-300 ${
                    isTransparent && !mobileOpen ? 'bg-white' : 'bg-navy dark:bg-white'
                  } ${mobileOpen ? 'opacity-0' : ''}`}
                />
                <span
                  className={`block w-4 sm:w-5 h-[2px] transition-all duration-300 ${
                    isTransparent && !mobileOpen ? 'bg-white' : 'bg-navy dark:bg-white'
                  } ${mobileOpen ? '-rotate-45 -translate-y-[5px] sm:-translate-y-[7px]' : ''}`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-400 ${
          mobileOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white dark:bg-[#0a1628] border-t border-background-200 dark:border-slate-700 px-4 py-5 space-y-1">
          {/* Mobile nav links */}
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-4 py-3.5 rounded-xl text-sm font-medium whitespace-nowrap cursor-pointer transition-colors ${
                location.pathname === link.path
                  ? 'bg-accent-50 text-accent-600 dark:text-accent-400'
                  : 'text-foreground-700 dark:text-slate-300 hover:text-navy dark:hover:text-white hover:bg-background-50 dark:hover:bg-white/5'
              }`}
              onClick={closeMenu}
            >
              {t(link.labelKey)}
            </Link>
          ))}

          {/* Divider */}
          <div className="border-t border-background-200 dark:border-slate-700 my-3" />

          {/* Mobile CTA */}
          <div className="px-4 pt-1">
            <Link
              to="/contact"
              className="block w-full text-center whitespace-nowrap cursor-pointer px-5 py-3.5 rounded-full bg-accent-500 text-white text-sm font-medium hover:bg-accent-600 transition-colors"
              onClick={closeMenu}
            >
              {t('nav.get_quote')}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}