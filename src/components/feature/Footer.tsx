import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FaLinkedinIn,
  FaXTwitter,
  FaGithub,
  FaYoutube,
  FaFacebookF,
  FaInstagram,
  FaTiktok,
} from 'react-icons/fa6';
import LogoImage from '@/components/base/LogoImage';

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-blue-300 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-blue-400/60 hover:bg-white/10 hover:text-blue-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
    >
      {children}
    </a>
  );
}

function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { to: string; label: string }[];
}) {
  return (
    <div className="min-w-0">
      <h3 className="mb-4 text-sm font-semibold text-white">{title}</h3>
      <ul className="space-y-2.5 text-sm text-slate-300">
        {links.map(({ to, label }) => (
          <li key={`${to}-${label}`}>
            <Link
              to={to}
              className="inline-block break-words transition-colors hover:text-white"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                            */
/* ------------------------------------------------------------------ */

export default function Footer() {
  const { t } = useTranslation();
  const brand = 'Samarat Infinity Network Solutions';
  const watermark = 'SAMARAT INFINITY';
  const footerRef = useRef<HTMLElement>(null);
  const [glowsVisible, setGlowsVisible] = useState(false);
  const [year, setYear] = useState(() => new Date().getFullYear());

  useEffect(() => setYear(new Date().getFullYear()), []);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setGlowsVisible(true); observer.disconnect(); }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const email = 'info@smartinfinityn.com';
  const phoneDisplay = '+971 558343973';
  const phoneTel = '+971558343973';

  const companyLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/about', label: t('nav.about') },
    { to: '/services', label: t('nav.services') },
    { to: '/projects', label: t('nav.projects') },
    { to: '/contact', label: t('nav.contact') },
  ];

  const resourceLinks = [
    { to: '/projects', label: t('footer.case_studies') },
    { to: '/contact', label: t('footer.support') },
    { to: '/contact', label: t('footer.faq') },
    { to: '/contact', label: t('nav.contact') },
  ];

  const legalLinks = [
    { to: '/privacy', label: t('footer.privacy') },
    { to: '/terms', label: t('footer.terms') },
    { to: '/cookies', label: t('footer.cookies') },
  ];

  const socials = [
    { href: 'https://www.facebook.com/share/1EUkwbC7VZ/', label: t('footer.facebook'), Icon: FaFacebookF },
    { href: 'https://www.instagram.com/sins.technology?igsh=MXJvcHdveHo1bHhmaQ==', label: t('footer.instagram'), Icon: FaInstagram },
    { href: 'https://www.tiktok.com/@sins.technology.u?_r=1&_t=ZS-97BJ4u2Nngw', label: t('footer.tiktok'), Icon: FaTiktok },
    { href: 'https://linkedin.com', label: t('footer.linkedin'), Icon: FaLinkedinIn },
    { href: 'https://x.com', label: t('footer.x'), Icon: FaXTwitter },
    { href: 'https://github.com', label: t('footer.github'), Icon: FaGithub },
    { href: 'https://youtube.com', label: t('footer.youtube'), Icon: FaYoutube },
  ];

  const description = t('footer.description');

  return (
    <footer ref={footerRef} className="relative mt-auto w-full overflow-hidden bg-[#060d1a] text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className={`absolute -top-24 left-[8%] h-72 w-72 rounded-full bg-blue-600/25 blur-[120px] transition-all duration-[1200ms] ease-out ${glowsVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.85]'}`} />
        <div className={`absolute bottom-[-4rem] right-[6%] h-80 w-80 rounded-full bg-cyan-500/20 blur-[130px] transition-all duration-[1400ms] ease-out ${glowsVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.85]'}`} />
        <div className={`absolute top-1/3 left-1/2 h-64 w-[44rem] max-w-[90vw] -translate-x-1/2 rounded-full bg-indigo-700/15 blur-[140px] transition-all duration-[1600ms] ease-out ${glowsVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.85]'}`} />
      </div>

      <div className="relative z-10 border-t border-white/10 bg-[#0a1628]/70 backdrop-blur-2xl">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="relative z-10 site-gutter pt-8 sm:pt-12 pb-24 sm:pb-32 lg:pb-36">
          <div className="flex w-full flex-col gap-6 sm:gap-4 lg:flex-row lg:items-start lg:gap-16">
            <div className="w-full lg:w-[340px] xl:w-[380px] lg:shrink-0">
              <Link to="/" className="inline-flex items-center gap-2 sm:gap-3 rounded-xl outline-offset-4">
                <LogoImage
                  className="h-12 sm:h-14 w-auto object-contain block"
                />
              </Link>
              <p className="mt-3 sm:mt-4 text-xs sm:text-sm leading-relaxed text-slate-300 max-w-sm">{description}</p>
              <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-2 sm:gap-2.5">
                {socials.map(({ href, label, Icon }) => (
                  <SocialIcon key={label} href={href} label={label}>
                    <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
                  </SocialIcon>
                ))}
              </div>
              <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] sm:text-xs text-slate-400">
                <a href={`tel:${phoneTel}`} className="font-medium text-white hover:underline whitespace-nowrap">{phoneDisplay}</a>
                <span className="text-slate-600" aria-hidden>·</span>
                <a href={`mailto:${email}`} className="break-all font-medium text-white hover:underline">{email}</a>
              </div>
            </div>

            <div className="grid w-full grid-cols-2 sm:grid-cols-3 gap-x-4 sm:gap-x-10 gap-y-6 sm:gap-y-8 lg:flex-1 lg:justify-items-start">
              <LinkColumn title={t('footer.company')} links={companyLinks} />
              <LinkColumn title={t('footer.resources')} links={resourceLinks} />
              <LinkColumn title={t('footer.legal')} links={legalLinks} />
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-10 sm:bottom-14 left-1/2 z-0 w-[120%] max-w-none -translate-x-1/2 select-none text-center font-sans text-[clamp(2rem,12vw,9rem)] font-black leading-none tracking-[0.06em] text-white/[0.06] [word-spacing:0.14em]" aria-hidden>
          {watermark}
        </div>

        <div className="relative z-10 site-gutter border-t border-white/10 py-3 sm:py-4 text-center text-[10px] sm:text-xs text-slate-300/85">
          {/* Static HTML carries the build year; the client corrects it after hydration. */}
          <span suppressHydrationWarning>&copy; {year}</span> {brand}. {t('footer.copyright')}
        </div>
      </div>
    </footer>
  );
}