'use client';

import { useState } from 'react';
import ClientLayout from '@/components/ClientLayout';
import Link from 'next/link';
import { AlertCircle, ArrowLeft, CheckCircle2, Flag, ShieldAlert, Users } from 'lucide-react';

const petitionCategories = [
  'Public Safety & Infrastructure',
  'Judicial Infrastructure & Legal Aid',
  'Consumer Rights & Fair Commerce',
  'Environmental Preservation & Clean Air',
  'Education & Child Welfare',
  'Digital Rights & Cyber Safety'
];

export default function CreatePetitionPage() {
  const [formData, setFormData] = useState({
    title: '',
    category: petitionCategories[0],
    location: '',
    description: '',
    proposedAction: '',
    targetRecipient: '',
    creatorName: '',
    creatorEmail: '',
    declaration: false,
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.title || !formData.location || !formData.description || !formData.proposedAction || !formData.targetRecipient || !formData.creatorName || !formData.creatorEmail) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    if (!formData.declaration) {
      setErrorMsg('You must agree to the civic petition declaration.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/petitions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Submission failed');
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ClientLayout>
      {/* Header */}
      <section className="bg-gradient-to-b from-[#102A43] to-[#174A8B] text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/petitions"
            className="inline-flex items-center gap-2 text-sm text-blue-200 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Petitions
          </Link>
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/10 text-blue-200 border border-white/20 mb-4">
              <Flag className="w-3.5 h-3.5" />
              Civic Campaign Portal
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight mb-4">
              Propose a Public Interest Petition
            </h1>
            <p className="text-lg text-blue-100/90 leading-relaxed font-light">
              Mobilize civic support for institutional improvements, urban safety, consumer fairness, and constitutional rights.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-[#F6F9FC]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {submitted ? (
            <div className="bg-white rounded-2xl p-8 sm:p-12 border border-[#DCE5EF] shadow-md text-center">
              <CheckCircle2 className="w-16 h-16 text-[#059669] mx-auto mb-6" />
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#102A43] mb-3">
                Petition Submitted for Editorial Review
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] max-w-lg mx-auto mb-8 leading-relaxed">
                Thank you for proposing this civic initiative. Our editorial team will review the proposal for adherence to public decency, legal compliance, and factual clarity before opening it for public signatures.
              </p>
              <Link
                href="/petitions"
                className="inline-flex px-6 py-3 rounded-lg bg-[#174A8B] hover:bg-[#102A43] text-white font-semibold text-sm transition-colors shadow-sm"
              >
                Browse Published Petitions
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 sm:p-12 border border-[#DCE5EF] shadow-sm">
              <div className="border-b border-[#DCE5EF] pb-6 mb-8">
                <h2 className="text-2xl font-serif font-bold text-[#102A43] mb-2">
                  Petition Details
                </h2>
                <p className="text-xs text-[#64748B]">
                  Be factual, objective, and specific about the requested governmental or administrative remedy.
                </p>
              </div>

              {errorMsg && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <p>{errorMsg}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[#102A43] mb-1.5">
                    Petition Title (शीर्षक) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Demand Installation of CCTV Cameras at Public Bus Terminals"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#DCE5EF] text-sm focus:outline-hidden focus:border-[#174A8B]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#102A43] mb-1.5">
                      Issue Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#DCE5EF] text-sm focus:outline-hidden focus:border-[#174A8B] bg-white"
                    >
                      {petitionCategories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#102A43] mb-1.5">
                      Geographic Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Pan-India or Delhi NCR or State"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#DCE5EF] text-sm focus:outline-hidden focus:border-[#174A8B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#102A43] mb-1.5">
                    Target Authority / Decision-Maker <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ministry of Road Transport, Municipal Commissioner, State Transport Dept"
                    value={formData.targetRecipient}
                    onChange={(e) => setFormData({ ...formData, targetRecipient: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#DCE5EF] text-sm focus:outline-hidden focus:border-[#174A8B]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#102A43] mb-1.5">
                    Factual Description of the Public Issue <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Explain the background and why this issue affects citizens' safety, rights, or welfare."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#DCE5EF] text-sm focus:outline-hidden focus:border-[#174A8B]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#102A43] mb-1.5">
                    Proposed Specific Action / Solution <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="What concrete steps should the target authority take?"
                    value={formData.proposedAction}
                    onChange={(e) => setFormData({ ...formData, proposedAction: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#DCE5EF] text-sm focus:outline-hidden focus:border-[#174A8B]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#DCE5EF]">
                  <div>
                    <label className="block text-sm font-semibold text-[#102A43] mb-1.5">
                      Your Full Name / Forum Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Kumar"
                      value={formData.creatorName}
                      onChange={(e) => setFormData({ ...formData, creatorName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#DCE5EF] text-sm focus:outline-hidden focus:border-[#174A8B]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#102A43] mb-1.5">
                      Your Email (Kept Confidential) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="rajesh@example.com"
                      value={formData.creatorEmail}
                      onChange={(e) => setFormData({ ...formData, creatorEmail: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#DCE5EF] text-sm focus:outline-hidden focus:border-[#174A8B]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#DCE5EF]">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={formData.declaration}
                      onChange={(e) => setFormData({ ...formData, declaration: e.target.checked })}
                      className="w-4 h-4 rounded-sm border-[#DCE5EF] text-[#174A8B] focus:ring-[#174A8B] mt-1 shrink-0"
                    />
                    <span className="text-xs text-[#263445] leading-relaxed">
                      I declare that the information provided in this proposal is accurate to the best of my knowledge and does not contain defamatory, malicious, or unlawful material. I acknowledge that the petition is subject to editorial review before publication. <span className="text-red-500">*</span>
                    </span>
                  </label>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto px-8 py-3 rounded-lg bg-[#174A8B] hover:bg-[#102A43] text-white font-semibold text-sm transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
                  >
                    {submitting ? 'Submitting Petition Proposal...' : 'Submit for Editorial Review'}
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
