'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocale } from '@/contexts/LocaleContext';
import {
  ArrowUp,
  BookOpen,
  Building2,
  FileCheck2,
  HeartHandshake,
  Lock,
  Mail,
  MapPin,
  Phone,
  Scale,
  Shield,
  ShieldAlert,
  Sparkles
} from 'lucide-react';

export default function Footer() {
  const { t } = useLocale();
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const practiceLinks = [
    { label: t('nav.home'), href: '/' },
    { label: 'About Adv. Arjun Panwar', href: '/about' },
    { label: t('nav.practiceAreas'), href: '/practice-areas' },
    { label: t('nav.ourWork'), href: '/our-work' },
    { label: 'Legal Blog & Guides', href: '/blog' },
    { label: 'Schedule Consultation', href: '/contact' },
  ];

  const citizenHelpLinks = [
    { label: 'Submit Citizen Grievance', href: '/public-help/submit-complaint' },
    { label: 'Track Submission Status', href: '/public-help/track-submission' },
    { label: 'Explore Civic Petitions', href: '/petitions' },
    { label: 'Propose a Public Petition', href: '/petitions/create' },
    { label: 'Complaint Handling Policy', href: '/complaint-handling-policy' },
  ];

  const resourceLinks = [
    { label: 'Citizen Resource Center', href: '/resources' },
    { label: 'Legal Glossary (विधिक शब्दकोश)', href: '/resources/glossary' },
    { label: 'Consumer Redressal (e-Daakhil)', href: '/resources' },
    { label: 'NALSA Free Legal Aid Portal', href: '/resources' },
    { label: 'National Cyber Crime (1930)', href: '/resources' },
  ];

  const complianceLinks = [
    { label: t('footer.disclaimer'), href: '/disclaimer' },
    { label: t('footer.privacy'), href: '/privacy' },
    { label: t('footer.terms'), href: '/terms' },
    { label: t('footer.accessibility'), href: '/accessibility' },
    { label: 'Chambers Admin Console', href: '/admin/login' },
  ];

  return (
    <footer className="bg-[#0B1D33] text-white border-t border-white/10" role="contentinfo">
      {/* ─── TOP SECTION: CHAMBERS IDENTITY & DIRECT CONTACT ─── */}
      <div className="border-b border-white/10 bg-[#081729]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            
            {/* Brand Logo & Title */}
            <div className="flex items-center gap-4">
              <Link href="/" className="shrink-0 group block" aria-label="Advocate Arjun Panwar Homepage">
                <img
                  src="/images/logo.png"
                  alt="Advocate Arjun Panwar Seal"
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-white/20 shadow-md group-hover:scale-105 transition-transform"
                />
              </Link>
              <div>
                <Link href="/" className="inline-block group">
                  <h2 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-tight group-hover:text-blue-200 transition-colors">
                    Adv. Arjun Panwar
                  </h2>
                </Link>
                <p className="text-xs sm:text-sm font-medium tracking-wider uppercase text-blue-200/90 mt-0.5">
                  Legal Arjun • Law & Public Assistance Platform
                </p>
                <p className="text-xs text-slate-300 mt-1 max-w-lg leading-relaxed font-light">
                  Advocate, High Court of Delhi & Supreme Court of India • Dedicated to constitutional justice, consumer protection & citizen empowerment.
                </p>
              </div>
            </div>

            {/* Quick Contact Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 shrink-0">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10">
                <MapPin className="w-4 h-4 text-blue-300 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-semibold text-white block">Chambers Address</span>
                  <span className="text-slate-300">Ch. 418, Delhi High Court Complex, New Delhi</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10">
                <Mail className="w-4 h-4 text-blue-300 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-semibold text-white block">Chambers Communications</span>
                  <a href="mailto:chambers@legalarjun.com" className="text-blue-200 hover:text-white transition-colors">
                    chambers@legalarjun.com
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ─── MAIN 4-COLUMN BALANCED NAVIGATION ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          
          {/* Column 1: Chambers & Practice */}
          <div>
            <div className="flex items-center gap-2 mb-5 pb-2 border-b border-white/10">
              <Scale className="w-4 h-4 text-blue-300" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                Chambers & Practice
              </h3>
            </div>
            <ul className="space-y-3">
              {practiceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all"
                  >
                    <span className="text-blue-400 text-xs">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Public Assistance */}
          <div>
            <div className="flex items-center gap-2 mb-5 pb-2 border-b border-white/10">
              <HeartHandshake className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                Citizen Assistance
              </h3>
            </div>
            <ul className="space-y-3">
              {citizenHelpLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all"
                  >
                    <span className="text-emerald-400 text-xs">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal Knowledge & Portals */}
          <div>
            <div className="flex items-center gap-2 mb-5 pb-2 border-b border-white/10">
              <BookOpen className="w-4 h-4 text-amber-300" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                Knowledge & Portals
              </h3>
            </div>
            <ul className="space-y-3">
              {resourceLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all"
                  >
                    <span className="text-amber-400 text-xs">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Regulatory & Compliance */}
          <div>
            <div className="flex items-center gap-2 mb-5 pb-2 border-b border-white/10">
              <Shield className="w-4 h-4 text-purple-300" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                Compliance & Security
              </h3>
            </div>
            <div className="space-y-3 text-xs text-slate-300 mb-5 leading-relaxed">
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <span className="font-semibold text-white block mb-0.5">Bar Council Enrolment</span>
                <span className="text-blue-200 font-mono text-[11px]">D/1428/2012 (Bar Council of Delhi)</span>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <span className="font-semibold text-white block mb-0.5">Privacy Standards</span>
                <span className="text-slate-300 text-[11px]">Protected under Digital Personal Data Protection Act (DPDP), 2023</span>
              </div>
            </div>
            <ul className="space-y-2.5">
              {complianceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-slate-400 hover:text-blue-200 hover:underline transition-colors block"
                  >
                    • {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* ─── BCI RULE 36 STATUTORY NOTICE ─── */}
      <div className="border-t border-white/10 bg-[#071321]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-start sm:items-center gap-3 text-xs text-slate-300 leading-relaxed">
            <ShieldAlert className="w-4 h-4 text-blue-300 shrink-0 mt-0.5 sm:mt-0" />
            <p>
              <strong className="text-white">Bar Council of India Rule 36 Disclaimer:</strong> As per the Bar Council of India rules, advocates are not permitted to solicit work or advertise. The information on Legal Arjun is published strictly for public awareness, legal literacy, and citizen assistance, and does not constitute solicitation or legal advice.
            </p>
          </div>
        </div>
      </div>

      {/* ─── BOTTOM COPYRIGHT & ESSENTIAL POLICIES ─── */}
      <div className="border-t border-white/10 bg-[#050E1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            
            <p className="text-center sm:text-left">
              © {currentYear} <strong>Advocate Arjun Panwar</strong> • Legal Arjun. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
              <Link href="/disclaimer" className="hover:text-white transition-colors">
                Disclaimer
              </Link>
              <span>•</span>
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Use
              </Link>
              <span>•</span>
              <Link href="/accessibility" className="hover:text-white transition-colors">
                Universal Accessibility
              </Link>
              <span>•</span>
              <button
                onClick={scrollToTop}
                className="hover:text-white inline-flex items-center gap-1 transition-colors cursor-pointer text-blue-300 hover:text-white ml-2"
                aria-label="Scroll back to top"
              >
                Top <ArrowUp className="w-3 h-3" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}
