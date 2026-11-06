import { useTranslation } from 'react-i18next';
import Reveal from '@/components/feature/Reveal';
import { Link } from 'react-router-dom';

export default function CTABand() {
  const { t } = useTranslation();
  return (
    <section className="py-20 sm:py-24 lg:py-32 relative bg-transparent" id="cta-band">
      <div className="relative z-10 site-container text-center">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold text-navy dark:text-white leading-[1.15] mb-4 text-balance">{t('home.cta.title')}</h2>
          <p className="text-foreground-600 dark:text-slate-300 text-sm sm:text-base md:text-lg max-w-lg mx-auto leading-relaxed mb-8 sm:mb-10 text-pretty">{t('home.cta.subtitle')}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link to="/contact" className="whitespace-nowrap cursor-pointer inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-navy dark:bg-accent-500 text-white text-sm md:text-base font-semibold hover:bg-navy/85 dark:hover:bg-accent-600 transition-all duration-200 w-full sm:w-auto">
              {t('home.cta.start')}
              <i className="ri-arrow-right-line ml-2" />
            </Link>
            <Link to="/services" className="whitespace-nowrap cursor-pointer inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-navy/25 dark:border-white/25 text-navy dark:text-white text-sm md:text-base font-medium hover:bg-navy/5 dark:hover:bg-white/10 transition-all duration-200 w-full sm:w-auto">
              {t('home.cta.explore')}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}