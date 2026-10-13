'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  KeyRound,
  Lock,
  Mail,
  RefreshCw,
  Shield,
  ShieldCheck,
  User,
} from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();

  // Login steps: 'credentials' -> 'otp'
  const [step, setStep] = useState<'credentials' | 'otp'>('credentials');

  // Step 1: Credentials
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Step 2: OTP
  const [tempToken, setTempToken] = useState('');
  const [destinationEmail, setDestinationEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');

  // UI State
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // 1. Submit Credentials -> Dispatches Real Email OTP
  // Helper to safely parse JSON without crashing on empty or HTML responses
  const parseResponse = async (res: Response) => {
    try {
      const text = await res.text();
      return text ? JSON.parse(text) : {};
    } catch {
      return { error: `Server returned an invalid response (${res.status}). Please check server logs.` };
    }
  };

  // 1. Submit Credentials -> Dispatches Real Email OTP
  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await parseResponse(res);
      if (!res.ok) {
        throw new Error(data.error || `Login failed (${res.status})`);
      }

      if (data.requiresOtp) {
        setTempToken(data.tempToken);
        setDestinationEmail(data.destinationEmail);
        setSuccessMsg(data.message);
        setStep('otp');
      } else {
        router.push('/admin');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  // 2. Submit 6-Digit Email OTP Entered Manually by User
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/verify-email-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tempToken,
          otp: otpCode,
        }),
      });

      const data = await parseResponse(res);
      if (!res.ok) {
        throw new Error(data.error || 'Invalid verification code');
      }

      router.push(data.redirectUrl || '/admin');
    } catch (err: any) {
      setErrorMsg(err.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    setErrorMsg(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await parseResponse(res);
      if (!res.ok) {
        throw new Error(data.error || 'Failed to resend code');
      }

      setTempToken(data.tempToken);
      setSuccessMsg(`A fresh verification code was sent to your email (${data.destinationEmail})`);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to resend code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#102A43] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-blue-200 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Legal Arjun Public Portal
        </Link>
        <div className="relative mb-4">
          <img
            src="/images/logo.png"
            alt="Advocate Arjun Panwar Logo"
            className="w-20 h-20 rounded-full object-cover mx-auto shadow-2xl border-2 border-white/20 ring-4 ring-white/10"
          />
        </div>
        <h1 className="text-3xl font-serif font-bold text-white tracking-tight">
          Adv. Arjun Panwar Chambers
        </h1>
        <p className="mt-2 text-sm text-blue-200">
          Authorized Administrator & Legal Review Console
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-2xl rounded-2xl border border-[#DCE5EF]">
          
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <p>{errorMsg}</p>
            </div>
          )}

          {/* STEP 1: EMAIL & PASSWORD */}
          {step === 'credentials' && (
            <div>
              <div className="mb-6 pb-4 border-b border-[#DCE5EF]">
                <div className="flex items-center gap-2 text-[#102A43]">
                  <KeyRound className="w-4 h-4 text-[#174A8B]" />
                  <h2 className="text-sm font-bold uppercase tracking-wider">
                    Chambers Authentication
                  </h2>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Enter your credentials. A secure 6-digit OTP will be sent to your real email inbox.
                </p>
              </div>

              <form onSubmit={handleCredentialsSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#102A43] mb-1.5">
                    Admin Email / Access ID
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#DCE5EF] focus:outline-hidden focus:border-[#174A8B] text-sm text-slate-800"
                      placeholder="shekharthathera@gmail.com"
                      autoComplete="username"
                    />
                    <User className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#102A43] mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#DCE5EF] focus:outline-hidden focus:border-[#174A8B] text-sm text-slate-800"
                      placeholder="••••••••••••"
                      autoComplete="current-password"
                    />
                    <Lock className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3" />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-lg bg-[#174A8B] hover:bg-[#102A43] text-white font-semibold text-sm transition-colors shadow-sm disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Shield className="w-4 h-4" />
                        Verify Credentials & Send Email OTP
                      </>
                    )}
                  </button>
                </div>
              </form>

            </div>
          )}

          {/* STEP 2: EMAIL OTP VERIFICATION */}
          {step === 'otp' && (
            <div>
              <div className="mb-6 pb-4 border-b border-[#DCE5EF] text-center">
                <div className="w-12 h-12 bg-blue-50 text-[#174A8B] rounded-full flex items-center justify-center mx-auto mb-2">
                  <Mail className="w-6 h-6" />
                </div>
                <h2 className="text-base font-bold font-serif text-[#102A43]">
                  Check Your Email Inbox
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  We sent a 6-digit verification code to <strong className="text-slate-800">{destinationEmail}</strong>.
                  Open your email, copy the code, and enter it below.
                </p>
              </div>

              {successMsg && (
                <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              <form onSubmit={handleOtpSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#102A43] mb-1.5 text-center">
                    Enter 6-Digit Email Code
                  </label>
                  <input
                    type="text"
                    required
                    autoFocus
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="w-full px-3 py-3 rounded-lg border border-[#DCE5EF] focus:outline-hidden focus:border-[#174A8B] text-center text-2xl font-mono tracking-widest text-slate-800 bg-slate-50/50"
                    placeholder="••••••"
                  />
                  <p className="text-[11px] text-slate-400 text-center mt-1.5">
                    Valid for 5 minutes. Check Spam or Updates folder if not seen in primary inbox.
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500">
                  <button
                    type="button"
                    onClick={() => { setStep('credentials'); setOtpCode(''); }}
                    className="text-[#174A8B] hover:underline cursor-pointer"
                  >
                    ← Back to credentials
                  </button>
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={loading}
                    className="text-[#174A8B] hover:underline flex items-center gap-1 cursor-pointer font-medium"
                  >
                    <RefreshCw className="w-3 h-3" /> Resend Code
                  </button>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading || otpCode.length !== 6}
                    className="w-full py-3 rounded-lg bg-[#174A8B] hover:bg-[#102A43] text-white font-semibold text-sm transition-colors shadow-sm disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        Verify Code & Sign In
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
