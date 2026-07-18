import Reveal from '@/components/feature/Reveal';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function FeaturedProjects() {
  const { t } = useTranslation();
  const FEATURED = [
    { title: t('project.finflow.title'), category: t('project.finflow.cat'), description: t('project.finflow.desc'), image: 'https://readdy.ai/api/search-image?query=Modern%20fintech%20dashboard%20interface%20on%20a%20dark%20sleek%20laptop%20screen%2C%20clean%20data%20visualization%20charts%20with%20teal%20and%20white%20accents%2C%20minimalist%20glassmorphism%20UI%20elements%2C%20soft%20ambient%20lighting%20on%20a%20dark%20wooden%20desk%2C%20professional%20editorial%20photography%2C%20high%20detail%2C%20neutral%20background&width=800&height=500&seq=project-finflow&orientation=landscape', tags: ['React', 'Node.js', 'AWS', 'PostgreSQL'] },
    { title: t('project.meditrack.title'), category: t('project.meditrack.cat'), description: t('project.meditrack.desc'), image: 'https://readdy.ai/api/search-image?query=Healthcare%20logistics%20dashboard%20displayed%20on%20a%20modern%20monitor%2C%20clean%20white%20and%20cyan%20interface%20with%20supply%20chain%20maps%20and%20tracking%20data%2C%20minimalist%20medical%20aesthetic%2C%20soft%20clinic%20lighting%2C%20professional%20photography%2C%20clean%20white%20background&width=800&height=500&seq=project-meditrack&orientation=landscape', tags: ['Angular', 'Python', 'GCP', 'MongoDB'] },
    { title: t('project.retailiq.title'), category: t('project.retailiq.cat'), description: t('project.retailiq.desc'), image: 'https://readdy.ai/api/search-image?query=Smart%20retail%20inventory%20management%20interface%20on%20a%20tablet%20screen%2C%20clean%20modern%20ecommerce%20dashboard%20with%20analytics%20charts%2C%20white%20and%20blue%20color%20scheme%2C%20minimalist%20workspace%20setting%2C%20soft%20natural%20window%20light%2C%20editorial%20product%20photography&width=800&height=500&seq=project-retailiq&orientation=landscape', tags: ['Next.js', 'TensorFlow', 'Azure', 'Redis'] },
  ];
  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-circuit-pale overflow-x-hidden" id="featured-projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 xl:px-16">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 md:mb-16 lg:mb-20 gap-4">
            <div>
              <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.15em] text-accent-500 mb-3 block">{t('home.projects.eyebrow')}</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold text-navy dark:text-white leading-[1.15] text-balance">{t('home.projects.title')}</h2>
            </div>
            <Link to="/projects" className="whitespace-nowrap cursor-pointer inline-flex items-center text-sm font-medium text-accent-500 hover:text-accent-600 transition-colors">
              {t('home.projects.view_all')}
              <i className="ri-arrow-right-line ml-1.5" />
            </Link>
          </div>
        </Reveal>
        <Reveal staggerChildren={80}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {FEATURED.map((project, i) => (
              <Link key={i} to="/projects" className="group bg-white dark:bg-[#0f1a2e] rounded-2xl overflow-hidden border border-background-200/70 dark:border-slate-700/50 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col min-w-0">
                <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-xs font-medium text-navy dark:text-white whitespace-nowrap">{project.category}</span>
                </div>
                <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-1">
                  <h3 className="font-semibold text-sm md:text-base text-navy dark:text-white mb-2 leading-snug">{project.title}</h3>
                  <p className="text-sm text-foreground-500 leading-relaxed mb-4 flex-1">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-full bg-background-100 dark:bg-slate-800 text-xs font-medium text-foreground-500 whitespace-nowrap">{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}