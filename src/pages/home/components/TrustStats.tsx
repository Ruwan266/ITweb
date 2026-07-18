import { useTranslation } from 'react-i18next';
import Reveal from '@/components/feature/Reveal';

export default function TrustStats() {
  const { t } = useTranslation();
  const stats = [
    { value: '10+', label: t('home.stats.excellence') },
    { value: '200+', label: t('home.stats.projects') },
    { value: '50+', label: t('home.stats.clients') },
    { value: '24/7', label: t('home.stats.support') },
  ];

  return (
    <section className="py-10 sm:py-16 lg:py-20 bg-navy overflow-hidden" id="trust-stats">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 xl:px-16">
        <Reveal staggerChildren={60}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
            {stats.map((stat, i) => (
              <div key={i} className="text-center min-w-0">
                <div className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1.5 sm:mb-2 tracking-tight">{stat.value}</div>
                <div className="text-xs sm:text-xs md:text-sm text-foreground-400 font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}