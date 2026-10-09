import ClientLayout from '@/components/ClientLayout';
import Link from 'next/link';
import db from '@/lib/db';
import { notFound } from 'next/navigation';
import { ArrowLeft, BookOpen, Calendar, Clock, Share2, ShieldAlert, Tag, User } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const article = db.prepare('SELECT * FROM articles WHERE slug = ?').get(slug) as any;

  if (!article) {
    notFound();
  }

  // Related articles in same category
  const related = db.prepare('SELECT * FROM articles WHERE slug != ? AND category = ? LIMIT 2').all(slug, article.category) as any[];

  return (
    <ClientLayout>
      {/* Blog Header */}
      <section className="bg-gradient-to-b from-[#102A43] to-[#174A8B] text-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-blue-200 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Legal Blog & Guides
          </Link>

          <div>
            <div className="flex flex-wrap items-center gap-3 text-xs mb-4">
              <span className="px-3 py-1 rounded-full bg-white/10 text-blue-200 border border-white/20 font-semibold uppercase tracking-wider">
                {article.category}
              </span>
              <span className="flex items-center gap-1 text-blue-200">
                <Clock className="w-3.5 h-3.5" />
                {article.read_time || '5 min read'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight mb-4">
              {article.title}
            </h1>

            {article.title_hi && (
              <p className="text-lg sm:text-xl text-blue-200 font-serif mb-6 leading-relaxed">
                {article.title_hi}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/10 text-sm text-blue-100">
              <div className="flex items-center gap-2.5">
                <img
                  src="/images/arjun-panwar.jpg"
                  alt="Adv. Arjun Panwar"
                  className="w-9 h-9 rounded-full object-cover border-2 border-white/60 shadow-xs"
                />
                <span className="font-medium text-white">{article.author || 'Adv. Arjun Panwar'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Calendar className="w-4 h-4 text-blue-200" />
                <span>Published on {new Date(article.published_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Blog Body */}
      <section className="py-16 bg-[#F6F9FC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 sm:p-12 border border-[#DCE5EF] shadow-sm">
            
            {/* Article Summary Lead */}
            <div className="p-6 rounded-xl bg-[#EAF3FC]/50 border border-[#174A8B]/20 mb-10 text-base sm:text-lg text-[#102A43] font-medium leading-relaxed">
              {article.summary}
            </div>

            {/* Content formatted with clean typography */}
            <div className="prose prose-slate max-w-none text-[#263445] leading-relaxed space-y-6 text-base sm:text-lg">
              {article.content.split('\n\n').map((paragraph: string, idx: number) => {
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={idx} className="text-2xl font-serif font-bold text-[#102A43] pt-6 pb-2 border-b border-[#DCE5EF]">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                if (paragraph.startsWith('#### ')) {
                  return (
                    <h4 key={idx} className="text-xl font-serif font-bold text-[#102A43] pt-4">
                      {paragraph.replace('#### ', '')}
                    </h4>
                  );
                }
                if (paragraph.startsWith('- ') || paragraph.startsWith('1. ') || paragraph.startsWith('* ')) {
                  const items = paragraph.split('\n');
                  return (
                    <ul key={idx} className="space-y-2 list-disc pl-5 text-sm sm:text-base text-[#263445]">
                      {items.map((it: string, i: number) => (
                        <li key={i}>{it.replace(/^[-*]|\d+\.\s*/, '')}</li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={idx} className="text-sm sm:text-base text-[#263445] leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Tags */}
            {article.tags && (
              <div className="mt-12 pt-6 border-t border-[#DCE5EF] flex flex-wrap items-center gap-2">
                <Tag className="w-4 h-4 text-[#64748B] mr-2" />
                {article.tags.split(',').map((tag: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-md bg-[#F6F9FC] text-xs font-medium text-[#64748B] border border-[#DCE5EF]"
                  >
                    #{tag.trim()}
                  </span>
                ))}
              </div>
            )}

            {/* Disclaimer Footer in Article */}
            <div className="mt-10 p-5 rounded-xl bg-[#F6F9FC] border border-[#DCE5EF] flex items-start gap-3 text-xs text-[#64748B]">
              <ShieldAlert className="w-5 h-5 text-[#174A8B] shrink-0 mt-0.5" />
              <p>
                <strong>Educational Notice:</strong> This article is authored strictly for academic and public legal awareness under the Bar Council of India Rule 36 norms. It is not an alternative to individual legal advice. Readers should seek qualified counsel before taking action based on any legal matter discussed herein.
              </p>
            </div>

          </div>

          {/* Related Articles */}
          {related.length > 0 && (
            <div className="mt-16">
              <h3 className="text-2xl font-serif font-bold text-[#102A43] mb-6">
                Related Legal Blog Posts
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {related.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/blog/${rel.slug}`}
                    className="bg-white p-6 rounded-xl border border-[#DCE5EF] hover:border-[#174A8B]/40 hover:shadow-md transition-all block group"
                  >
                    <span className="text-xs font-semibold text-[#174A8B] uppercase tracking-wider block mb-2">
                      {rel.category}
                    </span>
                    <h4 className="font-serif font-bold text-lg text-[#102A43] group-hover:text-[#174A8B] transition-colors mb-2">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-[#64748B] line-clamp-2">
                      {rel.summary}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </ClientLayout>
  );
}
