import { useTranslation } from 'react-i18next';
import Reveal from '@/components/feature/Reveal';

export default function Testimonials() {
  const { t } = useTranslation();
  const testimonials = [
    { quote: t('testimonial.1.quote'), author: t('testimonial.1.author'), role: t('testimonial.1.role') },
    { quote: t('testimonial.2.quote'), author: t('testimonial.2.author'), role: t('testimonial.2.role') },
    { quote: t('testimonial.3.quote'), author: t('testimonial.3.author'), role: t('testimonial.3.role') },
  ];

  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-circuit-pale overflow-hidden" id="testimonials">
      <div className="site-container mb-10 md:mb-16 lg:mb-20">
        <Reveal>
          <div className="text-center">
            <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.15em] text-accent-500 mb-3 block">{t('home.testimonials.eyebrow')}</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold text-navy dark:text-white leading-[1.15] mb-4 text-balance">{t('home.testimonials.title')}</h2>
            <p className="text-foreground-500 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed text-pretty">{t('home.testimonials.subtitle')}</p>
          </div>
        </Reveal>
      </div>
      <div className="site-container">
        <Reveal staggerChildren={80}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {testimonials.map((tm, i) => (
              <div key={i} className="bg-white dark:bg-[#0f1a2e] rounded-2xl p-5 sm:p-6 md:p-7 border border-background-200/70 dark:border-slate-700/50 min-w-0">
                <div className="flex gap-0.5 mb-3 sm:mb-4">
                  {[...Array(5)].map((_, s) => (<i key={s} className="ri-star-fill text-sm sm:text-base text-amber-400" />))}
                </div>
                <p className="text-sm sm:text-sm text-foreground-600 dark:text-slate-300 leading-relaxed mb-4 sm:mb-5">&ldquo;{tm.quote}&rdquo;</p>
                <div>
                  <div className="font-semibold text-sm text-navy dark:text-white">{tm.author}</div>
                  <div className="text-xs text-foreground-500 mt-0.5">{tm.role}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}