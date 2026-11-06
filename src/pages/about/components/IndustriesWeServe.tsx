import { useTranslation } from 'react-i18next';
import Reveal from '@/components/feature/Reveal';
import { ICON_HEART_PULSE, ICON_BUILDING, ICON_SHOPPING_BAG, ICON_TRUCK, ICON_GRADUATION, ICON_FACTORY } from '@/mocks/icons';

const industryIcons = [ICON_HEART_PULSE, ICON_BUILDING, ICON_SHOPPING_BAG, ICON_TRUCK, ICON_GRADUATION, ICON_FACTORY];

export default function IndustriesWeServe() {
  const { t } = useTranslation();

  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-background-50 overflow-hidden" id="industries">
      <div className="site-container">
        <Reveal y={48} duration={1.1}>
          <div className="text-center mb-10 md:mb-16 lg:mb-20">
            <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.15em] text-accent-500 mb-3 block">{t('about.industries.eyebrow')}</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold text-foreground-950 dark:text-white leading-[1.15] mb-4 text-balance">{t('about.industries.title')}</h2>
            <p className="text-foreground-500 dark:text-slate-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">{t('about.industries.subtitle')}</p>
          </div>
        </Reveal>

        <Reveal delay={0.15} staggerChildren={80} duration={1.1} y={48}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="group bg-transparent rounded-2xl p-5 sm:p-6 md:p-7 border border-background-200/40 dark:border-slate-600/50 hover:border-accent-300 dark:hover:border-accent-600 transition-all duration-300 cursor-default dark-icon-glow">
                <img src={industryIcons[i]} alt="" className="w-12 h-12 sm:w-14 sm:h-14 object-contain mb-4 group-hover:scale-110 transition-transform duration-300" loading="lazy" />
                <h3 className="font-semibold text-sm sm:text-base text-foreground-950 dark:text-white mb-2">{t(`about.industries.${i}.name`)}</h3>
                <p className="text-xs sm:text-sm text-foreground-500 dark:text-slate-400 leading-relaxed">{t(`about.industries.${i}.desc`)}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}