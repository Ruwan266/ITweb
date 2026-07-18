import { useTranslation } from 'react-i18next';
import Reveal from '@/components/feature/Reveal';
import { UPLOADED_ICONS } from '@/mocks/home';

const pcbCornerLeft = (
  <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-[0.08]">
    <path d="M0 70 L140 70 L140 28 L200 28 L200 0" stroke="#64748b" strokeWidth="1.5" />
    <path d="M70 0 L70 90 L115 90 L115 155" stroke="#64748b" strokeWidth="1.5" />
    <path d="M0 140 L50 140 L90 180 L90 220 L120 250" stroke="#64748b" strokeWidth="1.5" />
    <path d="M180 0 L180 45 L220 85 L220 130 L250 160" stroke="#64748b" strokeWidth="1" />
    <path d="M250 0 L250 60 L280 90" stroke="#64748b" strokeWidth="1" />
    <circle cx="70" cy="70" r="4.5" fill="#64748b" /><circle cx="140" cy="70" r="4.5" fill="#64748b" /><circle cx="200" cy="28" r="4.5" fill="#64748b" /><circle cx="200" cy="0" r="4.5" fill="#64748b" /><circle cx="70" cy="0" r="4.5" fill="#64748b" /><circle cx="115" cy="90" r="4.5" fill="#64748b" /><circle cx="115" cy="155" r="4.5" fill="#64748b" /><circle cx="50" cy="140" r="4.5" fill="#64748b" /><circle cx="90" cy="180" r="4.5" fill="#64748b" /><circle cx="90" cy="220" r="3.5" fill="#64748b" /><circle cx="120" cy="250" r="3.5" fill="#64748b" /><circle cx="180" cy="45" r="4.5" fill="#64748b" /><circle cx="220" cy="85" r="4.5" fill="#64748b" /><circle cx="220" cy="130" r="3.5" fill="#64748b" /><circle cx="250" cy="60" r="4" fill="#64748b" /><circle cx="280" cy="90" r="3.5" fill="#64748b" />
  </svg>
);

const pcbCornerRight = (
  <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-[0.08]">
    <path d="M300 70 L160 70 L160 28 L100 28 L100 0" stroke="#64748b" strokeWidth="1.5" />
    <path d="M230 0 L230 90 L185 90 L185 155" stroke="#64748b" strokeWidth="1.5" />
    <path d="M300 140 L250 140 L210 180 L210 220 L180 250" stroke="#64748b" strokeWidth="1.5" />
    <path d="M120 0 L120 45 L80 85 L80 130 L50 160" stroke="#64748b" strokeWidth="1" />
    <path d="M50 0 L50 60 L20 90" stroke="#64748b" strokeWidth="1" />
    <circle cx="230" cy="70" r="4.5" fill="#64748b" /><circle cx="160" cy="70" r="4.5" fill="#64748b" /><circle cx="100" cy="28" r="4.5" fill="#64748b" /><circle cx="100" cy="0" r="4.5" fill="#64748b" /><circle cx="230" cy="0" r="4.5" fill="#64748b" /><circle cx="185" cy="90" r="4.5" fill="#64748b" /><circle cx="185" cy="155" r="4.5" fill="#64748b" /><circle cx="250" cy="140" r="4.5" fill="#64748b" /><circle cx="210" cy="180" r="4.5" fill="#64748b" /><circle cx="210" cy="220" r="3.5" fill="#64748b" /><circle cx="180" cy="250" r="3.5" fill="#64748b" /><circle cx="120" cy="45" r="4.5" fill="#64748b" /><circle cx="80" cy="85" r="4.5" fill="#64748b" /><circle cx="80" cy="130" r="3.5" fill="#64748b" /><circle cx="50" cy="60" r="4" fill="#64748b" /><circle cx="20" cy="90" r="3.5" fill="#64748b" />
  </svg>
);

export default function WhyChooseUs() {
  const { t } = useTranslation();
  const WHY_CHOOSE_US = [
    { step: '01', title: t('home.process.step1_title'), description: t('home.process.step1_desc'), iconImage: UPLOADED_ICONS.iconDiscover },
    { step: '02', title: t('home.process.step2_title'), description: t('home.process.step2_desc'), iconImage: UPLOADED_ICONS.iconDesign },
    { step: '03', title: t('home.process.step3_title'), description: t('home.process.step3_desc'), iconImage: UPLOADED_ICONS.iconBuild },
    { step: '04', title: t('home.process.step4_title'), description: t('home.process.step4_desc'), iconImage: UPLOADED_ICONS.iconDeliver },
  ];

  return (
    <section className="relative py-14 md:py-20 lg:py-28 bg-[#f4f7fb] dark:bg-[#08101e] overflow-hidden" id="our-process">
      <div className="absolute top-0 left-0 pointer-events-none z-0 hidden md:block">{pcbCornerLeft}</div>
      <div className="absolute top-0 right-0 pointer-events-none z-0 hidden md:block">{pcbCornerRight}</div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 md:px-10 lg:px-14">
        <Reveal staggerChildren={0.12} once>
          <div className="text-center mb-8 md:mb-14 lg:mb-18">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent-500 mb-2 sm:mb-3">{t('home.process.eyebrow')}</p>
            <h2 className="text-2xl sm:text-4xl lg:text-6xl font-bold text-foreground-900 dark:text-white leading-[1.15]">{t('home.process.title')}</h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-[#475569] dark:text-slate-400 max-w-2xl mx-auto leading-relaxed text-pretty">{t('home.process.subtitle')}</p>
          </div>
        </Reveal>
        <Reveal staggerChildren={0.1} once>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-5">
            {WHY_CHOOSE_US.map((item, i) => (
              <div key={i} className="h-full">
                <div className="relative bg-white/80 dark:bg-[#0f1a2e]/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-slate-100/80 dark:border-slate-700/50 p-5 sm:p-6 lg:p-8 h-full flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_14px_40px_rgba(15,30,61,0.10)] hover:border-blue-200/50 group">
                  {i < 3 && (
                    <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 z-20 hidden lg:flex items-center justify-center w-8 h-8 bg-white dark:bg-slate-800 rounded-full shadow-[0_2px_8px_rgba(15,30,61,0.08)]">
                      <i className="ri-arrow-right-s-line text-foreground-400 text-lg" />
                    </div>
                  )}
                  <div className="flex flex-col gap-0">
                    <span className="text-3xl sm:text-6xl lg:text-8xl font-extrabold text-[#c7d4ee] dark:text-slate-700 leading-none select-none pointer-events-none tracking-tight shrink-0">{item.step}</span>
                    <div className="flex-1 min-w-0">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-[4.5rem] lg:h-[4.5rem] flex items-center justify-center sm:mt-1 lg:mt-2 shrink-0 transition-all duration-500 group-hover:scale-110">
                        <img src={item.iconImage} alt={item.title} className="w-full h-full p-1 object-contain transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                      </div>
                      <h3 className="mt-3 sm:mt-4 lg:mt-5 text-sm sm:text-lg lg:text-xl font-bold text-[#0f1e3d] dark:text-white leading-snug">{item.title}</h3>
                      <p className="mt-1.5 sm:mt-2 lg:mt-3 text-sm sm:text-sm text-[#64748b] dark:text-slate-400 leading-relaxed text-pretty">{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}