import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Check, ChevronRight, Plus } from 'lucide-react';
import NotFound from '@/pages/NotFound';
import CTABand from '@/pages/home/components/CTABand';
import { getServiceBySlug } from '@/seo/services';

const PROCESS_STEPS = [1, 2, 3, 4];

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 sm:space-y-4">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 min-w-0">
          <span className="w-5 h-5 rounded-full bg-accent-50 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Check className="w-3 h-3 text-accent-500" strokeWidth={3} aria-hidden="true" />
          </span>
          <span className="text-sm sm:text-base text-foreground-600 leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ServiceDetailPage() {
  const { t } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const service = getServiceBySlug(slug);

  if (!service) return <NotFound />;

  const related = service.related
    .map((relatedSlug) => getServiceBySlug(relatedSlug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <section id="hero-section" className="relative overflow-hidden bg-[#0a1628] noise-overlay">
        <div className="absolute inset-0 gradient-hero" aria-hidden="true" />
        <div className="absolute inset-0 circuit-watermark pointer-events-none" aria-hidden="true" />
        <div className="relative z-10 site-container pt-24 sm:pt-32 md:pt-40 pb-20 sm:pb-24 md:pb-32">
          <nav aria-label={t('service_page.breadcrumb', 'Breadcrumb')} className="mb-5 sm:mb-6">
            <ol className="flex flex-wrap items-center gap-1 text-xs sm:text-sm text-foreground-200/80">
              <li><Link to="/" className="hover:text-white transition-colors">{t('nav.home')}</Link></li>
              <li aria-hidden="true"><ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" /></li>
              <li><Link to="/services" className="hover:text-white transition-colors">{t('nav.services')}</Link></li>
              <li aria-hidden="true"><ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" /></li>
              <li aria-current="page" className="text-white">{service.name}</li>
            </ol>
          </nav>
          <div className="max-w-[min(100%,820px)]">
            <h1 className="text-[clamp(1.75rem,6vw,3.5rem)] font-semibold text-white leading-[1.1] mb-4 sm:mb-6 text-balance tracking-tight">{service.h1}</h1>
            <p className="text-sm sm:text-base lg:text-lg text-foreground-200/80 leading-relaxed mb-6 sm:mb-8">{service.overview}</p>
            <Link to="/contact" className="whitespace-nowrap cursor-pointer inline-flex items-center justify-center px-6 md:px-7 py-3 sm:py-3.5 rounded-full bg-accent-500 text-white text-sm md:text-base font-medium hover:bg-accent-600 transition-colors duration-200 min-h-[44px]">
              {t('nav.get_quote')}
            </Link>
          </div>
        </div>
        <div className="hero-bottom-fade-sm absolute bottom-0 left-0 right-0 z-10 h-[50px] sm:h-[80px] pointer-events-none" aria-hidden="true" />
      </section>

      <section className="py-14 sm:py-20 bg-circuit-50">
        <div className="site-container grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="min-w-0">
            <h2 className="text-2xl sm:text-3xl font-semibold text-navy leading-[1.15] mb-5 sm:mb-6 text-balance">{t('service_page.problems', 'Problems we solve')}</h2>
            <CheckList items={service.problems} />
          </div>
          <div className="min-w-0">
            <h2 className="text-2xl sm:text-3xl font-semibold text-navy leading-[1.15] mb-5 sm:mb-6 text-balance">{t('service_page.capabilities', 'What we deliver')}</h2>
            <CheckList items={service.capabilities} />
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-circuit-white">
        <div className="site-container">
          <h2 className="text-2xl sm:text-3xl font-semibold text-navy leading-[1.15] mb-6 sm:mb-8 text-balance">{t('service_page.use_cases', 'Where this helps')}</h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {service.useCases.map((useCase) => (
              <li key={useCase} className="bg-white rounded-2xl p-5 sm:p-6 border border-background-200/70 text-sm sm:text-base text-foreground-600 leading-relaxed">{useCase}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-circuit-50">
        <div className="site-container">
          <h2 className="text-2xl sm:text-3xl font-semibold text-navy leading-[1.15] mb-6 sm:mb-8 text-balance">{t('about.process.title')}</h2>
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {PROCESS_STEPS.map((step) => (
              <li key={step} className="bg-white rounded-2xl p-5 sm:p-6 border border-background-200/70">
                <span className="text-xs font-bold text-accent-500 tracking-[0.15em]">0{step}</span>
                <h3 className="font-semibold text-base text-navy mt-2 mb-2">{t(`about.process.step${step}_title`)}</h3>
                <p className="text-sm text-foreground-500 leading-relaxed">{t(`about.process.step${step}_desc`)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-circuit-white" id="faq">
        <div className="site-container">
          <h2 className="text-2xl sm:text-3xl font-semibold text-navy leading-[1.15] mb-6 sm:mb-8 text-balance">{t('service_page.faq', 'Frequently asked questions')}</h2>
          <div className="space-y-3 max-w-4xl">
            {service.faqs.map((faq, i) => (
              <details key={faq.question} open={i === 0} className="group bg-white rounded-2xl border border-background-200/70 p-5 sm:p-6">
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <h3 className="font-semibold text-sm sm:text-base text-navy">{faq.question}</h3>
                  <Plus className="w-4 h-4 text-accent-500 flex-shrink-0 mt-0.5 transition-transform group-open:rotate-45" aria-hidden="true" />
                </summary>
                <p className="text-sm sm:text-base text-foreground-500 leading-relaxed mt-3">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-circuit-50">
        <div className="site-container">
          <h2 className="text-2xl sm:text-3xl font-semibold text-navy leading-[1.15] mb-6 sm:mb-8 text-balance">{t('service_page.related', 'Related services')}</h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {related.map((item) => (
              <li key={item.slug} className="min-w-0">
                <Link to={`/services/${item.slug}`} className="flex h-full items-center justify-between gap-3 bg-white rounded-2xl p-5 sm:p-6 border border-background-200/70 hover:border-accent-300 transition-colors text-sm sm:text-base font-semibold text-navy hover:text-accent-600">
                  <span className="min-w-0">{item.name}</span>
                  <ChevronRight className="w-4 h-4 text-accent-500 flex-shrink-0 rtl:rotate-180" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTABand />
    </>
  );
}
