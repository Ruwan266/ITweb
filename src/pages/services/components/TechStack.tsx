import Reveal from '@/components/feature/Reveal';
import { Hexagon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function TechStack() {
  const { t } = useTranslation();

  const STACKS = [
    { category: t('services.tech_stack.frontend'), iconImage: 'https://public.readdy.ai/ai/img_res/3503af3e-7847-4c6f-ad23-6e7bb905ef81.png', items: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Angular', 'Vue.js', 'React Native', 'Flutter'] },
    { category: t('services.tech_stack.backend'), iconImage: 'https://public.readdy.ai/ai/img_res/6271c66d-0bd1-4ddf-b3e4-0ee88977687a.png', items: ['Node.js', 'Python', 'Go', 'Java', '.NET', 'GraphQL', 'REST', 'gRPC'] },
    { category: t('services.tech_stack.cloud'), iconImage: 'https://public.readdy.ai/ai/img_res/3189c5bb-706e-4877-936c-e0f5a3698dda.png', items: ['AWS', 'Azure', 'GCP', 'Kubernetes', 'Docker', 'Terraform', 'Pulumi', 'Vercel'] },
    { category: t('services.tech_stack.data_ai'), iconImage: 'https://public.readdy.ai/ai/img_res/80b2344f-43ac-47c3-8de5-b37257d8561b.png', items: ['PostgreSQL', 'MongoDB', 'Redis', 'TensorFlow', 'PyTorch', 'Spark', 'Kafka', 'Snowflake'] },
    { category: t('services.tech_stack.devops'), iconImage: 'https://public.readdy.ai/ai/img_res/550cd3ff-8189-42ae-b27b-cffa7f978abf.png', items: ['GitHub Actions', 'GitLab CI', 'SonarQube', 'Snyk', 'Datadog', 'Splunk', 'Vault', 'Cloudflare'] },
  ];

  return (
    <section
      className="relative py-16 lg:py-28 overflow-hidden"
      style={{ backgroundColor: '#f4f7fb' }}
      id="tech-stack"
    >
      {/* PCB trace pattern */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.06]"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="pcb-corners"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 10 L20 10 L20 0 M0 30 L40 30 L40 0 M0 50 L60 50 L60 0"
              stroke="#2563eb"
              strokeWidth="0.5"
              fill="none"
            />
            <path
              d="M100 90 L80 90 L80 100 M100 70 L60 70 L60 100 M100 50 L40 50 L40 100"
              stroke="#2563eb"
              strokeWidth="0.5"
              fill="none"
            />
            <circle cx="20" cy="10" r="1.5" fill="#2563eb" />
            <circle cx="40" cy="30" r="1.5" fill="#2563eb" />
            <circle cx="60" cy="50" r="1.5" fill="#2563eb" />
            <circle cx="80" cy="90" r="1.5" fill="#2563eb" />
            <circle cx="60" cy="70" r="1.5" fill="#2563eb" />
            <circle cx="40" cy="50" r="1.5" fill="#2563eb" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pcb-corners)" />
      </svg>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-14">
        {/* Header */}
        <Reveal>
          <div className="text-center">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 rounded-full border px-5 py-2"
              style={{ borderColor: '#bfdbfe', backgroundColor: '#ffffff' }}>
              <Hexagon className="w-4 h-4" style={{ color: '#2563eb' }} strokeWidth={2} />
              <span
                className="text-sm font-semibold uppercase tracking-[0.18em]"
                style={{ color: '#2563eb' }}
              >
                {t('services.tech_stack.eyebrow')}
              </span>
            </div>

            {/* Two-tone heading */}
            <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight text-balance">
              <span style={{ color: '#0a1628' }}>{t('services.tech_stack.title1')}</span>
              <span style={{ color: '#2563eb' }}>{t('services.tech_stack.title2')}</span>
            </h2>

            {/* Subtext */}
            <p
              className="mt-4 mx-auto max-w-2xl text-base sm:text-lg leading-relaxed text-balance"
              style={{ color: '#475569' }}
            >
              {t('services.tech_stack.subtitle')}
            </p>
          </div>
        </Reveal>

        {/* Cards grid */}
        <Reveal staggerChildren={60}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6 mt-10 sm:mt-14">
            {STACKS.map((stack, i) => {
              const colSpan = 'lg:col-span-2';
              const colStart =
                i === 3 ? 'lg:col-start-2' : i === 4 ? '' : '';

              return (
                <div
                  key={i}
                  className={`${colSpan} ${colStart} h-full`}
                >
                  <div
                    className="h-full rounded-3xl p-5 sm:p-6 lg:p-7 flex flex-col"
                    style={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #f1f5f9',
                      boxShadow: '0 10px 40px rgba(15, 30, 61, 0.06)',
                    }}
                  >
                    {/* Icon + title row */}
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
                        <img
                          src={stack.iconImage}
                          alt={stack.category}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <h3
                        className="text-lg sm:text-xl lg:text-2xl font-bold"
                        style={{ color: '#0a1628' }}
                      >
                        {stack.category}
                      </h3>
                    </div>

                    {/* Tag pills */}
                    <div className="flex flex-wrap gap-2 mt-5 sm:mt-6">
                      {stack.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-lg px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-xs sm:text-sm font-medium transition-colors cursor-default whitespace-nowrap"
                          style={{
                            backgroundColor: '#ffffff',
                            border: '1px solid #e2e8f0',
                            color: '#334155',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#93c5fd';
                            e.currentTarget.style.color = '#2563eb';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = '#e2e8f0';
                            e.currentTarget.style.color = '#334155';
                          }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* Bonus row */}
        <Reveal delay={0.3}>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-10 sm:mt-12">
            <span className="text-sm" style={{ color: '#94a3b8' }}>
              {t('services.tech_stack.trusted')}
            </span>
            <span
              className="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap"
              style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', color: '#64748b' }}
            >
              {t('services.tech_stack.aws')}
            </span>
            <span
              className="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap"
              style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', color: '#64748b' }}
            >
              {t('services.tech_stack.azure')}
            </span>
            <span
              className="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap"
              style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', color: '#64748b' }}
            >
              {t('services.tech_stack.gcp')}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}