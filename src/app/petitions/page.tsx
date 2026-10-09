'use client';

import { useState, useEffect } from 'react';
import ClientLayout from '@/components/ClientLayout';
import Link from 'next/link';
import { AlertCircle, Calendar, CheckCircle2, Flag, Heart, MapPin, Plus, ShieldAlert, Users, X } from 'lucide-react';

export default function PetitionsPage() {
  const [petitions, setPetitions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeModalId, setActiveModalId] = useState<number | null>(null);

  // Signing form state
  const [signName, setSignName] = useState('');
  const [signEmail, setSignEmail] = useState('');
  const [signCity, setSignCity] = useState('');
  const [signState, setSignState] = useState('');
  const [signing, setSigning] = useState(false);
  const [signSuccessMsg, setSignSuccessMsg] = useState<string | null>(null);
  const [signErrorMsg, setSignErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    fetchPetitions();
  }, []);

  const fetchPetitions = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/petitions');
      const data = await res.json();
      if (data.petitions) {
        setPetitions(data.petitions);
      }
    } catch (err) {
      console.error('Fetch petitions error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignPetition = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeModalId) return;

    setSigning(true);
    setSignSuccessMsg(null);
    setSignErrorMsg(null);

    try {
      const res = await fetch(`/api/petitions/${activeModalId}/sign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: signName,
          email: signEmail,
          city: signCity,
          state: signState,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to sign petition.');
      }

      setSignSuccessMsg(data.message || 'Signature added successfully!');
      
      // Update local count
      setPetitions((prev) =>
        prev.map((p) =>
          p.id === activeModalId
            ? { ...p, current_signatures: data.currentSignatures }
            : p
        )
      );

      // Clear fields after 2.5s and close modal
      setTimeout(() => {
        setActiveModalId(null);
        setSignSuccessMsg(null);
        setSignName('');
        setSignEmail('');
        setSignCity('');
        setSignState('');
      }, 2500);

    } catch (err: any) {
      setSignErrorMsg(err.message || 'An error occurred while signing.');
    } finally {
      setSigning(false);
    }
  };

  const selectedPetition = petitions.find((p) => p.id === activeModalId);

  return (
    <ClientLayout>
      {/* Header */}
      <section className="bg-gradient-to-b from-[#102A43] to-[#174A8B] text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/10 text-blue-200 border border-white/20 mb-6">
                <Users className="w-3.5 h-3.5" />
                Moderated Public Advocacy
              </span>
              <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight mb-4">
                Public Petitions & Citizen Causes
              </h1>
              <p className="text-lg sm:text-xl text-blue-100/90 leading-relaxed font-light">
                Support reviewed, public-interest civic campaigns to demand administrative reform, safety standards, and legislative accountability.
              </p>
            </div>
            <div>
              <Link
                href="/petitions/create"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-[#174A8B] font-semibold text-sm hover:bg-blue-50 transition-colors shadow-sm shrink-0"
              >
                <Plus className="w-4 h-4" />
                Propose a Public Petition
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Safeguards Notice */}
      <section className="bg-[#EAF3FC] border-y border-[#DCE5EF] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-start gap-3 text-xs sm:text-sm text-[#263445]">
          <ShieldAlert className="w-5 h-5 text-[#174A8B] shrink-0 mt-0.5" />
          <p>
            <strong>Petition Moderation Policy:</strong> All petitions published on Legal Arjun are vetted by an editorial reviewer to prevent spam, defamation, or unlawful content. Signing a petition expresses civic support and does not constitute a formal court pleading or legal power of attorney.
          </p>
        </div>
      </section>

      {/* Petitions Listing */}
      <section className="py-16 bg-[#F6F9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="py-20 text-center">
              <div className="inline-block w-8 h-8 border-4 border-[#174A8B] border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-[#64748B] text-sm">Loading active petitions...</p>
            </div>
          ) : petitions.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center max-w-xl mx-auto border border-[#DCE5EF]">
              <Flag className="w-12 h-12 text-[#64748B] mx-auto mb-4" />
              <h3 className="text-lg font-serif font-bold text-[#102A43] mb-2">No Active Petitions Right Now</h3>
              <p className="text-sm text-[#64748B] mb-6">
                Be the first citizen to propose an approved civic petition for administrative reform.
              </p>
              <Link
                href="/petitions/create"
                className="px-6 py-2.5 rounded-lg bg-[#174A8B] text-white font-semibold text-xs inline-block"
              >
                Propose New Petition
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {petitions.map((pet) => {
                const target = pet.target_signatures || 500;
                const current = pet.current_signatures || 0;
                const percentage = Math.min(100, Math.round((current / target) * 100));

                return (
                  <div
                    key={pet.id}
                    className="bg-white rounded-2xl p-8 border border-[#DCE5EF] hover:border-[#174A8B]/40 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#EAF3FC] text-[#174A8B]">
                          {pet.category}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                          <MapPin className="w-3.5 h-3.5 text-[#174A8B]" />
                          <span>{pet.location}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#102A43] mb-3 leading-snug">
                        {pet.title}
                      </h2>

                      {pet.title_hi && (
                        <p className="text-xs text-[#174A8B] font-serif mb-3 font-medium">
                          {pet.title_hi}
                        </p>
                      )}

                      <p className="text-sm text-[#64748B] leading-relaxed mb-6">
                        {pet.description}
                      </p>

                      {/* Recipient & Proposed Action */}
                      <div className="bg-[#F6F9FC] rounded-xl p-4 border border-[#DCE5EF]/60 space-y-2 text-xs mb-6">
                        <div>
                          <span className="text-[#64748B] font-medium block">Target Authority:</span>
                          <p className="font-semibold text-[#102A43]">{pet.target_recipient}</p>
                        </div>
                        <div className="pt-2 border-t border-[#DCE5EF]/60">
                          <span className="text-[#64748B] font-medium block">Proposed Action:</span>
                          <p className="text-[#263445] leading-relaxed">{pet.proposed_action}</p>
                        </div>
                      </div>

                      {/* Signature Progress Bar */}
                      <div className="space-y-2 mb-6">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-[#102A43] font-mono text-sm">
                            {current.toLocaleString()} supporters
                          </span>
                          <span className="text-[#64748B]">
                            Goal: {target.toLocaleString()}
                          </span>
                        </div>
                        <div className="w-full h-2.5 bg-[#EAF3FC] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#174A8B] rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-[11px] text-[#64748B] block text-right font-medium">
                          {percentage}% of goal reached
                        </span>
                      </div>
                    </div>

                    {/* Bottom Action */}
                    <div className="pt-4 border-t border-[#DCE5EF] flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Closes: {pet.closing_date || '31 Dec 2026'}</span>
                      </div>
                      <button
                        onClick={() => {
                          setActiveModalId(pet.id);
                          setSignSuccessMsg(null);
                          setSignErrorMsg(null);
                        }}
                        className="px-5 py-2.5 rounded-lg bg-[#174A8B] hover:bg-[#102A43] text-white font-semibold text-xs transition-colors shadow-xs cursor-pointer flex items-center gap-2"
                      >
                        <Heart className="w-3.5 h-3.5" />
                        Support This Cause
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Sign Petition Modal */}
      {activeModalId && selectedPetition && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-[#DCE5EF] max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveModalId(null)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-[#64748B] hover:text-[#102A43] hover:bg-[#F6F9FC] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#EAF3FC] text-[#174A8B] uppercase tracking-wider mb-2 inline-block">
                Add Your Voice
              </span>
              <h3 className="text-xl font-serif font-bold text-[#102A43]">
                {selectedPetition.title}
              </h3>
            </div>

            {signSuccessMsg ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="w-16 h-16 text-[#059669] mx-auto mb-4" />
                <h4 className="text-xl font-serif font-bold text-[#102A43] mb-2">Thank You!</h4>
                <p className="text-sm text-[#64748B]">{signSuccessMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleSignPetition} className="space-y-4">
                {signErrorMsg && (
                  <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <p>{signErrorMsg}</p>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-[#102A43] mb-1">
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Sen"
                    value={signName}
                    onChange={(e) => setSignName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg border border-[#DCE5EF] text-sm focus:outline-hidden focus:border-[#174A8B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#102A43] mb-1">
                    Email Address (For Verification) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={signEmail}
                    onChange={(e) => setSignEmail(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg border border-[#DCE5EF] text-sm focus:outline-hidden focus:border-[#174A8B]"
                  />
                  <span className="text-[11px] text-[#64748B] mt-0.5 block">
                    Your email will remain private and is never shown publicly.
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#102A43] mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. New Delhi"
                      value={signCity}
                      onChange={(e) => setSignCity(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg border border-[#DCE5EF] text-sm focus:outline-hidden focus:border-[#174A8B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#102A43] mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Delhi"
                      value={signState}
                      onChange={(e) => setSignState(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg border border-[#DCE5EF] text-sm focus:outline-hidden focus:border-[#174A8B]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-[11px] text-[#64748B] leading-relaxed">
                    By signing, you confirm that you support this petition under our civic terms. Your information is protected under our Privacy Policy.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={signing}
                    className="w-full py-2.5 rounded-lg bg-[#174A8B] hover:bg-[#102A43] text-white font-semibold text-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    {signing ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      'Sign & Verify Support'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </ClientLayout>
  );
}
