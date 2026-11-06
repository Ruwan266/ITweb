import Reveal from '@/components/feature/Reveal';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSupabaseServices } from '@/hooks/useSupabaseData';
import { UPLOADED_ICONS } from '@/mocks/home';

const SERVICE_TRANSLATION_KEYS = [
  { slug: 'structured-cabling-server-management', titleKey: 'service.cabling', descKey: 'service.cabling.desc', iconImage: UPLOADED_ICONS.serverCabling },
  { slug: 'network-firewall-administration', titleKey: 'service.network', descKey: 'service.network.desc', iconImage: UPLOADED_ICONS.routerFirewall },
  { slug: 'cloud-solutions-pbx-phone-systems', titleKey: 'service.cloud_pbx', descKey: 'service.cloud_pbx.desc', iconImage: UPLOADED_ICONS.cloudPbx },
  { slug: 'access-control-time-attendance', titleKey: 'service.access_control', descKey: 'service.access_control.desc', iconImage: UPLOADED_ICONS.accessControl },
  { slug: 'cctv-anti-theft-eas', titleKey: 'service.cctv', descKey: 'service.cctv.desc', iconImage: UPLOADED_ICONS.cctv },
  { slug: 'pos-accounting-billing-software', titleKey: 'service.pos', descKey: 'service.pos.desc', iconImage: UPLOADED_ICONS.posBilling },
  { slug: 'web-development-it-support', titleKey: 'service.web_dev', descKey: 'service.web_dev.desc', iconImage: UPLOADED_ICONS.webDevSupport },
];

function getIconForTitle(title: string): string {
  const lower = title.toLowerCase();
  if (lower.includes('cabling') || lower.includes('server')) return UPLOADED_ICONS.serverCabling;
  if (lower.includes('router') || lower.includes('switch') || lower.includes('vpn') || lower.includes('firewall')) return UPLOADED_ICONS.routerFirewall;
  if (lower.includes('cloud') || lower.includes('pbx') || lower.includes('phone')) return UPLOADED_ICONS.cloudPbx;
  if (lower.includes('access') || lower.includes('attendance') || lower.includes('entrance')) return UPLOADED_ICONS.accessControl;
  if (lower.includes('cctv') || lower.includes('anti-theft') || lower.includes('eas') || lower.includes('surveillance')) return UPLOADED_ICONS.cctv;
  if (lower.includes('pos') || lower.includes('accounting') || lower.includes('billing')) return UPLOADED_ICONS.posBilling;
  if (lower.includes('web') || lower.includes('development') || lower.includes('support')) return UPLOADED_ICONS.webDevSupport;
  return UPLOADED_ICONS.serverCabling;
}

export default function ServicesTeaser() {
  const { t } = useTranslation();
  const { services, hasLiveData } = useSupabaseServices();

  const displayCards = hasLiveData
    ? services.slice(0, 7).map((s) => ({
        iconImage: s.image_url || getIconForTitle(s.title),
        title: s.title,
        description: s.description || '',
        link: `/services#${s.slug}`,
      }))
    : SERVICE_TRANSLATION_KEYS.slice(0, 7).map((k) => ({
        iconImage: k.iconImage,
        title: t(k.titleKey),
        description: t(k.descKey),
        link: `/services/${k.slug}`,
      }));

  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-circuit-50 overflow-x-hidden" id="services-teaser">
      <div className="site-container">
        <Reveal>
          <div className="text-center mb-10 md:mb-14 lg:mb-20">
            <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.15em] text-accent-500 mb-3 block">{t('home.services.eyebrow')}</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold text-navy dark:text-white leading-[1.15] mb-4 text-balance">{t('home.services.title')}</h2>
            <p className="text-foreground-500 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed text-pretty">{t('home.services.subtitle')}</p>
          </div>
        </Reveal>
        <Reveal staggerChildren={60}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {displayCards.map((service, i) => (
              <Link key={i} to={service.link} className="group bg-white/70 dark:bg-[#0f1a2e]/70 backdrop-blur-xl rounded-2xl p-5 sm:p-6 md:p-8 border border-white/60 dark:border-slate-700/60 hover:border-blue-300/40 hover:shadow-[0_12px_40px_rgba(59,130,246,0.12)] transition-all duration-500 hover:-translate-y-2 cursor-pointer flex flex-col min-w-0 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-transparent to-cyan-50/0 group-hover:from-blue-50/40 group-hover:to-cyan-50/20 transition-all duration-500 pointer-events-none" />
                <div className="relative z-10 w-12 h-12 sm:w-16 sm:h-16 lg:w-[4.5rem] lg:h-[4.5rem] flex items-center justify-center mb-4 sm:mb-6 flex-shrink-0 transition-all duration-500 group-hover:scale-110">
                  <img src={service.iconImage} alt={service.title} className="w-full h-full p-1 object-contain transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                </div>
                <div className="relative z-10 flex flex-col flex-1">
                  <h3 className="font-semibold text-sm md:text-base text-navy dark:text-white mb-2 sm:mb-3 leading-snug group-hover:text-accent-600 transition-colors duration-300">{service.title}</h3>
                  <p className="text-sm md:text-sm text-foreground-500 leading-relaxed flex-1 mb-4">{service.description}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-accent-500 mt-auto group-hover:gap-2 transition-all duration-300 whitespace-nowrap">
                    {t('home.services.learn_more')}
                    <i className="ri-arrow-right-line ml-1 text-xs" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Reveal>
        <Reveal>
          <div className="text-center mt-8 md:mt-12">
            <Link to="/services" className="whitespace-nowrap cursor-pointer inline-flex items-center justify-center px-6 py-3 rounded-full border border-background-300 dark:border-slate-600 text-navy dark:text-white text-sm font-medium hover:border-accent-300 hover:text-accent-600 transition-all duration-200 w-full sm:w-auto min-h-[44px]">
              {t('home.services.view_all')}
              <i className="ri-arrow-right-line ml-2" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}