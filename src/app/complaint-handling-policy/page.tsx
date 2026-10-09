import ClientLayout from '@/components/ClientLayout';
import { CheckCircle2, Clock, FileText, HelpCircle, ShieldAlert, ShieldCheck } from 'lucide-react';

export default function ComplaintHandlingPolicyPage() {
  return (
    <ClientLayout>
      <section className="bg-gradient-to-b from-[#102A43] to-[#174A8B] text-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/10 text-blue-200 border border-white/20 mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            Public Service Standards
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight mb-4">
            Complaint Handling & Redressal Policy
          </h1>
          <p className="text-lg text-blue-100/90 leading-relaxed font-light">
            Transparent protocols, review stages, and referral mechanisms for citizen submissions on Legal Arjun.
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#F6F9FC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 sm:p-12 border border-[#DCE5EF] shadow-sm space-y-8 text-[#263445] leading-relaxed">
            
            <div className="p-6 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-xs sm:text-sm text-[#92400E] flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
              <p>
                <strong>Fundamental Principle:</strong> Legal Arjun does not act as an investigative police body or a court registry. We assist citizens in identifying official remedies, drafting statutory representations, and directing them to appropriate statutory forums (e.g. NCDRC, RERA, NALSA, or High Court).
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-serif font-bold text-[#102A43]">
                1. Six-Stage Grievance Workflow
              </h2>
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-[#F6F9FC] border border-[#DCE5EF]">
                  <span className="font-bold text-[#174A8B] text-sm block mb-1">Stage 1: Submitted (जमा किया गया)</span>
                  <p className="text-xs text-[#64748B]">Citizen receives an encrypted unique tracking reference number (e.g., LA-2026-XXXXX).</p>
                </div>

                <div className="p-4 rounded-xl bg-[#F6F9FC] border border-[#DCE5EF]">
                  <span className="font-bold text-[#174A8B] text-sm block mb-1">Stage 2: Under Review (समीक्षाधीन)</span>
                  <p className="text-xs text-[#64748B]">Chambers legal team reviews factual background to evaluate statutory limitation and jurisdiction.</p>
                </div>

                <div className="p-4 rounded-xl bg-[#F6F9FC] border border-[#DCE5EF]">
                  <span className="font-bold text-[#174A8B] text-sm block mb-1">Stage 3: More Information Required (अतिरिक्त जानकारी अपेक्षित)</span>
                  <p className="text-xs text-[#64748B]">If key dates, invoice documents, or notice trails are absent, reviewer notes are posted.</p>
                </div>

                <div className="p-4 rounded-xl bg-[#F6F9FC] border border-[#DCE5EF]">
                  <span className="font-bold text-[#174A8B] text-sm block mb-1">Stage 4: Referred to Appropriate Resource (उचित प्राधिकरण को निर्देशित)</span>
                  <p className="text-xs text-[#64748B]">Direct referral to official portals like e-Daakhil, NCH, State RERA, or NALSA Free Legal Aid cell.</p>
                </div>

                <div className="p-4 rounded-xl bg-[#F6F9FC] border border-[#DCE5EF]">
                  <span className="font-bold text-[#174A8B] text-sm block mb-1">Stage 5: Resolved / Counsel Engaged (समाधान / परामर्श संपन्न)</span>
                  <p className="text-xs text-[#64748B]">Citizen has been provided with a statutory action pathway, formal notice template, or chambers consultation.</p>
                </div>

                <div className="p-4 rounded-xl bg-[#F6F9FC] border border-[#DCE5EF]">
                  <span className="font-bold text-[#174A8B] text-sm block mb-1">Stage 6: Closed (बंद किया गया)</span>
                  <p className="text-xs text-[#64748B]">Grievance resolved or closed due to citizen inactivity following guidance.</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-serif font-bold text-[#102A43]">
                2. Privacy & Data Minimization
              </h2>
              <p className="text-sm sm:text-base">
                Complaint records are protected under role-based access control. Only designated Complaint Managers and Legal Reviewers hold permission to view grievance entries. We do not expose citizen names or contact info on public portals.
              </p>
            </div>

            <div className="pt-6 border-t border-[#DCE5EF] text-xs text-[#64748B]">
              <p>Chambers Ombudsman: Adv. Arjun Panwar | Inquiries: <code>complaints-desk@legalarjun.com</code></p>
            </div>

          </div>
        </div>
      </section>
    </ClientLayout>
  );
}
