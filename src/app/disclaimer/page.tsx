import ClientLayout from '@/components/ClientLayout';
import Link from 'next/link';
import { AlertTriangle, BookOpen, CheckCircle, Scale, Shield } from 'lucide-react';

export default function DisclaimerPage() {
  return (
    <ClientLayout>
      <section className="bg-gradient-to-b from-[#102A43] to-[#174A8B] text-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/10 text-blue-200 border border-white/20 mb-4">
            <Scale className="w-3.5 h-3.5" />
            Statutory & Professional Compliance
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight mb-4">
            Disclaimer & Regulatory Compliance
          </h1>
          <p className="text-lg text-blue-100/90 leading-relaxed font-light">
            In accordance with the statutory rules framed by the Bar Council of India under the Advocates Act, 1961.
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#F6F9FC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 sm:p-12 border border-[#DCE5EF] shadow-sm space-y-8 text-[#263445] leading-relaxed">
            
            <div className="p-6 rounded-xl bg-[#EAF3FC]/60 border border-[#174A8B]/20 flex items-start gap-3">
              <Shield className="w-6 h-6 text-[#174A8B] shrink-0 mt-1" />
              <div>
                <h2 className="text-lg font-serif font-bold text-[#102A43] mb-1">
                  Bar Council of India Rule 36 Statement
                </h2>
                <p className="text-sm text-[#263445]">
                  Under the rules of the Bar Council of India, an advocate is prohibited from soliciting work or advertising their practice directly or indirectly through any media.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-serif font-bold text-[#102A43]">
                1. Informational Purpose Only
              </h3>
              <p className="text-sm sm:text-base">
                The contents of this website (<strong>Legal Arjun</strong>) — including all legal guides, articles, case studies, practice area outlines, and answers to frequently asked questions — are made available solely for informational and public legal education purposes. The information provided herein does not constitute legal advice, solicitation, advertisement, personal communication, or an invitation to enter into an advocate-client relationship.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-serif font-bold text-[#102A43]">
                2. No Advocate-Client Relationship
              </h3>
              <p className="text-sm sm:text-base">
                Browsing this platform, downloading materials, submitting a contact inquiry, or filing a grievance form through the public portal does not create an advocate-client relationship between you and Advocate Arjun Panwar or any associate advocate. Confidentiality and legal privilege apply only after formal engagement and execution of a written Vakalatnama or retainer agreement.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-serif font-bold text-[#102A43]">
                3. Nature of the Public Assistance Portal
              </h3>
              <p className="text-sm sm:text-base">
                The public assistance and grievance submission features are designed strictly to facilitate citizen awareness of statutory grievance mechanisms (such as e-Daakhil, NCH, NALSA, or RTI). <strong>Submitting a grievance through this website does not constitute filing an FIR with the police, instituting a suit in a court of law, or lodging an official government petition.</strong>
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-serif font-bold text-[#102A43]">
                4. Anonymity and Case Studies
              </h3>
              <p className="text-sm sm:text-base">
                All descriptions of legal disputes and judicial outcomes published on this website are strictly anonymized for academic discourse and public awareness. Past outcomes in specific litigation do not guarantee similar results in future or other cases, as every legal matter depends uniquely on its own facts and statutory circumstances.
              </p>
            </div>

            <div className="pt-6 border-t border-[#DCE5EF] text-xs text-[#64748B]">
              <p>Effective Date: 1 January 2026 | Last Reviewed: October 2026 | Approved by Chambers Compliance Officer</p>
            </div>

          </div>
        </div>
      </section>
    </ClientLayout>
  );
}
