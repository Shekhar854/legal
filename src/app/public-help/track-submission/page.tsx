'use client';

import { useState } from 'react';
import ClientLayout from '@/components/ClientLayout';
import Link from 'next/link';
import { AlertCircle, Calendar, CheckCircle, Clock, FileSearch, HelpCircle, Layers, Search, ShieldCheck } from 'lucide-react';

const statusSteps = [
  'Submitted',
  'Under Review',
  'Referred to an Appropriate Resource',
  'Resolved'
];

export default function TrackSubmissionPage() {
  const [refInput, setRefInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [record, setRecord] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!refInput.trim()) return;

    setLoading(true);
    setErrorMsg(null);
    setRecord(null);

    try {
      const res = await fetch(`/api/complaints/${encodeURIComponent(refInput.trim())}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'No submission found for this reference.');
      }
      setRecord(data.complaint);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to locate submission.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Submitted':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Under Review':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'More Information Required':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Referred to an Appropriate Resource':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Resolved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <ClientLayout>
      {/* Header */}
      <section className="bg-gradient-to-b from-[#102A43] to-[#174A8B] text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/10 text-blue-200 border border-white/20 mb-6">
              <FileSearch className="w-3.5 h-3.5" />
              Submission Tracking Desk
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight mb-4">
              Track Grievance Status
            </h1>
            <p className="text-lg sm:text-xl text-blue-100/90 leading-relaxed font-light">
              Enter your unique tracking reference number (e.g. LA-2026-89412) to view legal review progress and advice.
            </p>
          </div>
        </div>
      </section>

      {/* Tracker Search Form */}
      <section className="py-16 bg-[#F6F9FC]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white rounded-2xl p-8 sm:p-10 border border-[#DCE5EF] shadow-sm mb-10">
            <form onSubmit={handleTrack} className="space-y-4">
              <label className="block text-sm font-semibold text-[#102A43]">
                Enter Grievance Reference Number (संदर्भ संख्या)
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  required
                  placeholder="e.g. LA-2026-89412"
                  value={refInput}
                  onChange={(e) => setRefInput(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg border border-[#DCE5EF] focus:outline-hidden focus:border-[#174A8B] focus:ring-1 focus:ring-[#174A8B] font-mono uppercase text-sm"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 rounded-lg bg-[#174A8B] hover:bg-[#102A43] text-white font-semibold text-sm transition-colors shadow-sm disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      Track Status
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-[#64748B]">
                Sample reference numbers for testing: <button type="button" onClick={() => setRefInput('LA-2026-89412')} className="text-[#174A8B] underline font-mono">LA-2026-89412</button> or <button type="button" onClick={() => setRefInput('LA-2026-44218')} className="text-[#174A8B] underline font-mono">LA-2026-44218</button>
              </p>
            </form>
          </div>

          {errorMsg && (
            <div className="p-6 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-3 mb-10">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm mb-1">Record Not Found</h4>
                <p className="text-xs">{errorMsg}</p>
              </div>
            </div>
          )}

          {record && (
            <div className="bg-white rounded-2xl p-8 sm:p-10 border border-[#DCE5EF] shadow-sm space-y-8 animate-in fade-in duration-300">
              
              {/* Header Info */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DCE5EF] pb-6">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#64748B] font-semibold block mb-1">
                    Reference ID
                  </span>
                  <span className="text-2xl font-mono font-bold text-[#102A43]">
                    {record.refNumber}
                  </span>
                </div>
                <div>
                  <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold border ${getStatusBadge(record.status)}`}>
                    ● {record.status}
                  </span>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#64748B] font-semibold block mb-1">Category</span>
                  <p className="font-medium text-[#263445]">{record.category}</p>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#64748B] font-semibold block mb-1">Subject</span>
                  <p className="font-medium text-[#263445]">{record.subject}</p>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#64748B] font-semibold block mb-1">Submission Date</span>
                  <p className="text-[#263445]">{new Date(record.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#64748B] font-semibold block mb-1">Last Updated</span>
                  <p className="text-[#263445]">{new Date(record.updatedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
              </div>

              {/* Legal Review Notes */}
              <div className="p-6 rounded-xl bg-[#EAF3FC]/50 border border-[#174A8B]/20">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#174A8B] mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  Chambers Advisory Note
                </h4>
                <p className="text-sm text-[#263445] leading-relaxed">
                  {record.publicNote}
                </p>
              </div>

              {/* Official Links Reminder */}
              <div className="p-4 rounded-xl bg-[#F6F9FC] border border-[#DCE5EF] text-xs text-[#64748B] flex items-center justify-between">
                <span>Need immediate official statutory filing?</span>
                <Link href="/resources" className="text-[#174A8B] font-semibold hover:underline">
                  Visit Legal Resources Portals →
                </Link>
              </div>

            </div>
          )}

        </div>
      </section>
    </ClientLayout>
  );
}
