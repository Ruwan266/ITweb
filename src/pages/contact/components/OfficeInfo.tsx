import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import {
  FaLinkedinIn,
  FaXTwitter,
  FaGithub,
  FaYoutube,
  FaFacebookF,
  FaInstagram,
  FaTiktok,
} from 'react-icons/fa6';
import Reveal from '@/components/feature/Reveal';

const socials = [
  { name: 'Facebook', Icon: FaFacebookF, url: 'https://www.facebook.com/share/1EUkwbC7VZ/' },
  { name: 'Instagram', Icon: FaInstagram, url: 'https://www.instagram.com/sins.technology?igsh=MXJvcHdveHo1bHhmaQ==' },
  { name: 'TikTok', Icon: FaTiktok, url: 'https://www.tiktok.com/@sins.technology.u?_r=1&_t=ZS-97BJ4u2Nngw' },
  { name: 'LinkedIn', Icon: FaLinkedinIn, url: 'https://linkedin.com' },
  { name: 'X', Icon: FaXTwitter, url: 'https://x.com' },
  { name: 'GitHub', Icon: FaGithub, url: 'https://github.com' },
  { name: 'YouTube', Icon: FaYoutube, url: 'https://youtube.com' },
];

export default function OfficeInfo() {
  const { t } = useTranslation();
  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-circuit-50 relative" id="office-info">
      <div className="site-container">
        <Reveal>
          <div className="text-center mb-10 sm:mb-14 md:mb-16">
            <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.15em] text-accent-500 mb-3 block">{t('contact.office.eyebrow')}</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-navy dark:text-white leading-[1.15] text-balance">{t('contact.office.title')}</h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <Reveal>
            <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 rounded-2xl overflow-hidden border border-background-200/70 dark:border-slate-700/50">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3612.834567890123!2d55.417!3d25.118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6389a1234567%3A0xabcdef1234567890!2sDubai%20Academic%20City!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Samarat Infinity Network Solutions Office Location" aria-label="Google Map showing Samarat Infinity Network Solutions office in Dubai Academic City" className="absolute inset-0" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div className="bg-white dark:bg-[#0f1a2e] rounded-2xl p-5 sm:p-6 border border-background-200/70 dark:border-slate-700/50">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#5b8cff] to-[#2563eb] shadow-md shadow-blue-500/25 flex items-center justify-center mb-4 flex-shrink-0"><MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2} /></div>
                <h3 className="font-semibold text-sm text-navy dark:text-white mb-2">{t('contact.info.address')}</h3>
                <p className="text-sm text-foreground-500 leading-relaxed">Doz 11, Academic City<br />Dubai<br />United Arab Emirates</p>
              </div>
              <div className="bg-white dark:bg-[#0f1a2e] rounded-2xl p-5 sm:p-6 border border-background-200/70 dark:border-slate-700/50">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#5b8cff] to-[#2563eb] shadow-md shadow-blue-500/25 flex items-center justify-center mb-4 flex-shrink-0"><Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2} /></div>
                <h3 className="font-semibold text-sm text-navy dark:text-white mb-2">{t('contact.info.phone')}</h3>
                <a href="tel:+971558343973" className="text-sm text-accent-500 hover:text-accent-600 leading-relaxed transition-colors">+971 558343973</a>
              </div>
              <div className="bg-white dark:bg-[#0f1a2e] rounded-2xl p-5 sm:p-6 border border-background-200/70 dark:border-slate-700/50">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#5b8cff] to-[#2563eb] shadow-md shadow-blue-500/25 flex items-center justify-center mb-4 flex-shrink-0"><Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2} /></div>
                <h3 className="font-semibold text-sm text-navy dark:text-white mb-2">{t('contact.info.email')}</h3>
                <a href="mailto:info@smartinfinityn.com" className="text-sm text-accent-500 hover:text-accent-600 leading-relaxed break-all transition-colors">info@smartinfinityn.com</a>
              </div>
              <div className="bg-white dark:bg-[#0f1a2e] rounded-2xl p-5 sm:p-6 border border-background-200/70 dark:border-slate-700/50">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#5b8cff] to-[#2563eb] shadow-md shadow-blue-500/25 flex items-center justify-center mb-4 flex-shrink-0"><Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2} /></div>
                <h3 className="font-semibold text-sm text-navy dark:text-white mb-2">{t('contact.info.business_hours')}</h3>
                <p className="text-sm text-foreground-500 leading-relaxed">{t('contact.info.mon_fri')}</p>
              </div>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-10 sm:mt-12">
            <span className="text-xs sm:text-sm text-foreground-400">{t('contact.connect')}</span>
            {socials.map(({ name, Icon, url }) => (
              <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white dark:bg-[#0f1a2e] border border-background-200/70 dark:border-slate-700/50 flex items-center justify-center text-foreground-500 hover:text-[#2563eb] hover:border-accent-200 transition-all duration-200" aria-label={name}>
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}