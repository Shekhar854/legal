import ClientLayout from '@/components/ClientLayout';
import Link from 'next/link';
import db from '@/lib/db';
import { ArrowRight, Briefcase, FileCheck, Gavel, Home, Lock, Scale, ShieldCheck, Users } from 'lucide-react';

export const dynamic = 'force-dynamic';

const iconMap: Record<string, any> = {
  Scale,
  Briefcase,
  ShieldCheck,
  Home,
  Users,
  Lock,
};

export default function PracticeAreasPage() {
  const practiceAreas = db.prepare('SELECT * FROM practice_areas ORDER BY id ASC').all() as any[];

  return (
    <ClientLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#102A43] to-[#174A8B] text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/10 text-blue-200 border border-white/20 mb-6">
              <Scale className="w-3.5 h-3.5" />
              Legal Chambers Directory
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight mb-6">
              Practice Areas & Legal Representation
            </h1>
            <p className="text-lg sm:text-xl text-blue-100/90 leading-relaxed font-light">
              Strategic counsel, courtroom advocacy, and plain-language guidance across high-impact branches of Indian law.
            </p>
          </div>
        </div>
      </section>

      {/* Grid of Practice Areas */}
      <section className="py-16 bg-[#F6F9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-serif font-bold text-[#102A43] mb-4">
              Comprehensive Legal Services
            </h2>
            <p className="text-[#64748B] text-base">
              Each discipline is approached with meticulous statutory diligence, transparent fee structures, and strict adherence to Bar Council professional standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {practiceAreas.map((area) => {
              const IconComp = iconMap[area.icon] || Scale;
              let faqs: any[] = [];
              try {
                faqs = JSON.parse(area.faqs_json || '[]');
              } catch {}

              return (
                <div
                  key={area.slug}
                  className="bg-white rounded-xl p-8 border border-[#DCE5EF] hover:border-[#174A8B]/40 hover:shadow-lg transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-14 h-14 rounded-xl bg-[#EAF3FC] text-[#174A8B] flex items-center justify-center mb-6 group-hover:bg-[#174A8B] group-hover:text-white transition-colors">
                      <IconComp className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-[#102A43] mb-2 group-hover:text-[#174A8B] transition-colors">
                      {area.title}
                    </h3>
                    {area.title_hi && (
                      <p className="text-xs text-[#174A8B] font-medium mb-3">
                        {area.title_hi}
                      </p>
                    )}
                    <p className="text-sm text-[#64748B] leading-relaxed mb-6">
                      {area.short_desc}
                    </p>

                    {area.key_laws && (
                      <div className="bg-[#F6F9FC] rounded-lg p-3.5 mb-6 border border-[#DCE5EF]/60 text-xs text-[#263445]">
                        <span className="font-semibold text-[#102A43] block mb-1">Key Statutes:</span>
                        <p className="text-[#64748B] line-clamp-2">{area.key_laws}</p>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-[#DCE5EF] flex items-center justify-between">
                    <Link
                      href={`/practice-areas/${area.slug}`}
                      className="inline-flex items-center text-sm font-semibold text-[#174A8B] hover:text-[#102A43] gap-1.5 transition-colors"
                    >
                      View Full Details
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <span className="text-xs text-[#64748B]">
                      {faqs.length} FAQs
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Need help deciding box */}
          <div className="mt-16 bg-white rounded-xl p-8 sm:p-10 border border-[#DCE5EF] shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h3 className="text-2xl font-serif font-bold text-[#102A43] mb-3">
                Unsure which legal area applies to your issue?
              </h3>
              <p className="text-[#64748B] text-sm leading-relaxed">
                Submit an inquiry or a citizen complaint via our guided portal. We will review the facts and direct you to the appropriate statutory body, legal aid, or counsel.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 shrink-0">
              <Link
                href="/public-help/submit-complaint"
                className="px-6 py-3 rounded-lg bg-[#174A8B] hover:bg-[#102A43] text-white font-medium text-sm transition-colors shadow-sm"
              >
                Submit Citizen Grievance
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-lg border border-[#DCE5EF] text-[#263445] hover:bg-[#F6F9FC] font-medium text-sm transition-colors"
              >
                Chambers Inquiry
              </Link>
            </div>
          </div>
        </div>
      </section>
    </ClientLayout>
  );
}
