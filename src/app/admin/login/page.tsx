'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AlertCircle, ArrowLeft, KeyRound, Lock, Shield, User } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@legalarjun.com');
  const [password, setPassword] = useState('Admin@2026!');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      router.push('/admin');
    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const setCredentials = (e: string, p: string) => {
    setEmail(e);
    setPassword(p);
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

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#102A43] mb-1.5">
                Official Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#DCE5EF] focus:outline-hidden focus:border-[#174A8B] text-sm"
                  placeholder="admin@legalarjun.com"
                />
                <User className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#102A43] mb-1.5">
                Chambers Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#DCE5EF] focus:outline-hidden focus:border-[#174A8B] text-sm"
                  placeholder="••••••••••••"
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
                    <KeyRound className="w-4 h-4" />
                    Sign In to Chambers Dashboard
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Demo Credentials Assistant */}
          <div className="mt-8 pt-6 border-t border-[#DCE5EF] text-xs">
            <span className="font-semibold text-[#102A43] block mb-2">
              Default Demonstration Credentials:
            </span>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setCredentials('admin@legalarjun.com', 'Admin@2026!')}
                className="w-full text-left p-2.5 rounded-lg bg-[#F6F9FC] hover:bg-[#EAF3FC] border border-[#DCE5EF] transition-colors flex justify-between items-center"
              >
                <div>
                  <span className="font-semibold text-[#174A8B] block">Super Admin</span>
                  <span className="text-[#64748B]">admin@legalarjun.com / Admin@2026!</span>
                </div>
                <span className="text-[11px] text-[#174A8B] font-bold">Use →</span>
              </button>

              <button
                type="button"
                onClick={() => setCredentials('pooja@legalarjun.com', 'Staff@2026!')}
                className="w-full text-left p-2.5 rounded-lg bg-[#F6F9FC] hover:bg-[#EAF3FC] border border-[#DCE5EF] transition-colors flex justify-between items-center"
              >
                <div>
                  <span className="font-semibold text-[#174A8B] block">Complaint Manager</span>
                  <span className="text-[#64748B]">pooja@legalarjun.com / Staff@2026!</span>
                </div>
                <span className="text-[11px] text-[#174A8B] font-bold">Use →</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
