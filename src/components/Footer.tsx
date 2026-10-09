'use client';

import Link from 'next/link';
import { useLocale } from '@/contexts/LocaleContext';

export default function Footer() {
  const { t } = useLocale();

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.about'), href: '/about' },
    { label: t('nav.practiceAreas'), href: '/practice-areas' },
    { label: t('nav.ourWork'), href: '/our-work' },
    { label: t('nav.insights'), href: '/insights' },
    { label: t('nav.contact'), href: '/contact' },
  ];

  const resourceLinks = [
    { label: t('resources.legalGuides'), href: '/resources/legal-guides' },
    { label: t('resources.knowYourRights'), href: '/resources/know-your-rights' },
    { label: t('resources.faq'), href: '/resources/faq' },
    { label: t('resources.govSchemes'), href: '/resources/government-schemes' },
    { label: t('resources.glossary'), href: '/resources/glossary' },
  ];

  const publicHelpLinks = [
    { label: t('publicHelp.submitComplaint'), href: '/public-help/submit-complaint' },
    { label: t('publicHelp.requestAssistance'), href: '/public-help/request-assistance' },
    { label: t('publicHelp.petitions'), href: '/public-help/petitions' },
    { label: t('publicHelp.trackSubmission'), href: '/public-help/track-submission' },
  ];

  const legalLinks = [
    { label: t('footer.disclaimer'), href: '/disclaimer' },
    { label: t('footer.terms'), href: '/terms' },
    { label: t('footer.privacy'), href: '/privacy' },
    { label: t('footer.accessibility'), href: '/accessibility' },
    { label: t('footer.sitemap'), href: '/sitemap' },
  ];

  return (
    <footer className="bg-[var(--color-primary-dark)] text-white" role="contentinfo">
      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4 no-underline">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm border border-white/20"
                style={{ background: 'linear-gradient(135deg, #2F6DB5, #174A8B)' }}
              >
                LA
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-lg font-bold tracking-tight text-white" style={{ fontFamily: 'var(--font-serif)' }}>
                  Legal Arjun
                </span>
                <span className="text-[10px] tracking-[0.08em] uppercase text-white/50">
                  Law & Public Assistance
                </span>
              </div>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed max-w-md mt-4">
              {t('footer.about')}
            </p>
            <p className="text-white/50 text-xs mt-4 italic">
              {t('footer.builtWith')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90 mb-4" style={{ fontFamily: 'var(--font-sans)' }}>
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/65 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90 mb-4" style={{ fontFamily: 'var(--font-sans)' }}>
              {t('nav.resources')}
            </h3>
            <ul className="space-y-2.5">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/65 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90 mb-4 mt-8" style={{ fontFamily: 'var(--font-sans)' }}>
              {t('nav.publicHelp')}
            </h3>
            <ul className="space-y-2.5">
              {publicHelpLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/65 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Pages */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90 mb-4" style={{ fontFamily: 'var(--font-sans)' }}>
              {t('footer.legalPages')}
            </h3>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/65 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-sm text-white/50">
            © {currentYear} Legal Arjun. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/disclaimer" className="text-xs text-white/40 hover:text-white/70 transition-colors">
              {t('footer.disclaimer')}
            </Link>
            <span className="text-white/20">|</span>
            <Link href="/privacy" className="text-xs text-white/40 hover:text-white/70 transition-colors">
              {t('footer.privacy')}
            </Link>
            <span className="text-white/20">|</span>
            <Link href="/terms" className="text-xs text-white/40 hover:text-white/70 transition-colors">
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
