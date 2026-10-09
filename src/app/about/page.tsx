'use client';

import ClientLayout from '@/components/ClientLayout';
import Link from 'next/link';
import { useLocale } from '@/contexts/LocaleContext';
import { Award, BookOpen, Building, CheckCircle, FileText, Gavel, Scale, Shield, User } from 'lucide-react';

export default function AboutPage() {
  const { t, locale } = useLocale();

  return (
    <ClientLayout>
      {/* Hero / Header Section */}
      <section className="bg-gradient-to-b from-[#102A43] to-[#174A8B] text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/10 text-blue-200 border border-white/20 mb-6">
              <Shield className="w-3.5 h-3.5" />
              Chambers & Professional Profile
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight mb-6">
              Advocate Arjun Panwar
            </h1>
            <p className="text-lg sm:text-xl text-blue-100/90 leading-relaxed font-light">
              Dedicated to constitutional justice, consumer protection, and making legal remedies accessible to every citizen across India.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-[#F6F9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Sidebar / Quick Credentials */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-[#DCE5EF] text-center">
                <div className="relative mb-6 inline-block">
                  <div className="relative">
                    <img
                      src="/images/arjun-panwar.jpg"
                      alt="Advocate Arjun Panwar"
                      className="w-36 h-48 rounded-2xl object-cover shadow-xl border-4 border-white ring-4 ring-[#174A8B]/15 mx-auto"
                    />
                    <img
                      src="/images/logo.png"
                      alt="Official Chambers Seal"
                      className="w-12 h-12 rounded-full border-2 border-white shadow-md absolute -bottom-3 -right-3 bg-white"
                      title="Verified Legal Chambers Seal"
                    />
                  </div>
                </div>
                <h2 className="text-2xl font-serif font-bold text-center text-[#102A43] mb-1">
                  Adv. Arjun Panwar
                </h2>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#174A8B] mb-2">
                  Law • Justice • Solutions
                </p>
                <p className="text-xs text-center text-[#64748B] mb-6">
                  Advocate, High Court of Delhi & Supreme Court of India
                </p>

                <div className="border-t border-[#DCE5EF] pt-6 space-y-4 text-sm">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#64748B] font-semibold block mb-1">Bar Enrolment</span>
                    <p className="font-medium text-[#263445]">D/1428/2012 (Bar Council of Delhi)</p>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#64748B] font-semibold block mb-1">Education</span>
                    <p className="font-medium text-[#263445]">B.A. LL.B. (Hons.), National Law School</p>
                    <p className="text-xs text-[#64748B] mt-0.5">LL.M. in Constitutional Law</p>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#64748B] font-semibold block mb-1">Memberships</span>
                    <p className="font-medium text-[#263445]">Delhi High Court Bar Association</p>
                    <p className="font-medium text-[#263445]">Supreme Court Bar Association (Associate)</p>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#64748B] font-semibold block mb-1">Primary Jurisdiction</span>
                    <p className="font-medium text-[#263445]">New Delhi & Pan-India Appellate Matters</p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#DCE5EF]">
                  <Link
                    href="/contact"
                    className="w-full inline-flex justify-center items-center px-4 py-2.5 rounded-lg bg-[#174A8B] hover:bg-[#102A43] text-white font-medium text-sm transition-colors shadow-sm"
                  >
                    Schedule Chambers Consultation
                  </Link>
                </div>
              </div>

              {/* BCI Compliance Note */}
              <div className="bg-[#EAF3FC]/60 rounded-xl p-5 border border-[#174A8B]/20 text-xs text-[#263445] leading-relaxed">
                <span className="font-semibold block mb-1 text-[#174A8B]">BCI Rule 36 Statement:</span>
                This biographical overview is published strictly for informational and compliance purposes pursuant to the rules framed by the Bar Council of India. It does not constitute advertising or solicitation.
              </div>
            </div>

            {/* Right Main Column */}
            <div className="lg:col-span-8 space-y-10">
              
              {/* Professional Background */}
              <div className="bg-white rounded-xl p-8 sm:p-10 shadow-sm border border-[#DCE5EF]">
                <h3 className="text-2xl font-serif font-bold text-[#102A43] mb-6 flex items-center gap-3">
                  <User className="w-6 h-6 text-[#174A8B]" />
                  Professional Background
                </h3>
                <div className="prose prose-slate max-w-none text-[#263445] leading-relaxed space-y-4">
                  <p>
                    Advocate Arjun Panwar has over 14 years of standing at the bar, focusing extensively on constitutional litigation, public-interest advocacy, civil property adjudication, and consumer protection.
                  </p>
                  <p>
                    Over the past decade, he has represented individuals, residential welfare associations, consumer groups, and marginalized citizens before the High Court of Delhi, National Consumer Disputes Redressal Commission (NCDRC), National Green Tribunal (NGT), and the Supreme Court of India.
                  </p>
                  <p>
                    Firmly believing that knowledge of the law is a fundamental citizen entitlement, he founded <strong>Legal Arjun</strong> as a hybrid platform — providing formal legal representation for complex disputes while offering ordinary citizens free, verified legal resources and grievance guidance in both English and Hindi.
                  </p>
                </div>
              </div>

              {/* Practice Philosophy */}
              <div className="bg-white rounded-xl p-8 sm:p-10 shadow-sm border border-[#DCE5EF]">
                <h3 className="text-2xl font-serif font-bold text-[#102A43] mb-6 flex items-center gap-3">
                  <Scale className="w-6 h-6 text-[#174A8B]" />
                  Practice Philosophy & Core Commitments
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-5 rounded-lg bg-[#F6F9FC] border border-[#DCE5EF]">
                    <div className="w-10 h-10 rounded-lg bg-[#EAF3FC] text-[#174A8B] flex items-center justify-center mb-3">
                      <Shield className="w-5 h-5" />
                    </div>
                    <h4 className="font-serif font-bold text-[#102A43] mb-2">Uncompromising Ethics</h4>
                    <p className="text-sm text-[#64748B] leading-relaxed">
                      Rigorous adherence to the Advocates Act, 1961 and professional conduct standards. No unrealistic assurances or misleading representations.
                    </p>
                  </div>

                  <div className="p-5 rounded-lg bg-[#F6F9FC] border border-[#DCE5EF]">
                    <div className="w-10 h-10 rounded-lg bg-[#EAF3FC] text-[#174A8B] flex items-center justify-center mb-3">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <h4 className="font-serif font-bold text-[#102A43] mb-2">Plain Language First</h4>
                    <p className="text-sm text-[#64748B] leading-relaxed">
                      Translating dense legal procedures into clear, actionable advice that ordinary citizens can comprehend without intimidation.
                    </p>
                  </div>

                  <div className="p-5 rounded-lg bg-[#F6F9FC] border border-[#DCE5EF]">
                    <div className="w-10 h-10 rounded-lg bg-[#EAF3FC] text-[#174A8B] flex items-center justify-center mb-3">
                      <Gavel className="w-5 h-5" />
                    </div>
                    <h4 className="font-serif font-bold text-[#102A43] mb-2">Public Interest & Pro Bono</h4>
                    <p className="text-sm text-[#64748B] leading-relaxed">
                      A dedicated quota of chambers time allocated to legitimate public grievances, environmental protection, and free legal aid.
                    </p>
                  </div>

                  <div className="p-5 rounded-lg bg-[#F6F9FC] border border-[#DCE5EF]">
                    <div className="w-10 h-10 rounded-lg bg-[#EAF3FC] text-[#174A8B] flex items-center justify-center mb-3">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <h4 className="font-serif font-bold text-[#102A43] mb-2">Pragmatic Pre-Litigation</h4>
                    <p className="text-sm text-[#64748B] leading-relaxed">
                      Encouraging statutory dispute settlement, conciliation, and mediation before embarking on protracted, costly litigation.
                    </p>
                  </div>
                </div>
              </div>

              {/* Publications & Academic Engagements */}
              <div className="bg-white rounded-xl p-8 sm:p-10 shadow-sm border border-[#DCE5EF]">
                <h3 className="text-2xl font-serif font-bold text-[#102A43] mb-6 flex items-center gap-3">
                  <FileText className="w-6 h-6 text-[#174A8B]" />
                  Selected Publications & Speaking Engagements
                </h3>
                <div className="space-y-4">
                  <div className="border-l-2 border-[#174A8B] pl-4 py-1">
                    <h4 className="font-semibold text-[#102A43] text-base">
                      “The Evolution of Consumer Rights Under the 2019 Statute: Emerging Jurisprudence in E-Commerce”
                    </h4>
                    <p className="text-xs text-[#64748B] mt-1">National Law University Law Review (2024)</p>
                  </div>
                  <div className="border-l-2 border-[#174A8B] pl-4 py-1">
                    <h4 className="font-semibold text-[#102A43] text-base">
                      “Balancing Fundamental Privacy With Digital Law Enforcement Under the DPDP Act”
                    </h4>
                    <p className="text-xs text-[#64748B] mt-1">Delivered at Delhi Bar Council Continuing Legal Education Series (2025)</p>
                  </div>
                  <div className="border-l-2 border-[#174A8B] pl-4 py-1">
                    <h4 className="font-semibold text-[#102A43] text-base">
                      “Citizen Guide to Environmental Redressal before the National Green Tribunal”
                    </h4>
                    <p className="text-xs text-[#64748B] mt-1">Centre for Public Law & Policy Studies Monograph (2023)</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </ClientLayout>
  );
}
