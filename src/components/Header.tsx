'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useLocale } from '@/contexts/LocaleContext';
import { locales, localeNames, Locale } from '@/lib/i18n';

export default function Header() {
  const { locale, setLocale, t } = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [publicHelpOpen, setPublicHelpOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const [mobilePublicHelpOpen, setMobilePublicHelpOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const resourcesRef = useRef<HTMLDivElement>(null);
  const publicHelpRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (resourcesRef.current && !resourcesRef.current.contains(e.target as Node)) {
        setResourcesOpen(false);
      }
      if (publicHelpRef.current && !publicHelpRef.current.contains(e.target as Node)) {
        setPublicHelpOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const resourcesItems = [
    { key: 'resources.legalGuides', href: '/resources/legal-guides' },
    { key: 'resources.faq', href: '/resources/faq' },
    { key: 'resources.knowYourRights', href: '/resources/know-your-rights' },
    { key: 'resources.documentGuides', href: '/resources/document-guides' },
    { key: 'resources.importantLinks', href: '/resources/important-links' },
    { key: 'resources.govSchemes', href: '/resources/government-schemes' },
    { key: 'resources.courtResources', href: '/resources/court-resources' },
    { key: 'resources.glossary', href: '/resources/glossary' },
    { key: 'resources.downloads', href: '/resources/downloads' },
  ];

  const publicHelpItems = [
    { key: 'publicHelp.submitComplaint', href: '/public-help/submit-complaint' },
    { key: 'publicHelp.requestAssistance', href: '/public-help/request-assistance' },
    { key: 'publicHelp.petitions', href: '/public-help/petitions' },
    { key: 'publicHelp.trackSubmission', href: '/public-help/track-submission' },
    { key: 'publicHelp.faq', href: '/public-help/faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md'
          : 'bg-white'
      }`}
      role="banner"
    >
      <div className="container">
        <nav className="flex items-center justify-between h-[72px]" role="navigation" aria-label="Main navigation">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 no-underline" aria-label="Legal Arjun - Home">
            <div className="flex items-center gap-2.5">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                style={{ background: 'linear-gradient(135deg, #174A8B, #2F6DB5)' }}
              >
                LA
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-lg font-bold tracking-tight" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-primary-dark)' }}>
                  Legal Arjun
                </span>
                <span className="text-[10px] tracking-[0.08em] uppercase" style={{ color: 'var(--color-text-muted)' }}>
                  Law & Public Assistance
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <Link href="/" className="nav-link">{t('nav.home')}</Link>
            <Link href="/about" className="nav-link">{t('nav.about')}</Link>
            <Link href="/practice-areas" className="nav-link">{t('nav.practiceAreas')}</Link>
            <Link href="/our-work" className="nav-link">{t('nav.ourWork')}</Link>
            <Link href="/insights" className="nav-link">{t('nav.insights')}</Link>

            {/* Resources Dropdown */}
            <div ref={resourcesRef} className="relative">
              <button
                className="nav-link flex items-center gap-1"
                onClick={() => { setResourcesOpen(!resourcesOpen); setPublicHelpOpen(false); }}
                aria-expanded={resourcesOpen}
                aria-haspopup="true"
              >
                {t('nav.resources')}
                <svg className={`w-3.5 h-3.5 transition-transform ${resourcesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {resourcesOpen && (
                <div className="dropdown-menu" role="menu">
                  {resourcesItems.map((item) => (
                    <Link
                      key={item.key}
                      href={item.href}
                      className="dropdown-item"
                      role="menuitem"
                      onClick={() => setResourcesOpen(false)}
                    >
                      {t(item.key)}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Public Help Dropdown */}
            <div ref={publicHelpRef} className="relative">
              <button
                className="nav-link flex items-center gap-1 font-semibold"
                style={{ color: 'var(--color-primary)' }}
                onClick={() => { setPublicHelpOpen(!publicHelpOpen); setResourcesOpen(false); }}
                aria-expanded={publicHelpOpen}
                aria-haspopup="true"
              >
                {t('nav.publicHelp')}
                <svg className={`w-3.5 h-3.5 transition-transform ${publicHelpOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {publicHelpOpen && (
                <div className="dropdown-menu" role="menu">
                  {publicHelpItems.map((item) => (
                    <Link
                      key={item.key}
                      href={item.href}
                      className="dropdown-item"
                      role="menuitem"
                      onClick={() => setPublicHelpOpen(false)}
                    >
                      {t(item.key)}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/contact" className="nav-link">{t('nav.contact')}</Link>
          </div>

          {/* Right side: Language + CTA + Mobile */}
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div ref={langRef} className="relative">
              <button
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm rounded-md border transition-colors hover:bg-gray-50"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                onClick={() => setLangOpen(!langOpen)}
                aria-expanded={langOpen}
                aria-label="Select language"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <span className="hidden sm:inline">{localeNames[locale]}</span>
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white border rounded-lg shadow-lg py-1 min-w-[140px] z-50" style={{ borderColor: 'var(--color-border)' }}>
                  {locales.map((l) => (
                    <button
                      key={l}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-gray-50 ${l === locale ? 'font-semibold' : ''}`}
                      style={{ color: l === locale ? 'var(--color-primary)' : 'var(--color-text)' }}
                      onClick={() => { setLocale(l as Locale); setLangOpen(false); }}
                    >
                      {localeNames[l as Locale]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CTA Button */}
            <Link href="/public-help/submit-complaint" className="btn btn-primary btn-sm hidden md:inline-flex">
              {t('nav.submitComplaint')}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[72px] bg-white z-40 overflow-y-auto">
          <div className="container py-6 space-y-1">
            <Link href="/" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>{t('nav.home')}</Link>
            <Link href="/about" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>{t('nav.about')}</Link>
            <Link href="/practice-areas" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>{t('nav.practiceAreas')}</Link>
            <Link href="/our-work" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>{t('nav.ourWork')}</Link>
            <Link href="/insights" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>{t('nav.insights')}</Link>

            {/* Mobile Resources */}
            <div>
              <button
                className="mobile-nav-link w-full flex justify-between items-center"
                onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
                aria-expanded={mobileResourcesOpen}
              >
                {t('nav.resources')}
                <svg className={`w-4 h-4 transition-transform ${mobileResourcesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileResourcesOpen && (
                <div className="pl-4 space-y-0.5 mt-1">
                  {resourcesItems.map((item) => (
                    <Link
                      key={item.key}
                      href={item.href}
                      className="mobile-nav-sublink"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t(item.key)}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Public Help */}
            <div>
              <button
                className="mobile-nav-link w-full flex justify-between items-center font-semibold"
                style={{ color: 'var(--color-primary)' }}
                onClick={() => setMobilePublicHelpOpen(!mobilePublicHelpOpen)}
                aria-expanded={mobilePublicHelpOpen}
              >
                {t('nav.publicHelp')}
                <svg className={`w-4 h-4 transition-transform ${mobilePublicHelpOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobilePublicHelpOpen && (
                <div className="pl-4 space-y-0.5 mt-1">
                  {publicHelpItems.map((item) => (
                    <Link
                      key={item.key}
                      href={item.href}
                      className="mobile-nav-sublink"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t(item.key)}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/contact" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>{t('nav.contact')}</Link>

            <div className="pt-4">
              <Link
                href="/public-help/submit-complaint"
                className="btn btn-primary w-full justify-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.submitComplaint')}
              </Link>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .nav-link {
          display: inline-flex;
          align-items: center;
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--color-text);
          text-decoration: none;
          border-radius: 0.375rem;
          transition: all 0.2s;
          background: none;
          border: none;
          cursor: pointer;
          font-family: var(--font-sans);
        }
        .nav-link:hover {
          color: var(--color-primary);
          background-color: var(--color-primary-bg);
        }
        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          margin-top: 0.25rem;
          background: white;
          border: 1px solid var(--color-border);
          border-radius: 0.75rem;
          box-shadow: var(--shadow-lg);
          padding: 0.5rem;
          min-width: 260px;
          z-index: 50;
          animation: fadeIn 0.15s ease-out;
        }
        .dropdown-item {
          display: block;
          padding: 0.625rem 1rem;
          font-size: 0.875rem;
          color: var(--color-text);
          text-decoration: none;
          border-radius: 0.375rem;
          transition: all 0.15s;
        }
        .dropdown-item:hover {
          background-color: var(--color-primary-bg);
          color: var(--color-primary);
        }
        .mobile-nav-link {
          display: block;
          padding: 0.875rem 0;
          font-size: 1rem;
          font-weight: 500;
          color: var(--color-text);
          text-decoration: none;
          border-bottom: 1px solid var(--color-border);
          background: none;
          border-top: none;
          border-left: none;
          border-right: none;
          cursor: pointer;
          font-family: var(--font-sans);
          text-align: left;
        }
        .mobile-nav-sublink {
          display: block;
          padding: 0.625rem 0;
          font-size: 0.9375rem;
          color: var(--color-text-muted);
          text-decoration: none;
          transition: color 0.15s;
        }
        .mobile-nav-sublink:hover {
          color: var(--color-primary);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </header>
  );
}
