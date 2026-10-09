'use client';

import { useState } from 'react';
import ClientLayout from '@/components/ClientLayout';
import { AlertCircle, CheckCircle2, Clock, Mail, MapPin, Phone, ShieldAlert, ShieldCheck } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    preferredLanguage: 'en',
    consent: false,
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.fullName || !formData.email || !formData.subject || !formData.message) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    if (!formData.consent) {
      setErrorMsg('You must acknowledge the disclaimer before submitting.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry.');
      }

      setSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        preferredLanguage: 'en',
        consent: false,
      });
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ClientLayout>
      {/* Header */}
      <section className="bg-gradient-to-b from-[#102A43] to-[#174A8B] text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/10 text-blue-200 border border-white/20 mb-6">
              <Mail className="w-3.5 h-3.5" />
              Chambers Communications
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight mb-4">
              Contact & Chambers Inquiries
            </h1>
            <p className="text-lg sm:text-xl text-blue-100/90 leading-relaxed font-light">
              Connect with Advocate Arjun Panwar’s office for consultation appointments, speaking engagements, or professional inquiries.
            </p>
          </div>
        </div>
      </section>

      {/* Mandatory Disclaimer Warning */}
      <section className="bg-[#FFFBEB] border-y border-[#FDE68A] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-start gap-3 text-xs sm:text-sm text-[#92400E]">
          <ShieldAlert className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
          <p>
            <strong>Important Consultation Notice:</strong> Sending an electronic inquiry does not automatically create an advocate-client relationship or impose professional confidentiality obligations until an engagement letter/Vakalatnama is formally signed. Please do not submit privileged or sensitive case documents through this general contact form.
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-16 bg-[#F6F9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Office Details */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-white rounded-2xl p-8 border border-[#DCE5EF] shadow-sm space-y-6">
                <h2 className="text-2xl font-serif font-bold text-[#102A43] border-b border-[#DCE5EF] pb-4">
                  Chambers Address & Details
                </h2>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#EAF3FC] text-[#174A8B] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold text-[#102A43] block mb-1">Office Location</span>
                    <p className="text-[#64748B] leading-relaxed">
                      Chambers No. 418, Lawyers’ Block,<br />
                      Delhi High Court Complex, Sher Shah Road,<br />
                      New Delhi — 110503, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#EAF3FC] text-[#174A8B] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold text-[#102A43] block mb-1">Telephone</span>
                    <p className="text-[#64748B]">+91 (11) 2338-9412</p>
                    <p className="text-[#64748B]">+91 98712 34567 (Chambers Clerk)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#EAF3FC] text-[#174A8B] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold text-[#102A43] block mb-1">Email Communication</span>
                    <p className="text-[#64748B]">chambers@legalarjun.com</p>
                    <p className="text-xs text-[#64748B] mt-0.5">Response typically within 1–2 business days</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#EAF3FC] text-[#174A8B] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold text-[#102A43] block mb-1">Chambers Hours</span>
                    <p className="text-[#64748B]">Monday – Friday: 10:00 AM – 7:00 PM</p>
                    <p className="text-[#64748B]">Saturday: 11:00 AM – 4:00 PM (By prior appointment)</p>
                    <p className="text-xs text-[#64748B] mt-0.5">Sunday & Court Holidays: Closed</p>
                  </div>
                </div>
              </div>

              {/* Emergency Helplines Box */}
              <div className="bg-[#EAF3FC]/60 rounded-2xl p-6 border border-[#174A8B]/20 text-xs text-[#263445] space-y-2">
                <span className="font-bold text-[#174A8B] block text-sm">
                  Official Emergency Government Helplines:
                </span>
                <p>• Police / Emergency Emergency: <strong>112</strong></p>
                <p>• National Cyber Crime Helpline: <strong>1930</strong></p>
                <p>• National Consumer Helpline: <strong>1915</strong></p>
                <p>• Free Legal Aid (NALSA Toll-Free): <strong>15100</strong></p>
              </div>
            </div>

            {/* Right Column: Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl p-8 sm:p-10 border border-[#DCE5EF] shadow-sm">
                <h2 className="text-2xl font-serif font-bold text-[#102A43] mb-2">
                  Send an Inquiry
                </h2>
                <p className="text-xs sm:text-sm text-[#64748B] mb-8">
                  For preliminary chambers consultations, fee inquiries, or public advocacy correspondence.
                </p>

                {submitted ? (
                  <div className="p-8 rounded-xl bg-green-50 border border-green-200 text-center">
                    <CheckCircle2 className="w-12 h-12 text-[#059669] mx-auto mb-3" />
                    <h3 className="font-serif font-bold text-lg text-[#102A43] mb-2">
                      Inquiry Dispatched Successfully
                    </h3>
                    <p className="text-xs text-[#64748B] max-w-md mx-auto mb-6">
                      Our chambers secretariat has received your communication and will respond within 48 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-4 py-2 rounded-lg bg-[#174A8B] text-white text-xs font-semibold hover:bg-[#102A43]"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {errorMsg && (
                      <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <p>{errorMsg}</p>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-semibold text-[#102A43] mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Vikram Malhotra"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-[#DCE5EF] text-sm focus:outline-hidden focus:border-[#174A8B]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-semibold text-[#102A43] mb-1.5">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="vikram@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg border border-[#DCE5EF] text-sm focus:outline-hidden focus:border-[#174A8B]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#102A43] mb-1.5">
                          Contact Phone Number
                        </label>
                        <input
                          type="tel"
                          placeholder="+91 98765 00000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg border border-[#DCE5EF] text-sm focus:outline-hidden focus:border-[#174A8B]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#102A43] mb-1.5">
                        Subject / Nature of Inquiry <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. High Court civil writ consultation or RERA appeal"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-[#DCE5EF] text-sm focus:outline-hidden focus:border-[#174A8B]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#102A43] mb-1.5">
                        Message / Query Summary <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Briefly state the nature of your legal question without enclosing sensitive passwords or confidential personal papers."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-[#DCE5EF] text-sm focus:outline-hidden focus:border-[#174A8B]"
                      />
                    </div>

                    <div>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          required
                          checked={formData.consent}
                          onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                          className="w-4 h-4 rounded-sm border-[#DCE5EF] text-[#174A8B] focus:ring-[#174A8B] mt-1 shrink-0"
                        />
                        <span className="text-xs text-[#64748B] leading-relaxed">
                          I understand that sending this communication does not create an advocate-client relationship. I confirm that I am not sending privileged or confidential information. <span className="text-red-500">*</span>
                        </span>
                      </label>
                    </div>

                    <div>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full sm:w-auto px-8 py-3 rounded-lg bg-[#174A8B] hover:bg-[#102A43] text-white font-semibold text-sm transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
                      >
                        {submitting ? 'Sending Inquiry...' : 'Submit Chambers Inquiry'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </ClientLayout>
  );
}
