import ClientLayout from '@/components/ClientLayout';
import Link from 'next/link';
import db from '@/lib/db';
import { notFound } from 'next/navigation';
import { ArrowLeft, BookOpen, CheckCircle, FileText, HelpCircle, Scale, Shield } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function PracticeAreaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const area = db.prepare('SELECT * FROM practice_areas WHERE slug = ?').get(slug) as any;

  if (!area) {
    notFound();
  }

  let faqs: any[] = [];
  try {
    faqs = JSON.parse(area.faqs_json || '[]');
  } catch {}

  return (
    <ClientLayout>
      {/* Header */}
      <section className="bg-gradient-to-b from-[#102A43] to-[#174A8B] text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/practice-areas"
            className="inline-flex items-center gap-2 text-sm text-blue-200 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Practice Areas
          </Link>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/10 text-blue-200 border border-white/20 mb-4">
              <Scale className="w-3.5 h-3.5" />
              Legal Practice Area
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight mb-4">
              {area.title}
            </h1>
            {area.title_hi && (
              <p className="text-xl text-blue-200 font-serif mb-4">
                {area.title_hi}
              </p>
            )}
            <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed font-light">
              {area.short_desc}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-[#F6F9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Main Column */}
            <div className="lg:col-span-8 space-y-10">
              {/* Detailed Overview */}
              <div className="bg-white rounded-xl p-8 sm:p-10 border border-[#DCE5EF] shadow-sm">
                <h2 className="text-2xl font-serif font-bold text-[#102A43] mb-6 flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-[#174A8B]" />
                  Statutory Overview & Judicial Scope
                </h2>
                <div className="prose prose-slate max-w-none text-[#263445] leading-relaxed space-y-4">
                  <p className="text-base sm:text-lg text-[#263445]">
                    {area.overview}
                  </p>
                </div>

                {area.key_laws && (
                  <div className="mt-8 p-5 rounded-lg bg-[#EAF3FC]/60 border border-[#174A8B]/20">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#174A8B] mb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Governing Indian Acts & Statutes
                    </h3>
                    <p className="text-sm text-[#263445] leading-relaxed font-medium">
                      {area.key_laws}
                    </p>
                  </div>
                )}
              </div>

              {/* FAQs Section */}
              {faqs.length > 0 && (
                <div className="bg-white rounded-xl p-8 sm:p-10 border border-[#DCE5EF] shadow-sm">
                  <h2 className="text-2xl font-serif font-bold text-[#102A43] mb-6 flex items-center gap-3">
                    <HelpCircle className="w-6 h-6 text-[#174A8B]" />
                    Frequently Asked Legal Questions
                  </h2>
                  <div className="space-y-6">
                    {faqs.map((faq: any, idx: number) => (
                      <div key={idx} className="border-b border-[#DCE5EF] pb-6 last:border-0 last:pb-0">
                        <h3 className="text-base font-bold text-[#102A43] mb-2">
                          Q: {faq.q}
                        </h3>
                        <p className="text-sm text-[#64748B] leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-4 space-y-6">
              {/* Consultation Card */}
              <div className="bg-white rounded-xl p-6 sm:p-8 border border-[#DCE5EF] shadow-sm">
                <h3 className="text-lg font-serif font-bold text-[#102A43] mb-2">
                  Need Legal Counsel in this Domain?
                </h3>
                <p className="text-xs text-[#64748B] mb-6 leading-relaxed">
                  Our chambers provide strategic advisory, pre-litigation notices, and representation before appropriate forums.
                </p>
                <div className="space-y-3">
                  <Link
                    href="/contact"
                    className="w-full inline-flex justify-center items-center px-4 py-2.5 rounded-lg bg-[#174A8B] hover:bg-[#102A43] text-white font-medium text-sm transition-colors shadow-sm"
                  >
                    Contact Chambers
                  </Link>
                  <Link
                    href="/public-help/submit-complaint"
                    className="w-full inline-flex justify-center items-center px-4 py-2.5 rounded-lg border border-[#DCE5EF] text-[#263445] hover:bg-[#F6F9FC] font-medium text-sm transition-colors"
                  >
                    Submit Citizen Grievance
                  </Link>
                </div>
              </div>

              {/* BCI Disclaimer */}
              <div className="bg-[#EAF3FC]/50 rounded-xl p-5 border border-[#174A8B]/15 text-xs text-[#263445] leading-relaxed">
                <span className="font-semibold block mb-1 text-[#174A8B]">Professional Disclaimer:</span>
                The information provided on this page constitutes general legal educational material under Bar Council of India guidelines. Reading this information does not establish a lawyer-client relationship.
              </div>
            </div>

          </div>
        </div>
      </section>
    </ClientLayout>
  );
}
