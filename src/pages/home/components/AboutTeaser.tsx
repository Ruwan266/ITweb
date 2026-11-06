import Reveal from '@/components/feature/Reveal';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function AboutTeaser() {
  const { t } = useTranslation();
  const SQUARE_VIDEO_URL = 'https://storage.readdy-site.link/project_files/a7669e92-cc43-4f26-805a-e805864048d7/b250e1a5-1348-45d7-991e-7863cf30108b_openart-94cd20faf5e2acec4ebcd021a4f0cc97-8189d78c-4de0-4ddb-ad0b-232ec955fcaa_1781368571842_470a7a21.mp4';

  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-circuit-pale overflow-x-hidden" id="about-teaser">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 lg:gap-16 items-center">
          <Reveal>
            <div>
              <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.15em] text-accent-500 mb-3 block">{t('home.about.eyebrow')}</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold text-navy dark:text-white leading-[1.15] mb-5 text-balance">{t('home.about.title')}</h2>
              <p className="text-sm md:text-base text-foreground-500 leading-relaxed mb-4">{t('home.about.p1')}</p>
              <p className="text-sm md:text-base text-foreground-500 leading-relaxed mb-3">{t('home.about.p2')}</p>
              <p className="text-sm md:text-base text-foreground-700 font-medium mb-6">{t('home.about.p3')}</p>
              <Link to="/about" className="whitespace-nowrap cursor-pointer inline-flex items-center text-sm font-medium text-accent-500 hover:text-accent-600 transition-colors">
                {t('home.about.learn_more')}
                <i className="ri-arrow-right-line ml-1.5" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl group">
              <video className="absolute inset-0 w-full h-full object-contain" autoPlay loop muted playsInline preload="metadata">
                <source src={SQUARE_VIDEO_URL} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-black/10" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}