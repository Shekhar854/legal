'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  AlertCircle,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Clock,
  Eye,
  FileCheck,
  FileText,
  Filter,
  Flag,
  Globe,
  Heart,
  HelpCircle,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  RefreshCw,
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
  User,
  Users
} from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'complaints' | 'petitions' | 'publish' | 'inquiries' | 'audit'>('overview');

  // Stats & Metrics
  const [stats, setStats] = useState<any | null>(null);
  const [recentLogs, setRecentLogs] = useState<any[]>([]);

  // Complaints state
  const [complaints, setComplaints] = useState<any[]>([]);
  const [complaintFilter, setComplaintFilter] = useState('all');
  const [updatingRef, setUpdatingRef] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState('');
  const [adminNoteInput, setAdminNoteInput] = useState('');

  // Petitions state
  const [petitions, setPetitions] = useState<any[]>([]);
  const [petitionFilter, setPetitionFilter] = useState('all');

  // Contact inquiries
  const [inquiries, setInquiries] = useState<any[]>([]);

  // New Article Form
  const [artTitle, setArtTitle] = useState('');
  const [artTitleHi, setArtTitleHi] = useState('');
  const [artCategory, setArtCategory] = useState('Consumer Rights');
  const [artSummary, setArtSummary] = useState('');
  const [artContent, setArtContent] = useState('');
  const [artTags, setArtTags] = useState('Legal Guide, Rights, 2026');
  const [publishing, setPublishing] = useState(false);
  const [pubSuccess, setPubSuccess] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    setAuthLoading(true);
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      if (!res.ok || !data.authenticated) {
        router.push('/admin/login');
        return;
      }
      setCurrentUser(data.user);
      loadDashboardData();
    } catch {
      router.push('/admin/login');
    } finally {
      setAuthLoading(false);
    }
  };

  const loadDashboardData = async () => {
    try {
      // 1. Stats
      const statsRes = await fetch('/api/stats');
      const statsData = await statsRes.json();
      if (statsData.metrics) {
        setStats(statsData.metrics);
        setRecentLogs(statsData.recentLogs || []);
      }

      // 2. Complaints
      const compRes = await fetch('/api/complaints');
      const compData = await compRes.json();
      if (compData.complaints) setComplaints(compData.complaints);

      // 3. Petitions
      const petRes = await fetch('/api/petitions?status=all');
      const petData = await petRes.json();
      if (petData.petitions) setPetitions(petData.petitions);

      // 4. Inquiries
      const inqRes = await fetch('/api/contact');
      const inqData = await inqRes.json();
      if (inqData.inquiries) setInquiries(inqData.inquiries);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  // Update complaint status
  const handleUpdateComplaintStatus = async (refNumber: string) => {
    if (!newStatus) return;
    try {
      const res = await fetch(`/api/complaints/${refNumber}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, adminNotes: adminNoteInput }),
      });
      if (res.ok) {
        setUpdatingRef(null);
        setNewStatus('');
        setAdminNoteInput('');
        loadDashboardData();
      }
    } catch (err) {
      console.error('Update complaint error:', err);
    }
  };

  // Moderate petition
  const handleModeratePetition = async (id: number, status: string) => {
    try {
      const res = await fetch(`/api/petitions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        loadDashboardData();
      }
    } catch (err) {
      console.error('Moderate petition error:', err);
    }
  };

  // Publish new article
  const handlePublishArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    setPublishing(true);
    setPubSuccess(null);
    try {
      const res = await fetch('/api/insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: artTitle,
          title_hi: artTitleHi,
          summary: artSummary,
          content: artContent,
          category: artCategory,
          tags: artTags,
          status: 'published',
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setPubSuccess(`Article published successfully! Slug: ${data.slug}`);
        setArtTitle('');
        setArtTitleHi('');
        setArtSummary('');
        setArtContent('');
        loadDashboardData();
      } else {
        alert(data.error || 'Failed to publish');
      }
    } catch (err: any) {
      alert(err.message || 'Error publishing article');
    } finally {
      setPublishing(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#F6F9FC] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#174A8B] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-[#64748B]">Verifying Chambers Credentials...</p>
        </div>
      </div>
    );
  }

  const filteredComplaints = complaints.filter(
    (c) => complaintFilter === 'all' || c.status === complaintFilter
  );

  const filteredPetitions = petitions.filter(
    (p) => petitionFilter === 'all' || p.status === petitionFilter
  );

  return (
    <div className="min-h-screen bg-[#F6F9FC] flex flex-col">
      {/* Top Admin Header */}
      <header className="bg-[#102A43] text-white border-b border-[#174A8B]/40 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/images/logo.png"
              alt="Advocate Arjun Panwar Logo"
              className="w-10 h-10 rounded-full object-cover border border-white/20 shadow-sm"
            />
            <div>
              <span className="font-serif font-bold text-base text-white tracking-wide block">
                Adv. Arjun Panwar Console
              </span>
              <span className="text-[10px] text-blue-200 uppercase tracking-wider block">
                Legal Arjun Chambers Portal
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="text-xs text-blue-200 hover:text-white flex items-center gap-1.5 transition-colors hidden sm:flex"
            >
              <Globe className="w-3.5 h-3.5" />
              Public Website
            </Link>

            <div className="h-4 w-px bg-white/20 hidden sm:block" />

            <div className="flex items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 text-blue-100 font-medium">
                <img
                  src="/images/arjun-panwar.jpg"
                  alt="Admin Avatar"
                  className="w-5 h-5 rounded-full object-cover border border-white/40"
                />
                {currentUser?.name} ({currentUser?.role})
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-200 hover:text-white transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 sm:space-x-4 overflow-x-auto text-xs font-semibold scrollbar-none border-t border-white/10">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-3 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'overview'
                ? 'border-blue-400 text-white'
                : 'border-transparent text-blue-200/70 hover:text-white'
            }`}
          >
            Dashboard Overview
          </button>
          <button
            onClick={() => setActiveTab('complaints')}
            className={`py-3 px-3 border-b-2 whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'complaints'
                ? 'border-blue-400 text-white'
                : 'border-transparent text-blue-200/70 hover:text-white'
            }`}
          >
            Complaints Desk
            {stats?.newComplaints > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-bold">
                {stats.newComplaints}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('petitions')}
            className={`py-3 px-3 border-b-2 whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'petitions'
                ? 'border-blue-400 text-white'
                : 'border-transparent text-blue-200/70 hover:text-white'
            }`}
          >
            Petitions Moderation
            {stats?.awaitingPetitions > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-blue-500 text-white text-[10px] font-bold">
                {stats.awaitingPetitions}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('publish')}
            className={`py-3 px-3 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'publish'
                ? 'border-blue-400 text-white'
                : 'border-transparent text-blue-200/70 hover:text-white'
            }`}
          >
            Publish Blog Post
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`py-3 px-3 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'inquiries'
                ? 'border-blue-400 text-white'
                : 'border-transparent text-blue-200/70 hover:text-white'
            }`}
          >
            Inquiries ({inquiries.length})
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`py-3 px-3 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'audit'
                ? 'border-blue-400 text-white'
                : 'border-transparent text-blue-200/70 hover:text-white'
            }`}
          >
            Audit Trail
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Top Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-xl border border-[#DCE5EF] shadow-xs">
                <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider block mb-1">
                  Active Complaints
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-serif font-bold text-[#102A43]">
                    {stats?.totalComplaints || 0}
                  </span>
                  <span className="text-xs text-amber-600 font-semibold bg-amber-50 px-2 py-0.5 rounded-sm">
                    {stats?.newComplaints || 0} New
                  </span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-[#DCE5EF] shadow-xs">
                <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider block mb-1">
                  Public Petitions
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-serif font-bold text-[#102A43]">
                    {stats?.publishedPetitions || 0}
                  </span>
                  <span className="text-xs text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded-sm">
                    {stats?.awaitingPetitions || 0} In Review
                  </span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-[#DCE5EF] shadow-xs">
                <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider block mb-1">
                  Verified Signatures
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-serif font-bold text-[#102A43]">
                    {(stats?.totalSignatures || 0).toLocaleString()}
                  </span>
                  <Heart className="w-4 h-4 text-rose-500" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-[#DCE5EF] shadow-xs">
                <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider block mb-1">
                  Published Articles
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-serif font-bold text-[#102A43]">
                    {stats?.publishedArticles || 0}
                  </span>
                  <span className="text-xs text-[#059669] font-semibold bg-emerald-50 px-2 py-0.5 rounded-sm">
                    {stats?.totalResources || 0} Resources
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions Row */}
            <div className="bg-white rounded-xl p-6 border border-[#DCE5EF] shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-serif font-bold text-lg text-[#102A43]">
                  Chambers Operational Hub
                </h3>
                <p className="text-xs text-[#64748B]">
                  Manage citizen grievances, moderate civic campaigns, or publish legal insights directly to the live platform.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setActiveTab('complaints')}
                  className="px-4 py-2 rounded-lg bg-[#174A8B] hover:bg-[#102A43] text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Review Pending Complaints
                </button>
                <button
                  onClick={() => setActiveTab('publish')}
                  className="px-4 py-2 rounded-lg border border-[#DCE5EF] text-[#102A43] hover:bg-[#F6F9FC] text-xs font-semibold transition-colors cursor-pointer"
                >
                  + Write Legal Insight
                </button>
              </div>
            </div>

            {/* Two Column Layout: Recent Complaints & Audit Log */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Complaints */}
              <div className="bg-white rounded-xl p-6 border border-[#DCE5EF] shadow-xs">
                <div className="flex items-center justify-between mb-4 border-b border-[#DCE5EF] pb-3">
                  <h3 className="font-serif font-bold text-base text-[#102A43] flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#174A8B]" />
                    Recent Grievance Submissions
                  </h3>
                  <button
                    onClick={() => setActiveTab('complaints')}
                    className="text-xs text-[#174A8B] font-semibold hover:underline"
                  >
                    View All →
                  </button>
                </div>
                <div className="space-y-3">
                  {complaints.slice(0, 4).map((c) => (
                    <div key={c.id} className="p-3.5 rounded-lg bg-[#F6F9FC] border border-[#DCE5EF] text-xs space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-mono font-bold text-[#174A8B]">{c.ref_number}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white border border-[#DCE5EF]">
                          {c.status}
                        </span>
                      </div>
                      <p className="font-semibold text-[#102A43] line-clamp-1">{c.subject}</p>
                      <p className="text-[#64748B]">{c.full_name} • {c.state}, {c.district}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security Audit Trail */}
              <div className="bg-white rounded-xl p-6 border border-[#DCE5EF] shadow-xs">
                <div className="flex items-center justify-between mb-4 border-b border-[#DCE5EF] pb-3">
                  <h3 className="font-serif font-bold text-base text-[#102A43] flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#174A8B]" />
                    Administrative Audit Trail
                  </h3>
                  <button
                    onClick={() => setActiveTab('audit')}
                    className="text-xs text-[#174A8B] font-semibold hover:underline"
                  >
                    All Logs →
                  </button>
                </div>
                <div className="space-y-3">
                  {recentLogs.map((log) => (
                    <div key={log.id} className="p-3 rounded-lg bg-[#F6F9FC] border border-[#DCE5EF] text-xs">
                      <div className="flex justify-between text-[#64748B] text-[11px] mb-1">
                        <span className="font-semibold text-[#102A43]">{log.action}</span>
                        <span>{new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <p className="text-[#263445]">{log.details}</p>
                      <span className="text-[10px] text-[#64748B] block mt-0.5">{log.user_email}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: COMPLAINTS DESK */}
        {activeTab === 'complaints' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-[#DCE5EF] shadow-xs">
              <div>
                <h2 className="text-xl font-serif font-bold text-[#102A43]">
                  Citizen Grievance Management Desk
                </h2>
                <p className="text-xs text-[#64748B]">
                  Review submissions, record internal counsel notes, and update live tracking status for citizens.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#64748B]" />
                <select
                  value={complaintFilter}
                  onChange={(e) => setComplaintFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-[#DCE5EF] text-xs bg-white focus:outline-hidden"
                >
                  <option value="all">All Statuses ({complaints.length})</option>
                  <option value="Submitted">Submitted</option>
                  <option value="Under Review">Under Review</option>
                  <option value="More Information Required">More Info Required</option>
                  <option value="Referred to an Appropriate Resource">Referred to Official Resource</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredComplaints.length === 0 ? (
                <div className="bg-white p-12 text-center rounded-xl border border-[#DCE5EF] text-sm text-[#64748B]">
                  No complaints found under this filter.
                </div>
              ) : (
                filteredComplaints.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl p-6 border border-[#DCE5EF] shadow-xs space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DCE5EF] pb-4">
                      <div>
                        <span className="text-xs uppercase tracking-wider text-[#64748B] font-semibold mr-3">
                          Ref: <strong className="font-mono text-[#174A8B] text-sm">{item.ref_number}</strong>
                        </span>
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#EAF3FC] text-[#174A8B]">
                          {item.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-[#64748B]">
                          {new Date(item.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold border bg-blue-50 text-blue-700 border-blue-200">
                          {item.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                      <div>
                        <span className="font-semibold text-[#102A43] block mb-1">Citizen Details:</span>
                        <p className="font-medium text-[#263445]">{item.full_name}</p>
                        <p className="text-[#64748B]">{item.email || 'No email provided'}</p>
                        <p className="text-[#64748B]">{item.phone || 'No phone provided'}</p>
                        <p className="text-[#64748B] mt-1">{item.district}, {item.state}</p>
                      </div>

                      <div className="md:col-span-2">
                        <span className="font-semibold text-[#102A43] block mb-1">Grievance Subject:</span>
                        <p className="font-bold text-sm text-[#102A43] mb-2">{item.subject}</p>
                        <p className="text-[#263445] leading-relaxed bg-[#F6F9FC] p-3 rounded-lg border border-[#DCE5EF]/60">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Admin Notes / Resolution */}
                    {item.admin_notes && (
                      <div className="bg-[#EAF3FC]/50 p-3.5 rounded-lg border border-[#174A8B]/20 text-xs">
                        <span className="font-bold text-[#174A8B] block mb-1">Public Resolution / Advisory Note:</span>
                        <p className="text-[#263445]">{item.admin_notes}</p>
                      </div>
                    )}

                    {/* Edit Status Section */}
                    {updatingRef === item.ref_number ? (
                      <div className="p-4 rounded-xl bg-[#F6F9FC] border border-[#DCE5EF] space-y-3 text-xs">
                        <h4 className="font-bold text-[#102A43]">Update Status & Citizen Guidance Note</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block font-semibold mb-1">New Status</label>
                            <select
                              value={newStatus}
                              onChange={(e) => setNewStatus(e.target.value)}
                              className="w-full p-2 rounded-lg border border-[#DCE5EF] bg-white text-xs"
                            >
                              <option value="Submitted">Submitted</option>
                              <option value="Under Review">Under Review</option>
                              <option value="More Information Required">More Information Required</option>
                              <option value="Referred to an Appropriate Resource">Referred to an Appropriate Resource</option>
                              <option value="Resolved">Resolved</option>
                              <option value="Closed">Closed</option>
                            </select>
                          </div>
                          <div>
                            <label className="block font-semibold mb-1">Advisory Note (Visible to Citizen)</label>
                            <input
                              type="text"
                              placeholder="e.g. Advised citizen to lodge claim on e-Daakhil..."
                              value={adminNoteInput}
                              onChange={(e) => setAdminNoteInput(e.target.value)}
                              className="w-full p-2 rounded-lg border border-[#DCE5EF] bg-white text-xs"
                            />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleUpdateComplaintStatus(item.ref_number)}
                            className="px-4 py-2 rounded-lg bg-[#174A8B] text-white font-semibold cursor-pointer"
                          >
                            Save Status Update
                          </button>
                          <button
                            onClick={() => setUpdatingRef(null)}
                            className="px-4 py-2 rounded-lg border border-[#DCE5EF] text-[#64748B] hover:bg-white cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={() => {
                            setUpdatingRef(item.ref_number);
                            setNewStatus(item.status);
                            setAdminNoteInput(item.admin_notes || '');
                          }}
                          className="px-4 py-1.5 rounded-lg bg-white border border-[#DCE5EF] text-[#174A8B] font-semibold text-xs hover:bg-[#EAF3FC] transition-colors cursor-pointer"
                        >
                          Update Status / Advisory Note
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 3: PETITIONS MODERATION */}
        {activeTab === 'petitions' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-[#DCE5EF] shadow-xs">
              <div>
                <h2 className="text-xl font-serif font-bold text-[#102A43]">
                  Public Petition Moderation
                </h2>
                <p className="text-xs text-[#64748B]">
                  Approve proposals for public signatures, pause, or reject unlawful/defamatory submissions.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#64748B]" />
                <select
                  value={petitionFilter}
                  onChange={(e) => setPetitionFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-[#DCE5EF] text-xs bg-white focus:outline-hidden"
                >
                  <option value="all">All Petitions ({petitions.length})</option>
                  <option value="Approved">Approved (Public)</option>
                  <option value="Submitted for Review">Submitted for Review</option>
                  <option value="Paused">Paused</option>
                  <option value="Closed">Closed</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredPetitions.map((pet) => (
                <div key={pet.id} className="bg-white rounded-xl p-6 border border-[#DCE5EF] shadow-xs space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DCE5EF] pb-4">
                    <div>
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#EAF3FC] text-[#174A8B] mr-2">
                        {pet.category}
                      </span>
                      <span className="text-xs text-[#64748B]">{pet.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-[#174A8B]">
                        {pet.current_signatures} signatures
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                        pet.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        pet.status === 'Submitted for Review' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        'bg-slate-50 text-slate-700 border-slate-200'
                      }`}>
                        {pet.status}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-lg text-[#102A43] mb-2">{pet.title}</h3>
                    <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed mb-3">{pet.description}</p>
                    <div className="bg-[#F6F9FC] p-3 rounded-lg border border-[#DCE5EF]/60 text-xs">
                      <span className="font-semibold text-[#102A43]">Target:</span> {pet.target_recipient} | <span className="font-semibold text-[#102A43]">Proposed Action:</span> {pet.proposed_action}
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-[#DCE5EF]">
                    <span className="text-[#64748B]">
                      Creator: <strong>{pet.creator_name}</strong> ({pet.creator_email})
                    </span>
                    <div className="flex gap-2">
                      {pet.status !== 'Approved' && (
                        <button
                          onClick={() => handleModeratePetition(pet.id, 'Approved')}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold cursor-pointer"
                        >
                          Approve & Publish
                        </button>
                      )}
                      {pet.status !== 'Paused' && (
                        <button
                          onClick={() => handleModeratePetition(pet.id, 'Paused')}
                          className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold cursor-pointer"
                        >
                          Pause
                        </button>
                      )}
                      {pet.status !== 'Rejected' && (
                        <button
                          onClick={() => handleModeratePetition(pet.id, 'Rejected')}
                          className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold cursor-pointer"
                        >
                          Reject
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PUBLISH ARTICLE */}
        {activeTab === 'publish' && (
          <div className="bg-white rounded-xl p-8 border border-[#DCE5EF] shadow-xs space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
            <div>
              <h2 className="text-xl font-serif font-bold text-[#102A43]">
                Publish New Legal Blog Post / Plain-Language Guide
              </h2>
              <p className="text-xs text-[#64748B]">
                Articles are published immediately to the public /blog page with compliant BCI Rule 36 disclaimers.
              </p>
            </div>

            {pubSuccess && (
              <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <p>{pubSuccess}</p>
              </div>
            )}

            <form onSubmit={handlePublishArticle} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#102A43] mb-1.5">
                  Article Title (English) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Critical Pre-Litigation Steps Under the Consumer Protection Act, 2019"
                  value={artTitle}
                  onChange={(e) => setArtTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#DCE5EF] text-sm focus:outline-hidden focus:border-[#174A8B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#102A43] mb-1.5">
                  Article Title (Hindi / हिन्दी)
                </label>
                <input
                  type="text"
                  placeholder="e.g. उपभोक्ता संरक्षण अधिनियम 2019 के अंतर्गत आवश्यक पूर्व-मुकदमा कदम"
                  value={artTitleHi}
                  onChange={(e) => setArtTitleHi(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#DCE5EF] text-sm focus:outline-hidden focus:border-[#174A8B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#102A43] mb-1.5">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={artCategory}
                    onChange={(e) => setArtCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#DCE5EF] text-sm bg-white focus:outline-hidden"
                  >
                    <option value="Data Privacy & Technology">Data Privacy & Technology</option>
                    <option value="Consumer Rights">Consumer Rights</option>
                    <option value="Property & Real Estate">Property & Real Estate</option>
                    <option value="Constitutional Law">Constitutional Law</option>
                    <option value="Employment & Labour Rights">Employment & Labour Rights</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#102A43] mb-1.5">
                    Tags (Comma Separated)
                  </label>
                  <input
                    type="text"
                    placeholder="Consumer Protection, e-Daakhil, Guidance"
                    value={artTags}
                    onChange={(e) => setArtTags(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#DCE5EF] text-sm focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#102A43] mb-1.5">
                  Summary / Lead Paragraph <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="A concise 2-sentence summary of the legal issue and its importance for citizens."
                  value={artSummary}
                  onChange={(e) => setArtSummary(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#DCE5EF] text-sm focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#102A43] mb-1.5">
                  Article Body (Use ### for headings, - for bullet points) <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={8}
                  placeholder="### Statutory Framework&#10;&#10;Write comprehensive educational paragraphs..."
                  value={artContent}
                  onChange={(e) => setArtContent(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#DCE5EF] text-sm focus:outline-hidden font-mono text-xs"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={publishing}
                  className="px-6 py-2.5 rounded-lg bg-[#174A8B] hover:bg-[#102A43] text-white font-semibold text-sm transition-colors cursor-pointer shadow-sm disabled:opacity-50"
                >
                  {publishing ? 'Publishing Blog Post...' : 'Publish to Public Blog'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 5: INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white p-6 rounded-xl border border-[#DCE5EF] shadow-xs">
              <h2 className="text-xl font-serif font-bold text-[#102A43]">
                Chambers Contact Inquiries
              </h2>
              <p className="text-xs text-[#64748B]">
                Messages received from prospective clients and civic organizations through the /contact page.
              </p>
            </div>

            <div className="space-y-4">
              {inquiries.length === 0 ? (
                <div className="bg-white p-12 text-center rounded-xl border border-[#DCE5EF] text-sm text-[#64748B]">
                  No inquiries received yet.
                </div>
              ) : (
                inquiries.map((inq) => (
                  <div key={inq.id} className="bg-white rounded-xl p-6 border border-[#DCE5EF] shadow-xs space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DCE5EF] pb-3">
                      <div>
                        <h3 className="font-bold text-sm text-[#102A43]">{inq.subject}</h3>
                        <span className="text-xs text-[#64748B]">From: {inq.full_name} ({inq.email})</span>
                      </div>
                      <span className="text-xs text-[#64748B]">
                        {new Date(inq.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>

                    <p className="text-xs text-[#263445] leading-relaxed bg-[#F6F9FC] p-3 rounded-lg border border-[#DCE5EF]/60">
                      {inq.message}
                    </p>

                    <div className="text-[11px] text-[#64748B] flex justify-between">
                      <span>Phone: {inq.phone || 'Not provided'}</span>
                      <a href={`mailto:${inq.email}?subject=Re: ${encodeURIComponent(inq.subject)}`} className="text-[#174A8B] font-semibold hover:underline">
                        Reply via Email →
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 6: AUDIT TRAIL */}
        {activeTab === 'audit' && (
          <div className="bg-white rounded-xl p-6 border border-[#DCE5EF] shadow-xs space-y-4 animate-in fade-in duration-200">
            <div>
              <h2 className="text-xl font-serif font-bold text-[#102A43]">
                Administrative Security Audit Trail
              </h2>
              <p className="text-xs text-[#64748B]">
                Immutable chronological log of all administrator actions, logins, status modifications, and publications.
              </p>
            </div>

            <div className="divide-y divide-[#DCE5EF]">
              {recentLogs.map((log) => (
                <div key={log.id} className="py-3 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="font-bold text-[#102A43] mr-2">[{log.action}]</span>
                    <span className="text-[#263445]">{log.details}</span>
                    <span className="text-[#64748B] block sm:inline sm:ml-2">({log.user_email})</span>
                  </div>
                  <span className="text-[11px] text-[#64748B] shrink-0 font-mono">
                    {new Date(log.created_at).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
