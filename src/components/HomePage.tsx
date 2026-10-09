'use client';

import Link from 'next/link';
import { useLocale } from '@/contexts/LocaleContext';

import React from 'react';

/* ─── Practice Area Icons (inline SVG) ─── */
const practiceIcons: Record<string, React.ReactNode> = {
  civil: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
    </svg>
  ),
  criminal: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  property: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
    </svg>
  ),
  corporate: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
    </svg>
  ),
  consumer: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
  ),
  family: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
  constitutional: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
    </svg>
  ),
  employment: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
    </svg>
  ),
  ip: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
    </svg>
  ),
  dispute: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
    </svg>
  ),
};

const practiceAreas = [
  { key: 'civil', icon: 'civil', desc: 'Property disputes, contractual matters, civil remedies, and declaratory suits.' },
  { key: 'criminal', icon: 'criminal', desc: 'Criminal defence, bail applications, trial representation, and appeals.' },
  { key: 'property', icon: 'property', desc: 'Title verification, sale deeds, mutation, land disputes, and RERA compliance.' },
  { key: 'corporate', icon: 'corporate', desc: 'Business formation, contracts, regulatory compliance, and commercial disputes.' },
  { key: 'consumer', icon: 'consumer', desc: 'Consumer complaints, deficiency of service, unfair trade practices, and product liability.' },
  { key: 'family', icon: 'family', desc: 'Divorce, maintenance, custody, adoption, and domestic violence protection.' },
  { key: 'constitutional', icon: 'constitutional', desc: 'Fundamental rights, PIL, writ petitions, and constitutional remedies.' },
  { key: 'employment', icon: 'employment', desc: 'Employment contracts, wrongful termination, workplace disputes, and labour law compliance.' },
  { key: 'ip', icon: 'ip', desc: 'Trademark registration, copyright protection, patent applications, and IP enforcement.' },
  { key: 'dispute', icon: 'dispute', desc: 'Mediation, arbitration, negotiation, and alternative dispute resolution mechanisms.' },
];

/* Demo articles for blog section */
const demoArticles = [
  {
    id: 1,
    slug: 'what-to-do-if-police-refuse-fir-in-india',
    title: 'What to Do If Police Refuse to Register an FIR: Step-by-Step Legal Remedies',
    summary: 'A practical citizen guide on mandatory FIR registration under Lalita Kumari guidelines, written complaints to the SP under Section 154(3), and approaching the Magistrate under Section 156(3) / Section 175 BNSS.',
    category: 'Citizen Rights & Police Procedure',
    date: '2026-10-05',
    readTime: 7,
    image: '/images/article-fir.jpg',
  },
  {
    id: 2,
    slug: 'cyber-fraud-helpline-1930-golden-hour-fund-freeze',
    title: 'Cyber Fraud Golden Hour: How to Call 1930 & Freeze Stolen Bank Funds',
    summary: 'Immediate action steps to recover money lost in online scams, UPI fraud, OTP phishing, or fake investment apps using the National Cyber Crime Reporting Portal and 1930 helpline.',
    category: 'Cyber Safety & Fraud Recovery',
    date: '2026-10-02',
    readTime: 6,
    image: '/images/article-cyber.jpg',
  },
  {
    id: 3,
    slug: 'tenant-rights-security-deposit-refund-eviction-guide',
    title: 'Tenant Rights in India: Security Deposit Disputes, Illegal Eviction & Notice Periods',
    summary: 'Clear legal rights of residential tenants against arbitrary rent hikes, unlawful lockouts by landlords, security deposit deductions, and Model Tenancy Act protections.',
    category: 'Tenancy & Housing Law',
    date: '2026-09-28',
    readTime: 8,
    image: '/images/article-tenant.jpg',
  },
];

const featuredResources = [
  { title: 'Know Your Rights: Tenant & Landlord', category: 'Property', icon: '🏠' },
  { title: 'Consumer Complaint Filing Checklist', category: 'Consumer', icon: '📋' },
  { title: 'Guide to FIR Registration', category: 'Criminal', icon: '📄' },
  { title: 'Employment Termination Rights', category: 'Labour', icon: '💼' },
];

