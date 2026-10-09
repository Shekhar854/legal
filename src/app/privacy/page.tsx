import ClientLayout from '@/components/ClientLayout';
import { Lock, ShieldCheck, UserCheck } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <ClientLayout>
      <section className="bg-gradient-to-b from-[#102A43] to-[#174A8B] text-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/10 text-blue-200 border border-white/20 mb-4">
            <Lock className="w-3.5 h-3.5" />
            Digital Personal Data Protection Act, 2023
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight mb-4">
            Privacy Policy & Data Protection
          </h1>
          <p className="text-lg text-blue-100/90 leading-relaxed font-light">
            How Legal Arjun safeguards citizen personal information, grievance submissions, and public petition signatures.
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#F6F9FC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 sm:p-12 border border-[#DCE5EF] shadow-sm space-y-8 text-[#263445] leading-relaxed">
            
            <div className="space-y-4">
              <h2 className="text-xl font-serif font-bold text-[#102A43]">
                1. Commitment to Data Principal Privacy
              </h2>
              <p className="text-sm sm:text-base">
                Legal Arjun is committed to upholding the privacy rights of all visitors and citizens in compliance with the Digital Personal Data Protection Act, 2023 (DPDP Act) and the Information Technology Act, 2000. We process personal data solely on lawful grounds of specified consent and legitimate statutory uses.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-serif font-bold text-[#102A43]">
                2. Information We Collect
              </h2>
              <ul className="list-disc pl-5 text-sm sm:text-base space-y-2">
                <li><strong>Public Inquiry & Contact Data:</strong> Name, email address, contact phone number, and query details submitted through contact forms.</li>
                <li><strong>Grievance & Assistance Submissions:</strong> Citizen name, district, state, issue category, description, and contact preference. We explicitly instruct citizens NOT to upload banking credentials, PAN/Aadhaar cards, or sensitive passwords.</li>
                <li><strong>Public Petition Signatures:</strong> Full name, verified email, city, and state. We never publish email addresses or phone numbers on public petition pages.</li>
                <li><strong>Technical Logs:</strong> Minimal server logs (IP address, browser type) for security, rate-limiting, and abuse prevention.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-serif font-bold text-[#102A43]">
                3. Access Control & Strict Non-Disclosure
              </h2>
              <p className="text-sm sm:text-base">
                Complaint records are restricted exclusively to authorized legal reviewers under strict role-based access control (RBAC). We do not sell, rent, commercialize, or share user personal data with commercial advertisers or third-party marketing brokers under any circumstance.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-serif font-bold text-[#102A43]">
                4. Data Retention & Erasure Policy
              </h2>
              <p className="text-sm sm:text-base">
                Grievance records that do not transition into formal court retainer retainers are archived after 180 days and purged securely upon request. Under Section 12 of the DPDP Act, citizens may request correction or complete erasure of their personal data by contacting <code>privacy@legalarjun.com</code>.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-serif font-bold text-[#102A43]">
                5. Grievance Officer Contact
              </h2>
              <p className="text-sm sm:text-base">
                In compliance with the DPDP Act and IT Rules, our designated Data Protection Officer is:<br />
                <strong>Grievance Officer:</strong> Pooja Verma, Chambers Legal Secretariat<br />
                <strong>Email:</strong> grievance-officer@legalarjun.com<br />
                <strong>Chambers Address:</strong> Delhi High Court Complex, New Delhi — 110503
              </p>
            </div>

            <div className="pt-6 border-t border-[#DCE5EF] text-xs text-[#64748B]">
              <p>Last Updated: October 2026 | Reviewed for DPDP Act, 2023 Compliance</p>
            </div>

          </div>
        </div>
      </section>
    </ClientLayout>
  );
}
