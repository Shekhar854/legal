'use client';

import { useState } from 'react';
import ClientLayout from '@/components/ClientLayout';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Search, HelpCircle } from 'lucide-react';

const glossaryTerms = [
  {
    term: 'Vakalatnama (वकालतनामा)',
    en: 'A written document signed by a litigant appointing an advocate to act, plead, and represent them before an Indian court.',
    hi: 'एक लिखित दस्तावेज जिस पर मुवक्किल द्वारा हस्ताक्षर करके किसी अधिवक्ता (वकील) को अदालत में अपने पक्ष की पैरवी करने का अधिकार दिया जाता है।',
    category: 'Court Procedure',
  },
  {
    term: 'Caveat (केविएट याचिका)',
    en: 'A precautionary application lodged by a party requesting the court not to pass any ex-parte order against them without giving prior notice.',
    hi: 'न्यायालय में दायर की जाने वाली एक पूर्व-सूचना अर्जी ताकि न्यायालय विरोधी पक्ष की बात सुनकर एकतरफा आदेश पारित न करे।',
    category: 'Civil Procedure',
  },
  {
    term: 'FIR - First Information Report (प्राथमिकी / एफआईआर)',
    en: 'The earliest written record prepared by the police when they receive information about the commission of a cognizable offence under CrPC / BNSS.',
    hi: 'पुलिस द्वारा संज्ञेय अपराध की सूचना मिलने पर दर्ज की जाने वाली पहली आधिकारिक लिखित रिपोर्ट।',
    category: 'Criminal Law',
  },
  {
    term: 'Anticipatory Bail (अग्रिम जमानत)',
    en: 'A court direction granted under Section 438 CrPC (or Section 482 BNSS) ordering the release of an individual on bail prior to being arrested in anticipation of false or malicious accusations.',
    hi: 'संभावित गिरफ्तारी से पहले न्यायालय (सत्र न्यायालय या उच्च न्यायालय) द्वारा प्रदान की जाने वाली अग्रिम जमानत।',
    category: 'Criminal Law',
  },
  {
    term: 'Injunction / Stay Order (स्थगन आदेश / व्यादेश)',
    en: 'A judicial order requiring a person to do, or refrain from doing, a specific act (such as restraining demolition or property sale until final verdict).',
    hi: 'न्यायालय द्वारा दिया गया आदेश जो किसी पक्ष को कोई विशिष्ट कार्य करने या रोकने (जैसे निर्माण या संपत्ति बेचने पर रोक) का निर्देश देता है।',
    category: 'Civil Litigation',
  },
  {
    term: 'Habeas Corpus (बंदी प्रत्यक्षीकरण)',
    en: 'A high prerogative constitutional writ issued by High Courts (Art. 226) or the Supreme Court (Art. 32) directing the production of a person unlawfully detained by state authorities.',
    hi: 'उच्च न्यायालय या सुप्रीम कोर्ट द्वारा जारी रिट, जिसमें अवैध रूप से हिरासत में लिए गए व्यक्ति को न्यायालय के समक्ष पेश करने का आदेश दिया जाता है।',
    category: 'Constitutional Law',
  },
  {
    term: 'Res Judicata (पूर्वनिर्णय का सिद्धांत)',
    en: 'The legal rule that once a competent court has finally decided an issue between the same parties, the matter cannot be litigated again.',
    hi: 'कानूनी नियम जिसके तहत यदि किसी सक्षम न्यायालय ने मामले का अंतिम फैसला कर दिया है, तो उसी मुद्दे पर दोबारा मुकदमा नहीं चलाया जा सकता।',
    category: 'Civil Procedure',
  },
  {
    term: 'Lok Adalat (लोक अदालत)',
    en: 'An alternative dispute resolution statutory forum under NALSA where pending or pre-litigation disputes are settled amicably without court fees.',
    hi: 'विधिक सेवा प्राधिकरण द्वारा आयोजित जन-अदालत जहां विवादों का आपसी समझौते और सौहार्दपूर्ण तरीके से निस्तारण किया जाता है।',
    category: 'Legal Aid & ADR',
  },
  {
    term: 'Affidavit (शपथ पत्र / हलफनामा)',
    en: 'A written statement of facts voluntarily made and confirmed by an oath or affirmation before an authorized oath commissioner or notary public.',
    hi: 'शपथ आयुक्त या नोटरी पब्लिक के समक्ष शपथपूर्वक दिया गया लिखित तथ्यात्मक बयान।',
    category: 'Court Procedure',
  },
  {
    term: 'Power of Attorney - POA (मुख्तारनामा)',
    en: 'A legal instrument empowering a designated agent to act on behalf of the principal in business, legal, financial, or property matters.',
    hi: 'एक विधिक दस्तावेज जिसके जरिए कोई व्यक्ति किसी अन्य विश्वसनीय व्यक्ति को अपने कानूनी या वित्तीय कार्य करने का अधिकार सौंपता है।',
    category: 'Property & Contracts',
  },
];

export default function GlossaryPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = glossaryTerms.filter(
    (item) =>
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.hi.includes(searchTerm)
  );

  return (
    <ClientLayout>
      <section className="bg-gradient-to-b from-[#102A43] to-[#174A8B] text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-sm text-blue-200 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Resources
          </Link>
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/10 text-blue-200 border border-white/20 mb-4">
              <BookOpen className="w-3.5 h-3.5" />
              Bilingual Legal Lexicon
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight mb-4">
              Legal Glossary (विधिक शब्दकोश)
            </h1>
            <p className="text-lg text-blue-100/90 leading-relaxed font-light">
              Clear, accessible explanations of Indian judicial terminology in English and Hindi for ordinary citizens.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-[#DCE5EF] py-6 sticky top-16 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search legal terms (e.g. Caveat, Bail, वकालतनामा)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#DCE5EF] focus:outline-hidden focus:border-[#174A8B] focus:ring-1 focus:ring-[#174A8B] bg-[#F6F9FC] text-sm"
            />
            <Search className="w-5 h-5 text-[#64748B] absolute left-3.5 top-3.5" />
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F6F9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-7 border border-[#DCE5EF] hover:border-[#174A8B]/30 hover:shadow-xs transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-serif font-bold text-[#102A43]">
                    {item.term}
                  </h2>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#EAF3FC] text-[#174A8B] font-medium">
                    {item.category}
                  </span>
                </div>

                <div className="space-y-3 mt-4 text-sm">
                  <div>
                    <span className="text-xs font-semibold text-[#174A8B] block mb-1">English Definition:</span>
                    <p className="text-[#263445] leading-relaxed">{item.en}</p>
                  </div>
                  <div className="pt-3 border-t border-[#DCE5EF]/60">
                    <span className="text-xs font-semibold text-[#174A8B] block mb-1">सरल हिन्दी व्याख्या:</span>
                    <p className="text-[#263445] leading-relaxed font-serif">{item.hi}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </ClientLayout>
  );
}
