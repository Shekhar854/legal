'use client';

import { useState, useEffect } from 'react';
import ClientLayout from '@/components/ClientLayout';
import Link from 'next/link';
import { BookOpen, ExternalLink, FileText, Globe, HelpCircle, Layers, Search, ShieldCheck } from 'lucide-react';

export default function ResourcesPage() {
  const [resources, setResources] = useState<any[]>([]);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const categories = [
    'All',
    'Consumer Protection',
    'Cyber Safety & Fraud',
    'Court Information',
    'Legal Aid & Human Rights',
    'Public Grievance',
    'Educational Resources',
  ];

  useEffect(() => {
    fetchResources();
  }, [category]);

  const fetchResources = async () => {
    setLoading(true);
    try {
      let url = '/api/resources';
      const params = new URLSearchParams();
      if (category !== 'All') params.append('category', category);
      if (search.trim()) params.append('search', search.trim());
      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url);
      const data = await res.json();
      if (data.resources) {
        setResources(data.resources);
      }
    } catch (err) {
      console.error('Fetch resources error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchResources();
  };

  return (
    <ClientLayout>
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#102A43] to-[#174A8B] text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/10 text-blue-200 border border-white/20 mb-6">
              <Layers className="w-3.5 h-3.5" />
              Public Legal Knowledge Repository
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight mb-6">
              Citizen Legal Resources Centre
            </h1>
            <p className="text-lg sm:text-xl text-blue-100/90 leading-relaxed font-light">
              Official government portals, free legal aid schemes (NALSA), statutory filing systems, and plain-language guides for everyday rights.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Category Filter Section */}
      <section className="bg-white border-b border-[#DCE5EF] py-6 sticky top-16 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    category === cat
                      ? 'bg-[#174A8B] text-white shadow-xs'
                      : 'bg-[#F6F9FC] text-[#263445] hover:bg-[#EAF3FC] border border-[#DCE5EF]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <form onSubmit={handleSearch} className="w-full md:w-80 relative">
              <input
                type="text"
                placeholder="Search resources, portals, acts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-[#DCE5EF] focus:outline-hidden focus:border-[#174A8B] focus:ring-1 focus:ring-[#174A8B] bg-[#F6F9FC]"
              />
              <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3" />
            </form>

          </div>
        </div>
      </section>

      {/* Quick Access Highlights: Glossary & Checklists */}
      <section className="py-8 bg-[#EAF3FC]/40 border-b border-[#DCE5EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/resources/glossary"
              className="p-5 rounded-xl bg-white border border-[#DCE5EF] hover:border-[#174A8B]/40 hover:shadow-xs transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#EAF3FC] text-[#174A8B] flex items-center justify-center shrink-0">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-[#102A43] group-hover:text-[#174A8B] transition-colors">
                    Legal Glossary (विधिक शब्दकोश)
                  </h3>
                  <p className="text-xs text-[#64748B]">
                    Common courtroom terms (Vakalatnama, Caveat, Res Judicata, Bail, Injunction) in plain Hindi & English.
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#174A8B] shrink-0 pl-2">Open Glossary →</span>
            </Link>

            <Link
              href="/public-help/submit-complaint"
              className="p-5 rounded-xl bg-white border border-[#DCE5EF] hover:border-[#174A8B]/40 hover:shadow-xs transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#EAF3FC] text-[#174A8B] flex items-center justify-center shrink-0">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-[#102A43] group-hover:text-[#174A8B] transition-colors">
                    Citizen Complaint & Assistance Portal
                  </h3>
                  <p className="text-xs text-[#64748B]">
                    Submit your grievance securely to receive a unique tracking ID and guidance on official remedies.
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#174A8B] shrink-0 pl-2">Submit Grievance →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Resource Cards */}
      <section className="py-16 bg-[#F6F9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="py-20 text-center">
              <div className="inline-block w-8 h-8 border-4 border-[#174A8B] border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-[#64748B] text-sm">Loading verified resources...</p>
            </div>
          ) : resources.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center max-w-xl mx-auto border border-[#DCE5EF]">
              <Layers className="w-12 h-12 text-[#64748B] mx-auto mb-4" />
              <h3 className="text-lg font-serif font-bold text-[#102A43] mb-2">No resources match your search</h3>
              <p className="text-sm text-[#64748B] mb-6">
                Try searching for another keyword or browse all categories.
              </p>
              <button
                onClick={() => { setCategory('All'); setSearch(''); }}
                className="px-4 py-2 rounded-lg bg-[#174A8B] text-white text-xs font-semibold"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-7 border border-[#DCE5EF] hover:border-[#174A8B]/40 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#EAF3FC] text-[#174A8B]">
                        {item.category}
                      </span>
                      <span className="text-xs text-[#059669] flex items-center gap-1 font-medium">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Verified
                      </span>
                    </div>

                    <h3 className="text-lg font-serif font-bold text-[#102A43] mb-2">
                      {item.title}
                    </h3>

                    {item.title_hi && (
                      <p className="text-xs text-[#174A8B] font-serif mb-3 font-medium">
                        {item.title_hi}
                      </p>
                    )}

                    <p className="text-sm text-[#64748B] leading-relaxed mb-6">
                      {item.summary}
                    </p>

                    <div className="p-3 rounded-lg bg-[#F6F9FC] border border-[#DCE5EF]/60 text-xs text-[#263445] mb-6">
                      <span className="text-[#64748B] block mb-0.5">Authoritative Source:</span>
                      <p className="font-semibold text-[#102A43]">{item.source_org}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#DCE5EF]">
                    {item.link_url?.startsWith('http') ? (
                      <a
                        href={item.link_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-full gap-2 px-4 py-2 rounded-lg bg-[#174A8B] hover:bg-[#102A43] text-white font-medium text-xs transition-colors"
                      >
                        Visit Official Government Portal
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <Link
                        href={item.link_url || '/resources/glossary'}
                        className="inline-flex items-center justify-center w-full gap-2 px-4 py-2 rounded-lg bg-[#174A8B] hover:bg-[#102A43] text-white font-medium text-xs transition-colors"
                      >
                        Open Educational Guide
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </ClientLayout>
  );
}
