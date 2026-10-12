'use client';

import { useState, useEffect } from 'react';
import ClientLayout from '@/components/ClientLayout';
import Link from 'next/link';
import { ArrowRight, BookOpen, Calendar, Clock, Filter, Newspaper, Search, ShieldCheck, Tag, User } from 'lucide-react';

export default function BlogPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const categories = [
    'All',
    'Citizen Rights & Police Procedure',
    'Cyber Safety & Fraud Recovery',
    'Tenancy & Housing Law',
    'Consumer Rights',
    'Property & Real Estate',
    'Public Transparency & RTI',
    'Family & Senior Citizen Rights',
    'Data Privacy & Technology',
  ];

  useEffect(() => {
    fetchArticles();
  }, [selectedCategory]);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      let url = '/api/insights?status=published';
      if (selectedCategory !== 'All') {
        url += `&category=${encodeURIComponent(selectedCategory)}`;
      }
      if (searchQuery.trim()) {
        url += `&search=${encodeURIComponent(searchQuery.trim())}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      if (data.articles) {
        setArticles(data.articles);
      }
    } catch (err) {
      console.error('Fetch articles error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchArticles();
  };

  return (
    <ClientLayout>
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#102A43] to-[#174A8B] text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/10 text-blue-200 border border-white/20 mb-6">
              <Newspaper className="w-3.5 h-3.5" />
              Legal Blog & Citizen Assistance Guides
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight mb-6">
              Legal Blog & Public Help Guides
            </h1>
            <p className="text-lg sm:text-xl text-blue-100/90 leading-relaxed font-light">
              Plain-language legal explanations, statutory awareness, police procedural rights, consumer redressal, and everyday protections for Indian citizens.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="bg-white border-b border-[#DCE5EF] py-6 sticky top-16 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
              <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider hidden xl:inline-block mr-1">
                Filter:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#174A8B] text-white shadow-xs'
                      : 'bg-[#F6F9FC] text-[#263445] hover:bg-[#EAF3FC] border border-[#DCE5EF]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="w-full lg:w-80 relative shrink-0">
              <input
                type="text"
                placeholder="Search legal topics, FIR, RTI..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-[#DCE5EF] focus:outline-hidden focus:border-[#174A8B] focus:ring-1 focus:ring-[#174A8B] bg-[#F6F9FC]"
              />
              <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-3" />
            </form>

          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-[#F6F9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="py-20 text-center">
              <div className="inline-block w-8 h-8 border-4 border-[#174A8B] border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-[#64748B] text-sm">Loading legal blog posts...</p>
            </div>
          ) : articles.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center max-w-xl mx-auto border border-[#DCE5EF]">
              <BookOpen className="w-12 h-12 text-[#64748B] mx-auto mb-4" />
              <h3 className="text-lg font-serif font-bold text-[#102A43] mb-2">No articles found</h3>
              <p className="text-sm text-[#64748B] mb-6">
                Try searching with different keywords or clear the category filter.
              </p>
              <button
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                className="px-4 py-2 rounded-lg bg-[#174A8B] text-white text-xs font-semibold hover:bg-[#102A43] cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((art) => (
                <article
                  key={art.slug}
                  className="bg-white rounded-xl overflow-hidden border border-[#DCE5EF] hover:border-[#174A8B]/40 hover:shadow-lg transition-all flex flex-col justify-between group"
                >
                  {/* Cover Image */}
                  {art.cover_image && (
                    <Link href={`/blog/${art.slug}`}>
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={art.cover_image}
                          alt={art.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      </div>
                    </Link>
                  )}

                  <div className="p-7">
                    <div className="flex items-center justify-between text-xs text-[#64748B] mb-4">
                      <span className="px-3 py-1 rounded-full bg-[#EAF3FC] text-[#174A8B] font-semibold text-[11px]">
                        {art.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{art.read_time || '5 min read'}</span>
                      </div>
                    </div>

                    <h2 className="text-xl font-serif font-bold text-[#102A43] group-hover:text-[#174A8B] transition-colors mb-3 leading-snug">
                      <Link href={`/blog/${art.slug}`}>
                        {art.title}
                      </Link>
                    </h2>

                    {art.title_hi && (
                      <p className="text-xs text-[#174A8B] font-serif mb-3 line-clamp-1">
                        {art.title_hi}
                      </p>
                    )}

                    <p className="text-sm text-[#64748B] leading-relaxed line-clamp-3 mb-6">
                      {art.summary}
                    </p>
                  </div>

                  <div className="p-7 pt-0 border-t border-[#DCE5EF]/60 mt-auto">
                    <div className="flex items-center justify-between pt-4">
                      <div className="flex items-center gap-2 text-xs text-[#64748B]">
                        <img
                          src="/images/arjun-panwar.jpg"
                          alt="Adv. Arjun Panwar"
                          className="w-5 h-5 rounded-full object-cover"
                        />
                        <span>{art.author || 'Adv. Arjun Panwar'}</span>
                      </div>
                      <Link
                        href={`/blog/${art.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#174A8B] group-hover:text-[#102A43]"
                      >
                        Read Guide
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </ClientLayout>
  );
}
