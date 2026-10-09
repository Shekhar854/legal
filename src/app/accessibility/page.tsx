import ClientLayout from '@/components/ClientLayout';
import { CheckCircle2, Eye, Globe } from 'lucide-react';

export default function AccessibilityPage() {
  return (
    <ClientLayout>
      <section className="bg-gradient-to-b from-[#102A43] to-[#174A8B] text-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/10 text-blue-200 border border-white/20 mb-4">
            <Eye className="w-3.5 h-3.5" />
            Universal Access
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight mb-4">
            Accessibility Statement
          </h1>
          <p className="text-lg text-blue-100/90 leading-relaxed font-light">
            Our commitment to digital inclusion for all citizens, including individuals with disabilities or low digital literacy.
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#F6F9FC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 sm:p-12 border border-[#DCE5EF] shadow-sm space-y-8 text-[#263445] leading-relaxed">
            
            <div className="space-y-4">
              <h2 className="text-xl font-serif font-bold text-[#102A43]">
                Web Accessibility Guidelines (WCAG 2.1 AA)
              </h2>
              <p className="text-sm sm:text-base">
                Legal Arjun strives to ensure that its services and online content are accessible to all people, including those with visual, auditory, cognitive, or motor impairments. We target Level AA conformance with the Web Content Accessibility Guidelines (WCAG 2.1).
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-serif font-bold text-[#102A43]">
                Implemented Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#F6F9FC] border border-[#DCE5EF] flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#059669] shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-bold text-[#102A43] block mb-1">High Contrast Text</span>
                    <p className="text-[#64748B]">Color ratios exceed 4.5:1 for effortless reading.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#F6F9FC] border border-[#DCE5EF] flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#059669] shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-bold text-[#102A43] block mb-1">Bilingual Support (हिन्दी)</span>
                    <p className="text-[#64748B]">Content and navigation accessible in Hindi and English.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#F6F9FC] border border-[#DCE5EF] flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#059669] shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-bold text-[#102A43] block mb-1">Keyboard Navigation</span>
                    <p className="text-[#64748B]">Full tab order and visible focus states across forms.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#F6F9FC] border border-[#DCE5EF] flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#059669] shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-bold text-[#102A43] block mb-1">Plain Language First</span>
                    <p className="text-[#64748B]">Demystified legal terms for first-time internet users.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#DCE5EF] text-xs text-[#64748B]">
              <p>For accessibility feedback or assistance, email <code>accessibility@legalarjun.com</code>.</p>
            </div>

          </div>
        </div>
      </section>
    </ClientLayout>
  );
}