export default function HomePage() {
  const { t } = useLocale();

  return (
    <main id="main-content">
      {/* ─── HERO SECTION ─── */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #102A43 0%, #174A8B 50%, #2F6DB5 100%)' }}>
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24 md:py-32 lg:py-36">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full text-xs font-semibold tracking-wide uppercase"
              style={{ background: 'rgba(255,255,255,0.15)', color: '#FFFFFF', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.25)' }}>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Legal Information & Public Assistance Platform
            </div>

            <h1 className="text-white mb-6 font-serif font-bold tracking-tight leading-[1.12]" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', color: '#FFFFFF' }}>
              {t('hero.title')}
            </h1>

            <p className="text-lg md:text-xl mb-8 max-w-2xl leading-relaxed font-light" style={{ color: 'rgba(255, 255, 255, 0.92)' }}>
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/resources"
                className="px-6 py-3.5 rounded-lg font-semibold text-sm transition-all shadow-md inline-flex items-center justify-center gap-2 hover:opacity-95"
                style={{ backgroundColor: '#FFFFFF', color: '#174A8B' }}
              >
                <svg className="w-5 h-5 text-[#174A8B]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
                {t('hero.cta1')}
              </Link>
              <Link
                href="/public-help/submit-complaint"
                className="px-6 py-3.5 rounded-lg font-semibold text-sm transition-all border-2 border-white/60 hover:bg-white/10 inline-flex items-center justify-center gap-2"
                style={{ color: '#FFFFFF' }}
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                {t('hero.cta2')}
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-6 mt-12 pt-8 border-t border-white/20">
              <div className="flex items-center gap-2 text-sm font-medium" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                <svg className="w-4 h-4 text-emerald-300" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                Verified Legal Information
              </div>
              <div className="flex items-center gap-2 text-sm font-medium" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                <svg className="w-4 h-4 text-emerald-300" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                Secure & Confidential
              </div>
              <div className="flex items-center gap-2 text-sm font-medium" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                <svg className="w-4 h-4 text-emerald-300" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
                </svg>
                Available in English & Hindi
              </div>
            </div>
          </div>
        </div>

        {/* Decorative element */}
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-10 hidden lg:block">
          <svg viewBox="0 0 400 600" fill="none" className="h-full w-full">
            <circle cx="350" cy="200" r="250" stroke="white" strokeWidth="0.5" />
            <circle cx="350" cy="200" r="200" stroke="white" strokeWidth="0.5" />
            <circle cx="350" cy="200" r="150" stroke="white" strokeWidth="0.5" />
            <circle cx="350" cy="200" r="100" stroke="white" strokeWidth="0.5" />
          </svg>
        </div>
      </section>

      {/* ─── INTRODUCTION SECTION ─── */}
      <section className="section py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div>
              <span className="badge mb-4 inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#EAF3FC] text-[#174A8B]">{t('intro.badge')}</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#102A43] mb-6">{t('intro.title')}</h2>
              <p className="text-base sm:text-lg mb-4 text-[#64748B] leading-relaxed">
                {t('intro.description')}
              </p>
              <p className="mb-8 text-[#64748B] leading-relaxed">
                {t('intro.experience')}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8 p-6 rounded-xl border border-[#DCE5EF] bg-[#F6F9FC]">
                <div className="text-center">
                  <div className="text-3xl font-bold font-serif text-[#174A8B]">10+</div>
                  <div className="text-xs mt-1 font-medium text-[#64748B]">Practice Areas</div>
                </div>
                <div className="text-center border-x border-[#DCE5EF]">
                  <div className="text-3xl font-bold font-serif text-[#174A8B]">500+</div>
                  <div className="text-xs mt-1 font-medium text-[#64748B]">Resources</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold font-serif text-[#174A8B]">24/7</div>
                  <div className="text-xs mt-1 font-medium text-[#64748B]">Online Access</div>
                </div>
              </div>

              <Link href="/about" className="btn btn-primary px-6 py-3">
                {t('intro.cta')}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

            {/* Visual */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-[#DCE5EF] bg-white">
                <div className="p-8 sm:p-10 flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <img
                      src="/images/arjun-panwar.jpg"
                      alt="Advocate Arjun Panwar"
                      className="w-32 h-40 rounded-2xl object-cover shadow-xl border-4 border-white ring-4 ring-[#174A8B]/15"
                    />
                    <img
                      src="/images/logo.png"
                      alt="Official Chambers Seal"
                      className="w-12 h-12 rounded-full border-2 border-white shadow-md absolute -bottom-3 -right-3 bg-white"
                      title="Verified Legal Chambers Seal"
                    />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[#102A43] mb-1">
                    Adv. Arjun Panwar
                  </h3>
                  <p className="text-xs uppercase tracking-wider font-semibold text-[#174A8B] mb-3">
                    Law • Justice • Solutions
                  </p>
                  <p className="text-sm text-[#64748B] max-w-sm mb-6 leading-relaxed">
                    Providing dedicated courtroom advocacy, strategic legal advisory, and plain-language assistance to citizens across India.
                  </p>
                  <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                    {['Bar Council Enrolled', 'Pro Bono Initiatives', 'Legal Education', 'Community Service'].map((item) => (
                      <div key={item} className="flex items-center gap-2.5 text-xs font-semibold px-3.5 py-2.5 rounded-lg bg-[#EAF3FC] text-[#174A8B] border border-[#174A8B]/15">
                        <svg className="w-4 h-4 text-[#059669] shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRACTICE AREAS ─── */}
      <section className="section section-alt py-20 bg-[#F6F9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="badge mb-3 inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#EAF3FC] text-[#174A8B]">{t('practice.badge')}</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#102A43] mb-4 text-center">{t('practice.title')}</h2>
            <p className="text-base sm:text-lg text-[#64748B] text-center leading-relaxed">
              {t('practice.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {practiceAreas.map((area) => (
              <Link
                key={area.key}
                href={`/practice-areas/${area.key}`}
                className="bg-white rounded-xl p-6 border border-[#DCE5EF] hover:border-[#174A8B]/40 hover:shadow-md transition-all group text-center flex flex-col items-center justify-between"
              >
                <div>
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 bg-[#EAF3FC] text-[#174A8B] group-hover:bg-[#174A8B] group-hover:text-white">
                    {practiceIcons[area.icon]}
                  </div>
                  <h4 className="text-base font-serif font-bold mb-2 text-[#102A43] group-hover:text-[#174A8B] transition-colors">
                    {t(`practice.${area.key}`)}
                  </h4>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    {area.desc}
                  </p>
                </div>
                <span className="text-xs font-semibold text-[#174A8B] mt-4 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PUBLIC ASSISTANCE ─── */}
      <section className="section py-20 bg-[#102A43] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase bg-white/10 text-blue-200 border border-white/20 mb-3">
              {t('assistance.badge')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4 text-center">{t('assistance.title')}</h2>
            <p className="text-base sm:text-lg text-blue-100/80 text-center leading-relaxed">
              {t('assistance.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Complaint Card */}
            <Link href="/public-help/submit-complaint" className="group block p-7 rounded-2xl border border-white/15 bg-white/5 transition-all duration-300 hover:border-white/30 hover:bg-white/10">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-[#174A8B] text-white">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-bold text-white mb-2">
                {t('assistance.complaint.title')}
              </h3>
              <p className="text-sm text-blue-100/70 mb-5 leading-relaxed">{t('assistance.complaint.desc')}</p>
              <span className="text-sm font-semibold text-blue-200 group-hover:text-white transition-colors inline-flex items-center gap-1.5">
                Submit Grievance
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </Link>

            {/* Petitions Card */}
            <Link href="/petitions" className="group block p-7 rounded-2xl border border-white/15 bg-white/5 transition-all duration-300 hover:border-white/30 hover:bg-white/10">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-[#174A8B] text-white">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-bold text-white mb-2">
                {t('assistance.petitions.title')}
              </h3>
              <p className="text-sm text-blue-100/70 mb-5 leading-relaxed">{t('assistance.petitions.desc')}</p>
              <span className="text-sm font-semibold text-blue-200 group-hover:text-white transition-colors inline-flex items-center gap-1.5">
                Explore Civic Petitions
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </Link>

            {/* Resources Card */}
            <Link href="/resources" className="group block p-7 rounded-2xl border border-white/15 bg-white/5 transition-all duration-300 hover:border-white/30 hover:bg-white/10">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-[#174A8B] text-white">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-bold text-white mb-2">
                {t('assistance.resources.title')}
              </h3>
              <p className="text-sm text-white/60 mb-4">{t('assistance.resources.desc')}</p>
              <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors inline-flex items-center gap-1">
                Browse Resources
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </Link>
          </div>

          <div className="p-4 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <p className="text-xs text-white/50 flex items-center justify-center gap-2">
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
              {t('assistance.disclaimer')}
            </p>
          </div>
        </div>
      </section>

      {/* ─── LATEST INSIGHTS ─── */}
      <section className="section py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="badge mb-3 inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#EAF3FC] text-[#174A8B]">{t('insights.badge')}</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#102A43] mb-2">{t('insights.title')}</h2>
              <p className="text-base sm:text-lg text-[#64748B]">
                {t('insights.subtitle')}
              </p>
            </div>
            <Link href="/blog" className="px-5 py-2.5 rounded-lg border border-[#DCE5EF] text-[#174A8B] hover:bg-[#EAF3FC] text-xs font-semibold whitespace-nowrap transition-colors inline-flex items-center gap-1.5 self-start md:self-auto">
              {t('insights.viewAll')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {demoArticles.map((article) => (
              <Link
                key={article.id}
                href={`/blog/${article.slug}`}
                className="bg-white rounded-xl overflow-hidden border border-[#DCE5EF] hover:border-[#174A8B]/40 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                {/* Article Header Bar */}
                <div className="h-32 flex items-center justify-center relative p-6" style={{ background: 'linear-gradient(135deg, #EAF3FC 0%, #DCE5EF 100%)' }}>
                  <div className="w-12 h-12 rounded-xl bg-white shadow-xs flex items-center justify-center text-[#174A8B] group-hover:scale-105 transition-transform">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                    </svg>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EAF3FC] text-[#174A8B]">{article.category}</span>
                      <span className="text-xs text-[#64748B]">
                        {article.readTime} {t('insights.readTime')}
                      </span>
                    </div>
                    <h3 className="text-lg font-serif font-bold text-[#102A43] group-hover:text-[#174A8B] transition-colors mb-2 leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-xs text-[#64748B] mb-4 line-clamp-2 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-[#DCE5EF]/60 mt-auto">
                    <time className="text-xs text-[#64748B]">
                      {new Date(article.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </time>
                    <span className="text-xs font-semibold text-[#174A8B] group-hover:text-[#102A43] inline-flex items-center gap-1">
                      {t('insights.readArticle')}
                      <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED RESOURCES ─── */}
      <section className="section py-20 bg-[#F6F9FC] border-t border-[#DCE5EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="badge mb-3 inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#EAF3FC] text-[#174A8B]">{t('featuredResources.badge')}</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#102A43] mb-4 text-center">{t('featuredResources.title')}</h2>
            <p className="text-base sm:text-lg text-[#64748B] text-center max-w-2xl mx-auto leading-relaxed">
              {t('featuredResources.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredResources.map((resource) => (
              <Link
                key={resource.title}
                href="/resources"
                className="bg-white rounded-xl p-5 border border-[#DCE5EF] hover:border-[#174A8B]/40 hover:shadow-sm transition-all group flex items-start gap-4"
              >
                <span className="text-2xl shrink-0 p-2 rounded-lg bg-[#F6F9FC] border border-[#DCE5EF]">{resource.icon}</span>
                <div>
                  <h4 className="text-sm font-serif font-bold mb-1 text-[#102A43] group-hover:text-[#174A8B] transition-colors leading-snug">
                    {resource.title}
                  </h4>
                  <span className="text-xs text-[#64748B] font-medium">{resource.category}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="section py-20 bg-white border-t border-[#DCE5EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="badge mb-3 inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#EAF3FC] text-[#174A8B]">{t('howItWorks.badge')}</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#102A43] mb-4 text-center">{t('howItWorks.title')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { num: '01', titleKey: 'howItWorks.step1.title', descKey: 'howItWorks.step1.desc', icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              )},
              { num: '02', titleKey: 'howItWorks.step2.title', descKey: 'howItWorks.step2.desc', icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              )},
              { num: '03', titleKey: 'howItWorks.step3.title', descKey: 'howItWorks.step3.desc', icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )},
            ].map((step) => (
              <div key={step.num} className="text-center relative p-6 rounded-xl bg-[#F6F9FC] border border-[#DCE5EF]">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center bg-[#EAF3FC] text-[#174A8B] shadow-xs">
                  {step.icon}
                </div>
                <span className="text-xs font-bold tracking-widest uppercase mb-2 block text-[#174A8B]">
                  Step {step.num}
                </span>
                <h3 className="text-lg font-serif font-bold text-[#102A43] mb-2">
                  {t(step.titleKey)}
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  {t(step.descKey)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 p-4 rounded-xl text-center max-w-2xl mx-auto bg-[#F6F9FC] border border-[#DCE5EF]">
            <p className="text-xs text-[#64748B] flex items-center justify-center gap-1.5">
              <svg className="w-4 h-4 text-[#174A8B] shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
              {t('howItWorks.note')}
            </p>
          </div>
        </div>
      </section>

      {/* ─── CTA SECTION ─── */}
      <section className="py-20 bg-[#EAF3FC] border-t border-[#DCE5EF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#102A43] mb-4 text-center">
            Need Legal Information or Assistance?
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] mb-8 max-w-xl mx-auto text-center leading-relaxed">
            Whether you need verified legal resources, want to submit a grievance, or require chambers consultation — our legal portal is at your service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-lg bg-[#174A8B] hover:bg-[#102A43] text-white font-semibold text-sm transition-colors shadow-md inline-flex items-center justify-center gap-2"
            >
              Contact Chambers
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="/public-help/submit-complaint"
              className="px-8 py-3.5 rounded-lg bg-white border-2 border-[#174A8B] text-[#174A8B] hover:bg-white/80 font-semibold text-sm transition-colors shadow-xs inline-flex items-center justify-center"
            >
              Submit Citizen Grievance
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
