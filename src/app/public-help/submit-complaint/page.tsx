'use client';

import { useState } from 'react';
import ClientLayout from '@/components/ClientLayout';
import Link from 'next/link';
import { AlertCircle, CheckCircle2, Copy, FileText, HelpCircle, Lock, ShieldAlert, ShieldCheck } from 'lucide-react';

const indianStates = [
  'Delhi NCR', 'Andhra Pradesh', 'Assam', 'Bihar', 'Chandigarh', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Odisha', 'Punjab', 'Rajasthan',
  'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

const complaintCategories = [
  'Consumer-related issue (Defective goods, service deficiency)',
  'Property-related issue (Builder delay, illegal surcharge, tenancy)',
  'Employment-related issue (Gratuity, wrongful termination, POSH)',
  'Public-service grievance (Civic road hazard, municipality negligence)',
  'General legal information request',
  'Other civil grievance'
];

export default function SubmitComplaintPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    contactMethod: 'email',
    state: 'Delhi NCR',
    district: '',
    category: complaintCategories[0],
    subject: '',
    description: '',
    incidentDate: '',
    consent: false,
  });

  const [submitting, setSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.fullName || !formData.district || !formData.subject || !formData.description) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    if (!formData.consent) {
      setErrorMsg('You must check the consent and disclaimer acknowledgment.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Submission failed');
      }

      setSubmittedRef(data.refNumber);
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const copyRef = () => {
    if (submittedRef) {
      navigator.clipboard.writeText(submittedRef);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <ClientLayout>
      {/* Header */}
      <section className="bg-gradient-to-b from-[#102A43] to-[#174A8B] text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/10 text-blue-200 border border-white/20 mb-6">
              <ShieldCheck className="w-3.5 h-3.5" />
              Citizen Legal Assistance Portal
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight mb-4">
              Submit Grievance or Legal Query
            </h1>
            <p className="text-lg sm:text-xl text-blue-100/90 leading-relaxed font-light">
              Receive structured guidance on statutory remedies, official portal filings (e-Daakhil, NCH, NALSA), and appropriate legal recourse.
            </p>
          </div>
        </div>
      </section>

      {/* Mandatory Safeguard & Notice Bar */}
      <section className="bg-[#FFFBEB] border-y border-[#FDE68A] py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-start gap-3.5 text-xs sm:text-sm text-[#92400E]">
          <ShieldAlert className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold text-[#78350F]">
              Important Citizen Notice (महत्वपूर्ण सूचना):
            </p>
            <p className="leading-relaxed">
              Submitting a grievance through this portal <strong>does not constitute filing an official FIR with the Police, a formal lawsuit in Court, or an official Government statutory grievance</strong>. For life-threatening emergencies, call 112 immediately. Do not submit sensitive bank passwords, OTPs, or unnecessary identity numbers.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 bg-[#F6F9FC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {submittedRef ? (
            /* Success Card */
            <div className="bg-white rounded-2xl p-8 sm:p-12 border border-[#DCE5EF] shadow-md text-center">
              <div className="w-16 h-16 rounded-full bg-[#ECFDF5] text-[#059669] flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#102A43] mb-3">
                Grievance Recorded Successfully
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] max-w-xl mx-auto mb-8 leading-relaxed">
                Your submission has been securely encrypted and assigned to our legal review desk. Keep your unique reference number safe for status tracking.
              </p>

              <div className="bg-[#F6F9FC] border border-[#DCE5EF] rounded-xl p-6 max-w-md mx-auto mb-8">
                <span className="text-xs uppercase tracking-wider text-[#64748B] font-semibold block mb-2">
                  Your Unique Tracking Reference
                </span>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-2xl sm:text-3xl font-mono font-bold text-[#174A8B] tracking-wider">
                    {submittedRef}
                  </span>
                  <button
                    onClick={copyRef}
                    className="p-2 rounded-lg bg-white border border-[#DCE5EF] text-[#263445] hover:text-[#174A8B] transition-colors cursor-pointer"
                    title="Copy Reference Number"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                </div>
                {copied && <span className="text-xs text-[#059669] font-medium mt-2 block">Copied to clipboard!</span>}
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/public-help/track-submission"
                  className="px-6 py-3 rounded-lg bg-[#174A8B] text-white text-sm font-semibold hover:bg-[#102A43] shadow-sm transition-colors"
                >
                  Track Submission Status
                </Link>
                <button
                  onClick={() => {
                    setSubmittedRef(null);
                    setFormData({
                      fullName: '',
                      email: '',
                      phone: '',
                      contactMethod: 'email',
                      state: 'Delhi NCR',
                      district: '',
                      category: complaintCategories[0],
                      subject: '',
                      description: '',
                      incidentDate: '',
                      consent: false,
                    });
                  }}
                  className="px-6 py-3 rounded-lg border border-[#DCE5EF] text-[#263445] text-sm font-semibold hover:bg-[#F6F9FC] transition-colors"
                >
                  Submit Another Grievance
                </button>
              </div>
            </div>
          ) : (
            /* Submission Form */
            <div className="bg-white rounded-2xl p-8 sm:p-12 border border-[#DCE5EF] shadow-sm">
              <div className="border-b border-[#DCE5EF] pb-6 mb-8">
                <h2 className="text-2xl font-serif font-bold text-[#102A43] mb-2">
                  Citizen Legal Assistance Form
                </h2>
                <p className="text-xs sm:text-sm text-[#64748B]">
                  Fields marked with an asterisk (<span className="text-red-500">*</span>) are required to evaluate your situation under applicable Indian law.
                </p>
              </div>

              {errorMsg && (
                <div className="mb-8 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <p>{errorMsg}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-[#102A43] mb-1.5">
                    Full Name (पूरा नाम) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Chandra Sharma"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#DCE5EF] focus:outline-hidden focus:border-[#174A8B] focus:ring-1 focus:ring-[#174A8B] text-sm"
                  />
                  <span className="text-xs text-[#64748B] mt-1 block">Used only to address you respectfully.</span>
                </div>

                {/* Contact details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#102A43] mb-1.5">
                      Email Address (ईमेल)
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#DCE5EF] focus:outline-hidden focus:border-[#174A8B] focus:ring-1 focus:ring-[#174A8B] text-sm"
                    />
                    <span className="text-xs text-[#64748B] mt-1 block">Optional if phone provided.</span>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#102A43] mb-1.5">
                      Mobile Number (मोबाइल नंबर)
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#DCE5EF] focus:outline-hidden focus:border-[#174A8B] focus:ring-1 focus:ring-[#174A8B] text-sm"
                    />
                    <span className="text-xs text-[#64748B] mt-1 block">For updates or verification if necessary.</span>
                  </div>
                </div>

                {/* State & District */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#102A43] mb-1.5">
                      State / UT (राज्य) <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#DCE5EF] focus:outline-hidden focus:border-[#174A8B] focus:ring-1 focus:ring-[#174A8B] text-sm bg-white"
                    >
                      {indianStates.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#102A43] mb-1.5">
                      District / City (ज़िला / शहर) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. South Delhi, Noida, Pune"
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#DCE5EF] focus:outline-hidden focus:border-[#174A8B] focus:ring-1 focus:ring-[#174A8B] text-sm"
                    />
                    <span className="text-xs text-[#64748B] mt-1 block">Identifies local court jurisdiction.</span>
                  </div>
                </div>

                {/* Category & Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#102A43] mb-1.5">
                      Grievance Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#DCE5EF] focus:outline-hidden focus:border-[#174A8B] focus:ring-1 focus:ring-[#174A8B] text-sm bg-white"
                    >
                      {complaintCategories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#102A43] mb-1.5">
                      Approximate Incident Date
                    </label>
                    <input
                      type="date"
                      value={formData.incidentDate}
                      onChange={(e) => setFormData({ ...formData, incidentDate: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#DCE5EF] focus:outline-hidden focus:border-[#174A8B] focus:ring-1 focus:ring-[#174A8B] text-sm bg-white"
                    />
                    <span className="text-xs text-[#64748B] mt-1 block">Assists in checking legal limitation period.</span>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold text-[#102A43] mb-1.5">
                    Subject / Summary Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Refusal of electronic warranty repair by company"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#DCE5EF] focus:outline-hidden focus:border-[#174A8B] focus:ring-1 focus:ring-[#174A8B] text-sm"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-[#102A43] mb-1.5">
                    Factual Description of the Issue <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Provide relevant facts in simple words: What occurred, when did it happen, and what remedy did you attempt?"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#DCE5EF] focus:outline-hidden focus:border-[#174A8B] focus:ring-1 focus:ring-[#174A8B] text-sm leading-relaxed"
                  />
                  <span className="text-xs text-[#64748B] mt-1 block">
                    Please do not write personal passwords or confidential financial account codes.
                  </span>
                </div>

                {/* Consent & Privacy Checkbox */}
                <div className="pt-4 border-t border-[#DCE5EF]">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="w-4 h-4 rounded-sm border-[#DCE5EF] text-[#174A8B] focus:ring-[#174A8B] mt-1 shrink-0"
                    />
                    <span className="text-xs text-[#263445] leading-relaxed">
                      I understand that submitting this grievance form is strictly for informational guidance and does not automatically create an advocate-client relationship or file a court case. I consent to my details being stored securely under the privacy policy solely to evaluate this grievance. <span className="text-red-500">*</span>
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto px-8 py-3 rounded-lg bg-[#174A8B] hover:bg-[#102A43] text-white font-semibold text-sm transition-colors shadow-sm disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting Encrypted Grievance...
                      </>
                    ) : (
                      'Submit Grievance Securely'
                    )}
                  </button>
                </div>

              </form>
            </div>
          )}

        </div>
      </section>
    </ClientLayout>
  );
}
