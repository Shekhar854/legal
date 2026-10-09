export type Locale = 'en' | 'hi';

export const defaultLocale: Locale = 'en';

export const locales: Locale[] = ['en', 'hi'];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  hi: 'हिन्दी',
};

export type TranslationKey = keyof typeof translations.en;

export const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.practiceAreas': 'Practice Areas',
    'nav.ourWork': 'Our Work',
    'nav.insights': 'Insights',
    'nav.resources': 'Resources',
    'nav.publicHelp': 'Public Help',
    'nav.contact': 'Contact',
    'nav.submitComplaint': 'Submit a Complaint',

    // Resources dropdown
    'resources.legalGuides': 'Legal Guides',
    'resources.faq': 'Frequently Asked Questions',
    'resources.knowYourRights': 'Know Your Rights',
    'resources.documentGuides': 'Legal Document Guides',
    'resources.importantLinks': 'Important Legal Links',
    'resources.govSchemes': 'Government Schemes & Services',
    'resources.courtResources': 'Court & Tribunal Resources',
    'resources.glossary': 'Legal Glossary',
    'resources.downloads': 'Downloadable Resources',

    // Public Help dropdown
    'publicHelp.submitComplaint': 'Submit a Complaint',
    'publicHelp.requestAssistance': 'Request Legal Assistance',
    'publicHelp.petitions': 'Public Petitions',
    'publicHelp.trackSubmission': 'Track Submission',
    'publicHelp.faq': 'Frequently Asked Questions',

    // Hero
    'hero.title': 'Legal Information, Professional Services & Public Assistance',
    'hero.subtitle': 'Access reliable legal resources, submit complaints, and discover your rights — all in one place.',
    'hero.cta1': 'Explore Legal Resources',
    'hero.cta2': 'Submit a Complaint',

    // Introduction
    'intro.badge': 'About the Practice',
    'intro.title': 'Professional Legal Practice',
    'intro.description': 'A dedicated legal practice committed to providing accurate legal information, professional services, and public assistance to citizens across India.',
    'intro.experience': 'With a foundation in civil, criminal, and constitutional law, the practice serves individuals, families, and organizations seeking reliable legal guidance.',
    'intro.cta': 'View Complete Profile',

    // Practice Areas
    'practice.badge': 'Areas of Practice',
    'practice.title': 'Practice Areas',
    'practice.subtitle': 'Comprehensive legal services across key areas of Indian law.',
    'practice.civil': 'Civil Law',
    'practice.criminal': 'Criminal Law',
    'practice.property': 'Property & Real Estate',
    'practice.corporate': 'Corporate & Commercial',
    'practice.consumer': 'Consumer Protection',
    'practice.family': 'Family Law',
    'practice.constitutional': 'Constitutional & Public Law',
    'practice.employment': 'Employment & Labour',
    'practice.ip': 'Intellectual Property',
    'practice.dispute': 'Dispute Resolution',

    // Public Assistance
    'assistance.badge': 'Public Assistance',
    'assistance.title': 'How Can We Help You?',
    'assistance.subtitle': 'This platform is designed to make legal information accessible to every citizen.',
    'assistance.complaint.title': 'Submit a Complaint',
    'assistance.complaint.desc': 'Report an issue or seek guidance through our structured complaint form.',
    'assistance.petitions.title': 'Public Petitions',
    'assistance.petitions.desc': 'Explore and support public-interest petitions on important civic issues.',
    'assistance.resources.title': 'Legal Resources',
    'assistance.resources.desc': 'Access guides, FAQs, and legal information in simple, understandable language.',
    'assistance.disclaimer': 'Submitting a complaint through this platform does not constitute filing an FIR, court case, or official government grievance.',

    // Insights
    'insights.badge': 'Latest Insights',
    'insights.title': 'Legal Articles & Analysis',
    'insights.subtitle': 'Stay informed with articles on important legal topics, recent developments, and practical guidance.',
    'insights.readArticle': 'Read Article',
    'insights.readTime': 'min read',
    'insights.viewAll': 'View All Articles',

    // Resources
    'featuredResources.badge': 'Resources',
    'featuredResources.title': 'Featured Legal Resources',
    'featuredResources.subtitle': 'Curated guides and information to help you understand your legal rights and options.',

    // How It Works
    'howItWorks.badge': 'Getting Started',
    'howItWorks.title': 'How It Works',
    'howItWorks.step1.title': 'Find Information',
    'howItWorks.step1.desc': 'Browse our resources, guides, and articles to find the legal information you need.',
    'howItWorks.step2.title': 'Submit Your Request',
    'howItWorks.step2.desc': 'Use the appropriate form to submit a complaint, inquiry, or request for assistance.',
    'howItWorks.step3.title': 'Follow the Next Steps',
    'howItWorks.step3.desc': 'Receive confirmation and follow the provided instructions for your matter.',
    'howItWorks.note': 'Not every submission will receive legal representation. We provide guidance and referrals based on the nature of your request.',

    // Footer
    'footer.about': 'A professional legal practice combined with a public-interest information portal, making legal information accessible to every Indian citizen.',
    'footer.quickLinks': 'Quick Links',
    'footer.legalPages': 'Legal',
    'footer.disclaimer': 'Disclaimer',
    'footer.terms': 'Terms of Use',
    'footer.privacy': 'Privacy Policy',
    'footer.accessibility': 'Accessibility',
    'footer.sitemap': 'Sitemap',
    'footer.copyright': '© 2024 Legal Arjun. All rights reserved.',
    'footer.builtWith': 'Built for public service and access to justice.',

    // Disclaimer Modal
    'disclaimer.title': 'Disclaimer & Terms of Use',
    'disclaimer.text': 'This website provides general legal information for educational and informational purposes. It does not constitute legal advice, and no attorney-client relationship is created by using this website. The information on this website should not be used as a substitute for professional legal counsel. For specific legal matters, please consult a qualified legal professional.',
    'disclaimer.readFull': 'Read Full Disclaimer',
    'disclaimer.privacyLink': 'Privacy Policy',
    'disclaimer.termsLink': 'Terms of Use',
    'disclaimer.agree': 'I Agree & Continue',
    'disclaimer.decline': 'Decline & Exit',

    // Common
    'common.learnMore': 'Learn More',
    'common.readMore': 'Read More',
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.back': 'Back',
    'common.submit': 'Submit',
    'common.cancel': 'Cancel',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.all': 'All',
  },
  hi: {
    // Navigation
    'nav.home': 'होम',
    'nav.about': 'हमारे बारे में',
    'nav.practiceAreas': 'प्रैक्टिस क्षेत्र',
    'nav.ourWork': 'हमारा कार्य',
    'nav.insights': 'विचार और लेख',
    'nav.resources': 'संसाधन',
    'nav.publicHelp': 'सार्वजनिक सहायता',
    'nav.contact': 'संपर्क करें',
    'nav.submitComplaint': 'शिकायत दर्ज करें',

    // Resources dropdown
    'resources.legalGuides': 'कानूनी गाइड',
    'resources.faq': 'अक्सर पूछे जाने वाले प्रश्न',
    'resources.knowYourRights': 'अपने अधिकार जानें',
    'resources.documentGuides': 'कानूनी दस्तावेज़ गाइड',
    'resources.importantLinks': 'महत्वपूर्ण कानूनी लिंक',
    'resources.govSchemes': 'सरकारी योजनाएं और सेवाएं',
    'resources.courtResources': 'न्यायालय और न्यायाधिकरण संसाधन',
    'resources.glossary': 'कानूनी शब्दकोश',
    'resources.downloads': 'डाउनलोड करने योग्य संसाधन',

    // Public Help dropdown
    'publicHelp.submitComplaint': 'शिकायत दर्ज करें',
    'publicHelp.requestAssistance': 'कानूनी सहायता का अनुरोध',
    'publicHelp.petitions': 'सार्वजनिक याचिकाएं',
    'publicHelp.trackSubmission': 'सबमिशन ट्रैक करें',
    'publicHelp.faq': 'अक्सर पूछे जाने वाले प्रश्न',

    // Hero
    'hero.title': 'कानूनी जानकारी, पेशेवर सेवाएं और सार्वजनिक सहायता',
    'hero.subtitle': 'विश्वसनीय कानूनी संसाधनों तक पहुंचें, शिकायतें दर्ज करें, और अपने अधिकारों की खोज करें — सब एक ही जगह।',
    'hero.cta1': 'कानूनी संसाधन देखें',
    'hero.cta2': 'शिकायत दर्ज करें',

    // Introduction
    'intro.badge': 'प्रैक्टिस के बारे में',
    'intro.title': 'पेशेवर कानूनी प्रैक्टिस',
    'intro.description': 'एक समर्पित कानूनी प्रैक्टिस जो भारत भर के नागरिकों को सटीक कानूनी जानकारी, पेशेवर सेवाएं और सार्वजनिक सहायता प्रदान करने के लिए प्रतिबद्ध है।',
    'intro.experience': 'नागरिक, आपराधिक और संवैधानिक कानून की नींव के साथ, यह प्रैक्टिस विश्वसनीय कानूनी मार्गदर्शन की तलाश करने वाले व्यक्तियों, परिवारों और संगठनों की सेवा करती है।',
    'intro.cta': 'पूरी प्रोफ़ाइल देखें',

    // Practice Areas
    'practice.badge': 'प्रैक्टिस के क्षेत्र',
    'practice.title': 'प्रैक्टिस क्षेत्र',
    'practice.subtitle': 'भारतीय कानून के प्रमुख क्षेत्रों में व्यापक कानूनी सेवाएं।',
    'practice.civil': 'नागरिक कानून',
    'practice.criminal': 'आपराधिक कानून',
    'practice.property': 'संपत्ति और रियल एस्टेट',
    'practice.corporate': 'कॉर्पोरेट और वाणिज्यिक',
    'practice.consumer': 'उपभोक्ता संरक्षण',
    'practice.family': 'पारिवारिक कानून',
    'practice.constitutional': 'संवैधानिक और सार्वजनिक कानून',
    'practice.employment': 'रोजगार और श्रम',
    'practice.ip': 'बौद्धिक संपदा',
    'practice.dispute': 'विवाद समाधान',

    // Public Assistance
    'assistance.badge': 'सार्वजनिक सहायता',
    'assistance.title': 'हम आपकी कैसे मदद कर सकते हैं?',
    'assistance.subtitle': 'यह प्लेटफ़ॉर्म हर नागरिक के लिए कानूनी जानकारी को सुलभ बनाने के लिए बनाया गया है।',
    'assistance.complaint.title': 'शिकायत दर्ज करें',
    'assistance.complaint.desc': 'हमारे संरचित शिकायत फॉर्म के माध्यम से किसी मुद्दे की रिपोर्ट करें या मार्गदर्शन लें।',
    'assistance.petitions.title': 'सार्वजनिक याचिकाएं',
    'assistance.petitions.desc': 'महत्वपूर्ण नागरिक मुद्दों पर सार्वजनिक हित की याचिकाओं का अन्वेषण करें और समर्थन करें।',
    'assistance.resources.title': 'कानूनी संसाधन',
    'assistance.resources.desc': 'सरल, समझने योग्य भाषा में गाइड, FAQ और कानूनी जानकारी प्राप्त करें।',
    'assistance.disclaimer': 'इस प्लेटफ़ॉर्म के माध्यम से शिकायत दर्ज करना FIR, अदालती मामला, या आधिकारिक सरकारी शिकायत दर्ज करने के बराबर नहीं है।',

    // Insights
    'insights.badge': 'नवीनतम विचार',
    'insights.title': 'कानूनी लेख और विश्लेषण',
    'insights.subtitle': 'महत्वपूर्ण कानूनी विषयों, हालिया विकासों और व्यावहारिक मार्गदर्शन पर लेखों के साथ सूचित रहें।',
    'insights.readArticle': 'लेख पढ़ें',
    'insights.readTime': 'मिनट पढ़ें',
    'insights.viewAll': 'सभी लेख देखें',

    // Resources
    'featuredResources.badge': 'संसाधन',
    'featuredResources.title': 'विशेष कानूनी संसाधन',
    'featuredResources.subtitle': 'आपके कानूनी अधिकारों और विकल्पों को समझने में मदद करने के लिए क्यूरेटेड गाइड और जानकारी।',

    // How It Works
    'howItWorks.badge': 'शुरू करें',
    'howItWorks.title': 'यह कैसे काम करता है',
    'howItWorks.step1.title': 'जानकारी खोजें',
    'howItWorks.step1.desc': 'आपको आवश्यक कानूनी जानकारी खोजने के लिए हमारे संसाधनों, गाइडों और लेखों को ब्राउज़ करें।',
    'howItWorks.step2.title': 'अपना अनुरोध सबमिट करें',
    'howItWorks.step2.desc': 'शिकायत, पूछताछ, या सहायता के अनुरोध को सबमिट करने के लिए उपयुक्त फॉर्म का उपयोग करें।',
    'howItWorks.step3.title': 'अगले चरणों का पालन करें',
    'howItWorks.step3.desc': 'पुष्टि प्राप्त करें और अपने मामले के लिए दिए गए निर्देशों का पालन करें।',
    'howItWorks.note': 'हर सबमिशन को कानूनी प्रतिनिधित्व नहीं मिलेगा। हम आपके अनुरोध की प्रकृति के आधार पर मार्गदर्शन और रेफरल प्रदान करते हैं।',

    // Footer
    'footer.about': 'एक पेशेवर कानूनी प्रैक्टिस जो एक सार्वजनिक हित सूचना पोर्टल के साथ मिलकर हर भारतीय नागरिक के लिए कानूनी जानकारी को सुलभ बनाती है।',
    'footer.quickLinks': 'त्वरित लिंक',
    'footer.legalPages': 'कानूनी',
    'footer.disclaimer': 'अस्वीकरण',
    'footer.terms': 'उपयोग की शर्तें',
    'footer.privacy': 'गोपनीयता नीति',
    'footer.accessibility': 'सुगम्यता',
    'footer.sitemap': 'साइटमैप',
    'footer.copyright': '© 2024 लीगल अर्जुन। सर्वाधिकार सुरक्षित।',
    'footer.builtWith': 'सार्वजनिक सेवा और न्याय तक पहुंच के लिए निर्मित।',

    // Disclaimer Modal
    'disclaimer.title': 'अस्वीकरण और उपयोग की शर्तें',
    'disclaimer.text': 'यह वेबसाइट शैक्षिक और सूचनात्मक उद्देश्यों के लिए सामान्य कानूनी जानकारी प्रदान करती है। यह कानूनी सलाह नहीं है, और इस वेबसाइट का उपयोग करने से कोई वकील-मुवक्किल संबंध नहीं बनता है। इस वेबसाइट पर दी गई जानकारी का उपयोग पेशेवर कानूनी परामर्श के विकल्प के रूप में नहीं किया जाना चाहिए।',
    'disclaimer.readFull': 'पूरा अस्वीकरण पढ़ें',
    'disclaimer.privacyLink': 'गोपनीयता नीति',
    'disclaimer.termsLink': 'उपयोग की शर्तें',
    'disclaimer.agree': 'मैं सहमत हूं और जारी रखें',
    'disclaimer.decline': 'अस्वीकार करें और बाहर निकलें',

    // Common
    'common.learnMore': 'और जानें',
    'common.readMore': 'और पढ़ें',
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'एक त्रुटि हुई',
    'common.back': 'वापस',
    'common.submit': 'सबमिट करें',
    'common.cancel': 'रद्द करें',
    'common.search': 'खोजें',
    'common.filter': 'फ़िल्टर',
    'common.all': 'सभी',
  },
} as const;

export function t(key: string, locale: Locale = defaultLocale): string {
  const dict = translations[locale];
  return (dict as Record<string, string>)[key] || (translations.en as Record<string, string>)[key] || key;
}
