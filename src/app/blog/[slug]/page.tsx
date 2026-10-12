import ClientLayout from '@/components/ClientLayout';
import Link from 'next/link';
import db from '@/lib/db';
import { notFound } from 'next/navigation';
import { ArrowLeft, BookOpen, Calendar, Clock, FileText, Share2, ShieldAlert, Tag, User } from 'lucide-react';

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

  // Parse content blocks for rendering
  const renderContentBlock = (paragraph: string, idx: number) => {
    // Image: ![alt](url)
    const imageMatch = paragraph.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imageMatch) {
      return (
        <figure key={idx} className="my-6">
          <img
            src={imageMatch[2]}
            alt={imageMatch[1]}
            className="w-full rounded-lg border border-[#DCE5EF] shadow-sm"
          />
          {imageMatch[1] && (
            <figcaption className="text-xs text-[#64748B] text-center mt-2 italic">
              {imageMatch[1]}
            </figcaption>
          )}
        </figure>
      );
    }

    // Video: [VIDEO](url)
    const videoMatch = paragraph.match(/^\[VIDEO\]\(([^)]+)\)$/);
    if (videoMatch) {
      return (
        <div key={idx} className="my-6">
          <video
            src={videoMatch[1]}
            controls
            className="w-full rounded-lg border border-[#DCE5EF] shadow-sm"
          />
        </div>
      );
    }

    // PDF/Document link: [📄 filename](url)
    const docMatch = paragraph.match(/^\[📄\s*([^\]]+)\]\(([^)]+)\)$/);
    if (docMatch) {
      return (
        <a
          key={idx}
          href={docMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="my-4 flex items-center gap-3 p-4 rounded-lg bg-[#EAF3FC] border border-[#174A8B]/20 hover:bg-[#DCE5EF] transition-colors"
        >
          <FileText className="w-8 h-8 text-[#174A8B] shrink-0" />
          <div>
            <span className="text-sm font-semibold text-[#102A43] block">{docMatch[1]}</span>
            <span className="text-xs text-[#64748B]">Click to view or download document</span>
          </div>
        </a>
      );
    }

    // Heading H2: ### text
    if (paragraph.startsWith('### ')) {
      return (
        <h3 key={idx} className="text-2xl font-serif font-bold text-[#102A43] pt-6 pb-2 border-b border-[#DCE5EF]">
          {paragraph.replace('### ', '')}
        </h3>
      );
    }

    // Heading H3: #### text
    if (paragraph.startsWith('#### ')) {
      return (
        <h4 key={idx} className="text-xl font-serif font-bold text-[#102A43] pt-4">
          {paragraph.replace('#### ', '')}
        </h4>
      );
    }

    // Blockquote: > text
    if (paragraph.startsWith('> ')) {
      return (
        <blockquote key={idx} className="pl-4 border-l-4 border-[#174A8B] text-[#64748B] italic my-4 text-sm sm:text-base">
          {paragraph.replace(/^> /, '')}
        </blockquote>
      );
    }

    // List items
    if (paragraph.startsWith('- ') || paragraph.startsWith('* ') || /^\d+\.\s/.test(paragraph)) {
      const items = paragraph.split('\n');
      const isOrdered = /^\d+\./.test(items[0]);
      const ListTag = isOrdered ? 'ol' : 'ul';
      return (
        <ListTag key={idx} className={`space-y-2 ${isOrdered ? 'list-decimal' : 'list-disc'} pl-5 text-sm sm:text-base text-[#263445]`}>
          {items.map((it: string, i: number) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: formatInlineText(it.replace(/^[-*]\s*|\d+\.\s*/, '')) }} />
          ))}
        </ListTag>
      );
    }

    // Regular paragraph with inline formatting
    return (
      <p key={idx} className="text-sm sm:text-base text-[#263445] leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInlineText(paragraph) }} />
    );
  };

  // Format inline text (bold, italic, links, inline images)
  function formatInlineText(text: string): string {
    return text
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="inline-block rounded my-2 max-w-full" />')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#174A8B] underline font-medium" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>');
  }

  return (
    <ClientLayout>
      {/* Cover Image Banner */}
      {article.cover_image && (
        <div className="relative w-full h-64 sm:h-80 lg:h-96 overflow-hidden">
          <img
            src={article.cover_image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#102A43]/60 via-[#102A43]/30 to-[#102A43]" />
        </div>
      )}

      {/* Blog Header */}
      <section className={`bg-gradient-to-b from-[#102A43] to-[#174A8B] text-white ${article.cover_image ? 'py-10 lg:py-14 -mt-20 relative z-10' : 'py-16 lg:py-20'}`}>
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

            {/* Content with proper media rendering */}
            <div className="prose prose-slate max-w-none text-[#263445] leading-relaxed space-y-6 text-base sm:text-lg">
              {article.content.split('\n\n').map((paragraph: string, idx: number) => renderContentBlock(paragraph.trim(), idx))}
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
                    className="bg-white rounded-xl overflow-hidden border border-[#DCE5EF] hover:border-[#174A8B]/40 hover:shadow-md transition-all block group"
                  >
                    {rel.cover_image && (
                      <div className="h-36 overflow-hidden">
                        <img
                          src={rel.cover_image}
                          alt={rel.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <span className="text-xs font-semibold text-[#174A8B] uppercase tracking-wider block mb-2">
                        {rel.category}
                      </span>
                      <h4 className="font-serif font-bold text-lg text-[#102A43] group-hover:text-[#174A8B] transition-colors mb-2">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-[#64748B] line-clamp-2">
                        {rel.summary}
                      </p>
                    </div>
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

