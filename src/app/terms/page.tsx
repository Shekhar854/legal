import ClientLayout from '@/components/ClientLayout';
import { FileText, Shield } from 'lucide-react';

export default function TermsPage() {
  return (
    <ClientLayout>
      <section className="bg-gradient-to-b from-[#102A43] to-[#174A8B] text-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/10 text-blue-200 border border-white/20 mb-4">
            <FileText className="w-3.5 h-3.5" />
            Terms of Use
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight mb-4">
            Terms & Conditions of Service
          </h1>
          <p className="text-lg text-blue-100/90 leading-relaxed font-light">
            Guidelines governing user interaction, content accuracy, petition proposals, and portal assistance.
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#F6F9FC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 sm:p-12 border border-[#DCE5EF] shadow-sm space-y-8 text-[#263445] leading-relaxed">
            
            <div className="space-y-4">
              <h2 className="text-xl font-serif font-bold text-[#102A43]">
                1. Acceptance of Terms
              </h2>
              <p className="text-sm sm:text-base">
                By accessing or using the Legal Arjun website, you agree to be bound by these Terms of Use and our Bar Council of India Rule 36 Disclaimer. If you do not accept these terms, you should refrain from using the platform.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-serif font-bold text-[#102A43]">
                2. Acceptable Use of Public Petitions & Grievance Forms
              </h2>
              <p className="text-sm sm:text-base">
                Users agree not to submit false, fraudulent, defamatory, or abusive claims. The administrator reserves the right to reject, remove, or archive any petition or complaint that violates public decency, defames third parties, or promotes unlawful action.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-serif font-bold text-[#102A43]">
                3. Intellectual Property
              </h2>
              <p className="text-sm sm:text-base">
                All original commentary, articles, and educational materials published on this website are protected under Indian copyright law. Non-commercial quotation with appropriate attribution to Advocate Arjun Panwar and Legal Arjun is permitted.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-serif font-bold text-[#102A43]">
                4. Governing Law & Jurisdiction
              </h2>
              <p className="text-sm sm:text-base">
                These terms are governed by the laws of India. Any disputes arising in connection with the operation of this platform shall be subject to the exclusive jurisdiction of the competent courts in New Delhi.
              </p>
            </div>

            <div className="pt-6 border-t border-[#DCE5EF] text-xs text-[#64748B]">
              <p>Effective Date: October 2026</p>
            </div>

          </div>
        </div>
      </section>
    </ClientLayout>
  );
}
