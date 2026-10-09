import ClientLayout from '@/components/ClientLayout';
import Link from 'next/link';
import db from '@/lib/db';
import { Award, BookOpen, Calendar, CheckCircle2, ChevronRight, FileText, Gavel, Scale, ShieldAlert } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function OurWorkPage() {
  const caseStudies = db.prepare('SELECT * FROM case_studies WHERE is_published = 1 ORDER BY id ASC').all() as any[];

  return (
    <ClientLayout>
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#102A43] to-[#174A8B] text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/10 text-blue-200 border border-white/20 mb-6">
              <Gavel className="w-3.5 h-3.5" />
              Educational Case Studies
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight mb-6">
              Our Work & Landmark Case Analyses
            </h1>
            <p className="text-lg sm:text-xl text-blue-100/90 leading-relaxed font-light">
              Anonymized, educational examinations of key legal issues, judicial strategies, and constitutional principles adjudicated before Indian courts and tribunals.
            </p>
          </div>
        </div>
      </section>

      {/* Compliance Disclaimer Banner */}
      <section className="bg-[#EAF3FC] border-y border-[#DCE5EF] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-start sm:items-center gap-3 text-xs sm:text-sm text-[#263445]">
          <ShieldAlert className="w-5 h-5 text-[#174A8B] shrink-0 mt-0.5 sm:mt-0" />
          <p>
            <strong>Bar Council of India Rule 36 Compliance Notice:</strong> The case studies below are strictly anonymized for academic and public legal education. They do not constitute case outcome guarantees, advertisements, testimonials, or commercial solicitation.
          </p>
        </div>
      </section>

      {/* Case Studies List */}
      <section className="py-16 bg-[#F6F9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {caseStudies.map((study, idx) => (
              <div
                key={study.slug || idx}
                className="bg-white rounded-xl p-8 sm:p-10 border border-[#DCE5EF] shadow-sm hover:border-[#174A8B]/30 hover:shadow-md transition-all"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DCE5EF] pb-6 mb-6">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#EAF3FC] text-[#174A8B] uppercase tracking-wider mb-2">
                      {study.subject_matter}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#102A43]">
                      {study.title}
                    </h2>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#64748B] bg-[#F6F9FC] px-3 py-1.5 rounded-lg border border-[#DCE5EF]">
                    <Calendar className="w-4 h-4 text-[#174A8B]" />
                    <span>Adjudicated: {study.date}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column: Issue & Principles */}
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B] mb-2 flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-[#174A8B]" />
                        The Legal Issue
                      </h3>
                      <p className="text-sm sm:text-base text-[#263445] leading-relaxed">
                        {study.legal_issue}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B] mb-2 flex items-center gap-1.5">
                        <Scale className="w-4 h-4 text-[#174A8B]" />
                        Applicable Legal Principles
                      </h3>
                      <p className="text-sm text-[#263445] bg-[#F6F9FC] p-4 rounded-lg border border-[#DCE5EF]/60 leading-relaxed font-medium">
                        {study.principles}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748B] mb-2 flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-[#174A8B]" />
                        Procedural Approach
                      </h3>
                      <p className="text-sm text-[#64748B] leading-relaxed">
                        {study.approach}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Outcome & Key Takeaway */}
                  <div className="bg-[#EAF3FC]/50 rounded-xl p-6 border border-[#174A8B]/20 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#174A8B] mb-3">
                        <CheckCircle2 className="w-5 h-5 text-[#059669]" />
                        Judicial Outcome
                      </div>
                      <p className="text-sm text-[#263445] leading-relaxed font-medium">
                        {study.outcome}
                      </p>
                    </div>

                    <div className="mt-6 pt-6 border-t border-[#174A8B]/10">
                      <p className="text-xs text-[#64748B] leading-relaxed">
                        *Facts anonymized to protect confidentiality pursuant to the Advocates Act and applicable privacy standards.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Need help box */}
          <div className="mt-16 bg-white rounded-xl p-8 sm:p-10 border border-[#DCE5EF] text-center max-w-3xl mx-auto shadow-sm">
            <h3 className="text-2xl font-serif font-bold text-[#102A43] mb-3">
              Facing a Similar Dispute or Grievance?
            </h3>
            <p className="text-[#64748B] text-sm mb-6 leading-relaxed">
              Explore our verified resources or submit a grievance for initial guidance on appropriate legal recourse.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/resources"
                className="px-6 py-2.5 rounded-lg bg-[#174A8B] hover:bg-[#102A43] text-white font-medium text-sm transition-colors shadow-sm"
              >
                Browse Legal Resources
              </Link>
              <Link
                href="/public-help/submit-complaint"
                className="px-6 py-2.5 rounded-lg border border-[#DCE5EF] text-[#263445] hover:bg-[#F6F9FC] font-medium text-sm transition-colors"
              >
                Submit Citizen Grievance
              </Link>
            </div>
          </div>
        </div>
      </section>
    </ClientLayout>
  );
}
