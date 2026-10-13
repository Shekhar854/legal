import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';

const isVercel = process.env.VERCEL === '1' || process.env.AWS_LAMBDA_FUNCTION_NAME !== undefined;

let dbPath: string;

if (isVercel) {
  dbPath = path.join('/tmp', 'legalarjun.db');
  const sourcePath = path.join(process.cwd(), 'legalarjun.db');
  try {
    if (!fs.existsSync(dbPath) && fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, dbPath);
    }
  } catch (copyErr) {
    console.error('Failed to copy db to /tmp:', copyErr);
  }
} else {
  dbPath = path.join(process.cwd(), 'legalarjun.db');
}

const db = new Database(dbPath);

// Enable WAL mode when possible
try {
  db.pragma('journal_mode = WAL');
} catch (e) {
  // Ignored in serverless containers
}

// Initialize schema
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'super_admin',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS sessions (
    token TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    expires_at DATETIME NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    title_hi TEXT,
    summary TEXT NOT NULL,
    summary_hi TEXT,
    content TEXT NOT NULL,
    content_hi TEXT,
    category TEXT NOT NULL,
    author TEXT NOT NULL DEFAULT 'Adv. Arjun Panwar',
    status TEXT NOT NULL DEFAULT 'published',
    read_time TEXT DEFAULT '5 min read',
    tags TEXT DEFAULT '',
    published_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS practice_areas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    title_hi TEXT,
    icon TEXT,
    short_desc TEXT NOT NULL,
    short_desc_hi TEXT,
    overview TEXT NOT NULL,
    key_laws TEXT,
    faqs_json TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS case_studies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    subject_matter TEXT NOT NULL,
    legal_issue TEXT NOT NULL,
    principles TEXT NOT NULL,
    approach TEXT NOT NULL,
    outcome TEXT NOT NULL,
    date TEXT NOT NULL,
    is_published INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS resources (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    title_hi TEXT,
    summary TEXT NOT NULL,
    summary_hi TEXT,
    category TEXT NOT NULL,
    link_url TEXT,
    download_url TEXT,
    language TEXT DEFAULT 'English / हिन्दी',
    source_org TEXT NOT NULL,
    review_status TEXT DEFAULT 'Verified Official Source',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS complaints (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ref_number TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    contact_method TEXT DEFAULT 'email',
    state TEXT NOT NULL,
    district TEXT NOT NULL,
    category TEXT NOT NULL,
    subject TEXT NOT NULL,
    description TEXT NOT NULL,
    incident_date TEXT,
    status TEXT DEFAULT 'Submitted',
    admin_notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS petitions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    title_hi TEXT,
    category TEXT NOT NULL,
    location TEXT NOT NULL,
    description TEXT NOT NULL,
    proposed_action TEXT NOT NULL,
    target_recipient TEXT NOT NULL,
    creator_name TEXT NOT NULL,
    creator_email TEXT NOT NULL,
    status TEXT DEFAULT 'Approved',
    target_signatures INTEGER DEFAULT 500,
    current_signatures INTEGER DEFAULT 0,
    closing_date TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS petition_supporters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    petition_id INTEGER NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    city TEXT,
    state TEXT,
    verified INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(petition_id) REFERENCES petitions(id),
    UNIQUE(petition_id, email)
  );

  CREATE TABLE IF NOT EXISTS contact_inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    preferred_language TEXT DEFAULT 'en',
    status TEXT DEFAULT 'New',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS audit_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    user_email TEXT,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT,
    details TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Migrations: add cover_image column if it doesn't exist
try {
  db.prepare("SELECT cover_image FROM articles LIMIT 1").get();
} catch {
  db.exec("ALTER TABLE articles ADD COLUMN cover_image TEXT DEFAULT NULL");
}

// Migrations: add phone columns to users if they don't exist
try {
  db.prepare("SELECT phone FROM users LIMIT 1").get();
} catch {
  try {
    db.exec("ALTER TABLE users ADD COLUMN phone TEXT");
  } catch {}
  try {
    db.exec("ALTER TABLE users ADD COLUMN is_phone_verified INTEGER DEFAULT 0");
  } catch {}
}

// Ensure email_otps table exists for 2-Factor Authentication
db.exec(`
  CREATE TABLE IF NOT EXISTS email_otps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    otp_code TEXT NOT NULL,
    temp_token TEXT NOT NULL UNIQUE,
    user_id INTEGER NOT NULL,
    expires_at DATETIME NOT NULL,
    attempts INTEGER DEFAULT 0,
    verified INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE INDEX IF NOT EXISTS idx_email_otps_token ON email_otps(temp_token);
`);

// Password hashing helpers using native crypto PBKDF2
export function hashPassword(password: string): string {
  const salt = 'legal_arjun_salt_2026';
  return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

// Seed initial data if empty
function seedDatabase() {
  const arjunPass = hashPassword('Arjun@1234');
  const adminEmails = [
    { email: 'Arjun@legal', name: 'Adv. Arjun Panwar (Super Admin)' },
    { email: 'shekharthathera@gmail.com', name: 'Adv. Arjun Panwar (Super Admin)' },
    { email: 'thatherashekhar8@gmail.com', name: 'Adv. Arjun Panwar (Admin)' },
    { email: 'thatherashekhar@gmail.com', name: 'Adv. Arjun Panwar (Admin)' },
    { email: 'impzccc@gmail.com', name: 'Adv. Arjun Panwar (Admin)' },
  ];

  for (const item of adminEmails) {
    const existing = db.prepare('SELECT id FROM users WHERE LOWER(email) = LOWER(?)').get(item.email) as { id: number } | undefined;
    if (!existing) {
      db.prepare(`
        INSERT INTO users (name, email, password_hash, role)
        VALUES (?, ?, ?, 'super_admin')
      `).run(item.name, item.email, arjunPass);
    } else {
      db.prepare('UPDATE users SET password_hash = ?, role = ? WHERE id = ?').run(arjunPass, 'super_admin', existing.id);
    }
  }

  const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number };
  if (userCount.count <= 3) {
    const adminPass = hashPassword('Admin@2026!');
    db.prepare(`
      INSERT OR IGNORE INTO users (name, email, password_hash, role)
      VALUES (?, ?, ?, 'super_admin')
    `).run('Adv. Arjun Panwar (Admin)', 'admin@legalarjun.com', adminPass);

    db.prepare(`
      INSERT OR IGNORE INTO users (name, email, password_hash, role)
      VALUES (?, ?, ?, 'complaint_manager')
    `).run('Pooja Verma (Complaint Manager)', 'pooja@legalarjun.com', hashPassword('Staff@2026!'));
  }

  // Seed Practice Areas
  const paCount = db.prepare('SELECT COUNT(*) as count FROM practice_areas').get() as { count: number };
  if (paCount.count === 0) {
    const areas = [
      {
        slug: 'constitutional-public-interest',
        title: 'Constitutional & Public Interest Law',
        title_hi: 'संवैधानिक एवं जनहित विधि',
        icon: 'Scale',
        short_desc: 'Protecting fundamental rights, public interest litigation (PIL), writ petitions before High Courts and Supreme Court.',
        short_desc_hi: 'मौलिक अधिकारों की रक्षा, जनहित याचिका (PIL) तथा उच्च न्यायालयों एवं उच्चतम न्यायालय में रिट याचिकाएं।',
        overview: 'Constitutional law forms the bedrock of individual liberty and governance in India. We represent citizens and civic collectives under Article 32 and Article 226 of the Constitution of India in matters affecting fundamental rights, environmental preservation, right to information, and arbitrary state action.',
        key_laws: 'Constitution of India (Articles 14, 19, 21, 32, 226); Right to Information Act, 2005; Public Interest Litigation Rules.',
        faqs_json: JSON.stringify([
          { q: 'Who can file a Public Interest Litigation (PIL)?', a: 'Any public-spirited citizen or registered civil organization can approach the High Court or Supreme Court on behalf of underprivileged groups or on vital public concern matters where fundamental rights are infringed.' },
          { q: 'What is the difference between Article 32 and Article 226?', a: 'Article 32 allows citizens to approach the Supreme Court strictly for fundamental right violations. Article 226 empowers High Courts for fundamental rights as well as other legal right violations.' }
        ])
      },
      {
        slug: 'civil-commercial-disputes',
        title: 'Civil & Commercial Litigation',
        title_hi: 'दीवानी एवं वाणिज्यिक मुकदमेबाजी',
        icon: 'Briefcase',
        short_desc: 'Contractual disputes, property title claims, recovery suits, injunctions, and commercial court proceedings.',
        short_desc_hi: 'संविदात्मक विवाद, संपत्ति स्वामित्व वाद, वसूली मुकदमे, व्यादेश एवं वाणिज्यिक न्यायालय कार्यवाही।',
        overview: 'Comprehensive representation in original and appellate civil litigation before District Courts, Commercial Courts, and High Courts. We advise on contract enforcement, specific performance, debt recovery, declaratory suits, and interim injunctions.',
        key_laws: 'Code of Civil Procedure, 1908; Indian Contract Act, 1872; Specific Relief Act, 1963; Commercial Courts Act, 2015.',
        faqs_json: JSON.stringify([
          { q: 'What is a mandatory interim injunction?', a: 'It is an urgent court order compelling or restraining a party to preserve the status quo until trial completion.' },
          { q: 'What is the limitation period for civil recovery suits?', a: 'Under the Limitation Act, 1963, most money recovery claims must be filed within 3 years from the cause of action.' }
        ])
      },
      {
        slug: 'consumer-protection',
        title: 'Consumer Protection & Fair Trade',
        title_hi: 'उपभोक्ता संरक्षण एवं निष्पक्ष व्यापार',
        icon: 'ShieldCheck',
        short_desc: 'Redressal against unfair trade practices, defective goods, deficient medical/hospitality services, and builder delays.',
        short_desc_hi: 'अनुचित व्यापार प्रथाओं, दोषपूर्ण वस्तुओं, सेवा में कमी तथा बिल्डर देरी के विरुद्ध न्याय।',
        overview: 'The Consumer Protection Act, 2019 revolutionized consumer justice by establishing the Central Consumer Protection Authority (CCPA), e-filing (e-Daakhil), and strict product liability. We assist consumers and consumer associations before District, State, and National Consumer Commissions (NCDRC).',
        key_laws: 'Consumer Protection Act, 2019; Consumer Protection (E-Commerce) Rules, 2020; RERA Act, 2016.',
        faqs_json: JSON.stringify([
          { q: 'Can I file a consumer complaint online?', a: 'Yes, complaints can be filed via the national e-Daakhil portal without mandatory physical presence at preliminary stages.' },
          { q: 'What is the pecuniary jurisdiction of District Consumer Commissions?', a: 'District Commissions handle claims up to ₹50 Lakhs (revised threshold under the 2021 jurisdictional notification).' }
        ])
      },
      {
        slug: 'property-real-estate',
        title: 'Property & Real Estate Law',
        title_hi: 'संपत्ति एवं अचल संपत्ति विधि',
        icon: 'Home',
        short_desc: 'Title verification, sale deed drafting, tenancy disputes, partition suits, inheritance, and RERA claims.',
        short_desc_hi: 'स्वामित्व सत्यापन, विक्रय विलेख, किरायेदारी विवाद, बटवारा वाद, उत्तराधिकार एवं रेरा शिकायतें।',
        overview: 'Navigating real estate transactions and ancestral property inheritance requires meticulous diligence. We provide non-contentious legal audit of property titles and litigate boundary, partition, and developer compliance matters.',
        key_laws: 'Transfer of Property Act, 1882; Registration Act, 1908; Real Estate (Regulation and Development) Act, 2016; Indian Succession Act, 1925.',
        faqs_json: JSON.stringify([
          { q: 'What is legal title due diligence?', a: 'A thorough 30-year search of encumbrance certificates, revenue records, approved building sanctions, and succession title trail.' },
          { q: 'How does RERA protect homebuyers?', a: 'RERA mandates escrow accounting of 70% project funds, timely handover, compensation with interest for delays, and structural defect repair for 5 years.' }
        ])
      },
      {
        slug: 'employment-labour-rights',
        title: 'Employment & Labour Law',
        title_hi: 'रोजगार एवं श्रम कानून',
        icon: 'Users',
        short_desc: 'Workplace disputes, unlawful termination, gratuity, POSH compliance, industrial disputes, and executive contracts.',
        short_desc_hi: 'कार्यस्थल विवाद, गैरकानूनी बर्खास्तगी, ग्रेच्युटी, पॉश अनुपालन, औद्योगिक विवाद एवं रोजगार अनुबंध।',
        overview: 'Balancing fair workplace rights with regulatory compliance. We advise employees, trade unions, and organizations on POSH compliance (prevention of sexual harassment), employee separation terms, non-compete clauses, and Industrial Disputes Act proceedings.',
        key_laws: 'Industrial Disputes Act, 1947; POSH Act, 2013; Payment of Gratuity Act, 1972; The 4 Labour Codes.',
        faqs_json: JSON.stringify([
          { q: 'Is every workplace required to have an Internal Committee under POSH?', a: 'Yes, every workplace employing 10 or more workers is legally mandated to constitute an Internal Committee headed by a senior woman employee.' },
          { q: 'When is gratuity payable?', a: 'Gratuity is payable on retirement, resignation, or death after completing a minimum of 5 years continuous service in an establishment with 10+ employees.' }
        ])
      },
      {
        slug: 'cyber-law-privacy',
        title: 'Cyber Law, Data Protection & Media',
        title_hi: 'साइबर कानून, डेटा संरक्षण एवं डिजिटल अधिकार',
        icon: 'Lock',
        short_desc: 'Digital fraud recovery, online defamation, DPDP Act compliance, cybercrime police complaints, and data privacy.',
        short_desc_hi: 'डिजिटल धोखाधड़ी, ऑनलाइन मानहानि, डीपीडीपी अधिनियम अनुपालन, साइबर अपराध एवं डेटा गोपनीयता।',
        overview: 'Digital transformation brings critical challenges in financial cyber fraud, deepfakes, copyright infringement, and data security. We guide victims of cyber fraud through golden-hour bank freezing and regulatory complaint filings, and advise entities on Digital Personal Data Protection (DPDP) compliance.',
        key_laws: 'Information Technology Act, 2000; Digital Personal Data Protection Act, 2023; Bharatiya Nyaya Sanhita, 2023.',
        faqs_json: JSON.stringify([
          { q: 'What should I do immediately after falling victim to financial cyber fraud?', a: 'Call the National Cyber Helpline 1930 within the golden hour to freeze fund transfers and file an immediate complaint on cybercrime.gov.in.' },
          { q: 'What is the DPDP Act 2023?', a: 'It is Indias comprehensive personal data protection statute requiring consent, purpose limitation, data principal rights, and penalties up to ₹250 Crores for serious breaches.' }
        ])
      }
    ];

    const insertPA = db.prepare(`
      INSERT INTO practice_areas (slug, title, title_hi, icon, short_desc, short_desc_hi, overview, key_laws, faqs_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const a of areas) {
      insertPA.run(a.slug, a.title, a.title_hi, a.icon, a.short_desc, a.short_desc_hi, a.overview, a.key_laws, a.faqs_json);
    }
  }

  // Seed Blog Articles / Insights
  const artCount = db.prepare('SELECT COUNT(*) as count FROM articles').get() as { count: number };
  if (artCount.count === 0) {
    const articles = [
      {
        slug: 'understanding-digital-personal-data-protection-act-2023',
        title: 'Understanding the Digital Personal Data Protection Act, 2023: Key Rights for Citizens',
        title_hi: 'डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम 2023: नागरिकों के लिए प्रमुख अधिकार',
        summary: 'A plain-language guide explaining how India’s new data privacy law safeguards your personal information and what remedies you have against misuse.',
        summary_hi: 'एक सरल मार्गदर्शिका जो बताती है कि भारत का नया डेटा गोपनीयता कानून आपकी व्यक्तिगत जानकारी की सुरक्षा कैसे करता है।',
        content: `### Introduction to the DPDP Act 2023

The Digital Personal Data Protection Act, 2023 (DPDP Act) represents a landmark development in India’s legal framework for digital rights. Passed by Parliament to uphold the fundamental right to privacy established in the historic *Justice K.S. Puttaswamy (Retd.) v. Union of India* judgment, the Act establishes comprehensive duties for data fiduciaries and rights for citizens (termed "Data Principals").

### Who Is a Data Principal?
Under the Act, any individual to whom the personal data relates is a **Data Principal**. If the individual is a child or a person with disability, their parent or lawful guardian exercises these rights.

### Core Rights Guaranteed to Every Citizen:
1. **Right to Access Information**: You have the right to obtain a summary of the personal data being processed about you and the identities of third parties with whom it has been shared.
2. **Right to Correction and Erasure**: You can request the correction of inaccurate data, completion of incomplete records, and erasure of personal data that is no longer necessary for the purpose for which it was collected.
3. **Right to Grievance Redressal**: Every Data Fiduciary (company or entity processing your data) must have an easily accessible grievance redressal mechanism.
4. **Right to Nominate**: You can nominate an individual to exercise your privacy rights in the event of death or incapacity.

### The Mechanism of Notice and Consent
Consent must be free, specific, informed, unconditional, and unambiguous. Before obtaining consent, companies must provide a clear notice describing the data collected and the specific purpose.

### Important Official Recourse
If a data fiduciary fails to resolve a privacy grievance within the stipulated timeframe, citizens may file a complaint before the **Data Protection Board of India**.

*Disclaimer: This article provides general legal information for public education and does not constitute formal legal advice.*`,
        category: 'Data Privacy & Technology',
        read_time: '6 min read',
        tags: 'Privacy, DPDP Act, Cyber Law, Fundamental Rights'
      },
      {
        slug: 'step-by-step-guide-to-filing-consumer-complaints-online',
        title: 'Step-by-Step Guide to Filing a Consumer Complaint on e-Daakhil',
        title_hi: 'e-Daakhil पोर्टल पर उपभोक्ता शिकायत दर्ज करने की चरणबद्ध मार्गदर्शिका',
        summary: 'How ordinary citizens can approach consumer forums without hefty legal fees using India’s official e-Daakhil digital portal.',
        summary_hi: 'जानिए कैसे आम नागरिक ई-दाखिल डिजिटल पोर्टल का उपयोग करके बिना भारी कानूनी फीस के उपभोक्ता फोरम में शिकायत कर सकते हैं।',
        content: `### Empowering Everyday Consumers

Under the Consumer Protection Act, 2019, citizens no longer need to physically travel to court registries to seek remedies against defective products, unfair trade practices, or deficient commercial services. The Government of India introduced **e-Daakhil**, an official electronic filing system.

### When Can You Approach Consumer Commissions?
You can file a complaint if:
- A purchased product is defective or does not match warranted specifications.
- A service (banking, telecom, insurance, healthcare, aviation, e-commerce) has significant deficiencies.
- You were charged prices higher than the Maximum Retail Price (MRP).
- Misleading advertisements led to financial injury.

### Mandatory Pre-Filing Checklist:
1. **Notice to the Vendor**: Always send a written communication (email or registered letter) giving the service provider or seller 15 days to rectify the defect.
2. **Preserve Receipts**: Retain tax invoices, warranty cards, delivery receipts, and chat logs.
3. **Pecuniary Jurisdiction**:
   - District Commission: Claims up to ₹50 Lakhs.
   - State Commission: Claims above ₹50 Lakhs up to ₹2 Crores.
   - National Commission (NCDRC): Claims exceeding ₹2 Crores.

### Steps on e-Daakhil (edaakhil.nic.in):
1. Create a citizen user account with Aadhaar or mobile OTP verification.
2. Draft the complaint index, memo of parties, statement of facts, and prayer clause.
3. Upload supporting annexures in PDF format.
4. Pay the nominal statutory filing fee online through Bharatkosh or the integrated payment gateway.
5. Receive an instantaneous acknowledgment number for digital case tracking.

*Disclaimer: Educational resource published for citizen awareness under BCI Rule 36.*`,
        category: 'Consumer Rights',
        read_time: '7 min read',
        tags: 'Consumer Protection, e-Daakhil, Citizen Guide'
      },
      {
        slug: 'what-to-do-when-buying-property-in-india-legal-checklist',
        title: 'Essential Legal Due Diligence Before Purchasing Immovable Property in India',
        title_hi: 'भारत में अचल संपत्ति खरीदने से पहले आवश्यक कानूनी जांच सूची',
        summary: 'Prevent real estate disputes with this 30-year title diligence checklist, RERA verification guide, and encumbrance audit.',
        summary_hi: 'संपत्ति विवादों से बचने के लिए 30 साल का स्वामित्व सत्यापन, रेरा जांच और भार प्रमाणपत्र ऑडिट।',
        content: `### Why Property Due Diligence Matters

Real estate purchases often represent a family’s life savings. In India, real property disputes constitute a major percentage of civil litigation. A sound legal title verification prior to executing a sale deed or paying substantial token money is essential.

### The Golden 10-Point Due Diligence Checklist:

1. **Title Chain for at least 30 Years**: Verify how the current seller acquired title (through sale deed, gift, partition, or inheritance). Trace every transaction backward for minimum 30 years.
2. **Encumbrance Certificate (EC)**: Obtain a Form 15 Encumbrance Certificate from the Sub-Registrar's Office to verify whether any mortgage, court attachment, or lien exists against the property.
3. **RERA Registration**: For new project flats or plotted developments, check the official State RERA website. Ensure the project is registered and the sanction plan matches the physical brochure.
4. **Approved Building Sanction Plan**: Verify that the local municipal corporation or planning authority (e.g., DDA, BDA, MMRDA, DTCP) has formally approved the building plan without unauthorized deviations.
5. **Occupancy Certificate (OC) & Completion Certificate (CC)**: Do not take possession without verifying the OC issued by local civic authorities.
6. **Property Tax Receipts**: Ensure municipal property taxes are paid up to date by the vendor.
7. **Khata / Mutation Extract**: Verify that the revenue records reflect the seller’s name as the lawful owner.
8. **NOCs from Utility Authorities**: Check pollution clearance, fire safety NOC, and airport authority height clearances where applicable.
9. **Public Notice in Local Newspapers**: In high-value transactions, issuing a 14-day public notice in two newspapers invites any undisclosed claims.
10. **Stamp Duty and Registration**: Ensure the sale deed is registered under Section 17 of the Registration Act, 1908. Unregistered agreements do not transfer valid legal title.

*Disclaimer: General guidance only. Property laws vary across states in India.*`,
        category: 'Property & Real Estate',
        read_time: '8 min read',
        tags: 'Property Law, Real Estate, RERA, Title Verification'
      }
    ];

    const insertArt = db.prepare(`
      INSERT INTO articles (slug, title, title_hi, summary, summary_hi, content, category, read_time, tags)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const a of articles) {
      insertArt.run(a.slug, a.title, a.title_hi, a.summary, a.summary_hi, a.content, a.category, a.read_time, a.tags);
    }
  }

  // Seed Case Studies / Our Work (anonymized educational case studies complying with BCI Rule 36)
  const csCount = db.prepare('SELECT COUNT(*) as count FROM case_studies').get() as { count: number };
  if (csCount.count === 0) {
    const studies = [
      {
        slug: 'restoration-of-green-belt-in-urban-periphery',
        title: 'Restoration of Ecological Green Belt Against Illegal Industrial Encroachment',
        subject_matter: 'Environmental & Constitutional Law',
        legal_issue: 'Arbitrary zoning change permitting red-category effluent release on notified community commons.',
        principles: 'Public Trust Doctrine; Precautionary Principle; Article 21 Right to Clean Environment.',
        approach: 'Represented a collective of resident farmers before the National Green Tribunal (NGT) and High Court under Article 226. Secured an expert joint inspection committee report demonstrating groundwater toxicity.',
        outcome: 'The Tribunal directed immediate stay of unauthorized industrial operations and ordered ecological remediation with restitution bond deposited by polluters.',
        date: 'November 2025'
      },
      {
        slug: 'delayed-homebuyer-possession-redressal',
        title: 'Protection of Homebuyers’ Life Savings Under RERA and Insolvency Framework',
        subject_matter: 'Real Estate Regulation (RERA) & Consumer Law',
        legal_issue: 'A residential project delayed by over 6 years without offering statutory delay interest or completion date.',
        principles: 'Section 18 of RERA Act, 2016; Right to unconditional refund with SBI MCLR interest.',
        approach: 'Filed consolidated representation before the State Real Estate Regulatory Authority, establishing persistent diversion of project funds.',
        outcome: 'Authority ordered complete handover within 90 days with monthly penalty compensation credited directly to all affected buyers.',
        date: 'August 2025'
      },
      {
        slug: 'workplace-harassment-redressal-posh-enforcement',
        title: 'Enforcement of Mandatory POSH Internal Committee Procedures in Corporate Sector',
        subject_matter: 'Labour, Service & Employment Law',
        legal_issue: 'Irregular constitution of Internal Committee lacking mandatory independent external legal member.',
        principles: 'Section 4(2)(c) of Sexual Harassment of Women at Workplace Act, 2013; Principles of Natural Justice.',
        approach: 'Challenged the flawed internal inquiry before the appellate authority under the Industrial Employment Standing Orders.',
        outcome: 'De-novo inquiry ordered with independent external woman NGO representative, ensuring full procedural safeguards.',
        date: 'May 2025'
      }
    ];

    const insertCS = db.prepare(`
      INSERT INTO case_studies (slug, title, subject_matter, legal_issue, principles, approach, outcome, date)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const c of studies) {
      insertCS.run(c.slug, c.title, c.subject_matter, c.legal_issue, c.principles, c.approach, c.outcome, c.date);
    }
  }

  // Seed Legal Resources
  const resCount = db.prepare('SELECT COUNT(*) as count FROM resources').get() as { count: number };
  if (resCount.count === 0) {
    const resourceItems = [
      {
        title: 'National Consumer Helpline (NCH) Official Portal',
        title_hi: 'राष्ट्रीय उपभोक्ता हेल्पलाइन आधिकारिक पोर्टल',
        summary: 'Department of Consumer Affairs portal for lodging pre-litigation grievances and tracking company responses.',
        summary_hi: 'उपभोक्ता मामलों के विभाग का पोर्टल जहां पूर्व-मुकदमा शिकायत दर्ज कर सकते हैं।',
        category: 'Consumer Protection',
        link_url: 'https://consumerhelpline.gov.in',
        source_org: 'Ministry of Consumer Affairs, Food & Public Distribution, Govt. of India'
      },
      {
        title: 'National Cyber Crime Reporting Portal (1930)',
        title_hi: 'राष्ट्रीय साइबर अपराध रिपोर्टिंग पोर्टल',
        summary: 'Immediate reporting of online financial fraud, identity theft, child safety violations, and cyber stalking.',
        summary_hi: 'ऑनलाइन वित्तीय धोखाधड़ी, पहचान चोरी तथा साइबर अपराधों की तत्काल रिपोर्टिंग।',
        category: 'Cyber Safety & Fraud',
        link_url: 'https://cybercrime.gov.in',
        source_org: 'Indian Cyber Crime Coordination Centre (I4C), MHA'
      },
      {
        title: 'eCourts Services Digital Portal',
        title_hi: 'ई-कोर्ट्स डिजिटल सेवाएं पोर्टल',
        summary: 'Search case status, daily court orders, cause lists, and judgment records across 3,000+ court complexes in India.',
        summary_hi: 'भारत के 3,000+ न्यायालयों में केस स्थिति, दैनिक आदेश तथा निर्णयों की ऑनलाइन खोज।',
        category: 'Court Information',
        link_url: 'https://ecourts.gov.in',
        source_org: 'e-Committee, Supreme Court of India & Ministry of Law and Justice'
      },
      {
        title: 'National Legal Services Authority (NALSA) — Free Legal Aid',
        title_hi: 'राष्ट्रीय विधिक सेवा प्राधिकरण (नालसा) — निःशुल्क कानूनी सहायता',
        summary: 'Provides free legal assistance to women, children, SC/ST, custody undertrials, and persons with annual income under ₹3 Lakhs.',
        summary_hi: 'महिलाओं, बच्चों, एससी/एसटी तथा पात्र नागरिकों को निःशुल्क विधिक सहायता।',
        category: 'Legal Aid & Human Rights',
        link_url: 'https://nalsa.gov.in',
        source_org: 'Supreme Court of India / NALSA'
      },
      {
        title: 'Right to Information (RTI) Online Portal',
        title_hi: 'सूचना का अधिकार (आरटीआई) ऑनलाइन पोर्टल',
        summary: 'File first RTI applications and first appeals online for central government public authorities.',
        summary_hi: 'केंद्रीय सरकारी प्राधिकरणों के लिए आरटीआई आवेदन तथा प्रथम अपील ऑनलाइन दर्ज करें।',
        category: 'Public Grievance',
        link_url: 'https://rtionline.gov.in',
        source_org: 'Department of Personnel and Training (DoPT), Govt. of India'
      },
      {
        title: 'Legal Glossary & Glossary of Indian Judicial Terms',
        title_hi: 'विधिक शब्दावली एवं न्यायिक शब्दकोश',
        summary: 'Easy-to-understand definitions of common legal terms (Vakalatnama, Caveat, FIR, Bail, Stay Order, Writ, Res Judicata).',
        summary_hi: 'सामान्य कानूनी शब्दों की सरल परिभाषा (वकालतनामा, केविएट, एफआईआर, जमानत, स्टे ऑर्डर, रिट)।',
        category: 'Educational Resources',
        link_url: '/resources/glossary',
        source_org: 'Legal Arjun Educational Editorial Board'
      }
    ];

    const insertRes = db.prepare(`
      INSERT INTO resources (title, title_hi, summary, summary_hi, category, link_url, source_org)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    for (const r of resourceItems) {
      insertRes.run(r.title, r.title_hi, r.summary, r.summary_hi, r.category, r.link_url, r.source_org);
    }
  }

  // Seed Public Petitions
  const petCount = db.prepare('SELECT COUNT(*) as count FROM petitions').get() as { count: number };
  if (petCount.count === 0) {
    const samplePetitions = [
      {
        title: 'Mandatory Pedestrian Zebra Crossings & Audible Signals near All Government Schools',
        title_hi: 'सभी सरकारी स्कूलों के पास अनिवार्य ज़ेब्रा क्रॉसिंग एवं श्रव्य सिग्नल',
        category: 'Public Safety & Infrastructure',
        location: 'Delhi NCR & Northern States',
        description: 'Hundreds of children navigate high-speed roads daily without designated crossing signals or traffic calming infrastructure. This petition urges urban civic bodies and state transport departments to mandate 20 km/h school zones, speed tables, and pelican crossings within 200m of all primary educational institutions.',
        proposed_action: 'Urban Local Bodies (ULBs) and Public Works Departments (PWD) must issue mandatory street audit guidelines and execute school pedestrian safety zones within 6 months.',
        target_recipient: 'Ministry of Road Transport and Highways & Municipal Commissioners',
        creator_name: 'Citizens for Safe Schooling Forum',
        creator_email: 'safety@citizenschools.org',
        target_signatures: 1000,
        current_signatures: 342,
        closing_date: '31 December 2026'
      },
      {
        title: 'Strengthening District Consumer Commission Infrastructure & Reducing Case Backlogs',
        title_hi: 'जिला उपभोक्ता आयोगों के बुनियादी ढांचे को मजबूत करना एवं बैकलॉग घटाना',
        category: 'Judicial Infrastructure',
        location: 'Pan-India',
        description: 'Consumers across various states face extended delays exceeding two to three years for hearings despite the statutory 90-day resolution timeline under Section 38(7) of the Consumer Protection Act, 2019. Over 25% of District Commission member posts remain vacant.',
        proposed_action: 'State Governments and High Court Selection Committees must fill all presiding member vacancies and mandate digital hybrid hearings for consumer disputes.',
        target_recipient: 'Central Consumer Protection Authority & State Consumer Affairs Departments',
        creator_name: 'National Consumer Justice Alliance',
        creator_email: 'advocacy@consumeralliance.in',
        target_signatures: 2500,
        current_signatures: 1184,
        closing_date: '15 November 2026'
      }
    ];

    const insertPet = db.prepare(`
      INSERT INTO petitions (title, title_hi, category, location, description, proposed_action, target_recipient, creator_name, creator_email, target_signatures, current_signatures, closing_date)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const p of samplePetitions) {
      insertPet.run(p.title, p.title_hi, p.category, p.location, p.description, p.proposed_action, p.target_recipient, p.creator_name, p.creator_email, p.target_signatures, p.current_signatures, p.closing_date);
    }
  }

  // Seed sample complaints for the admin demonstration
  const compCount = db.prepare('SELECT COUNT(*) as count FROM complaints').get() as { count: number };
  if (compCount.count === 0) {
    db.prepare(`
      INSERT INTO complaints (ref_number, full_name, email, phone, state, district, category, subject, description, status, admin_notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      'LA-2026-89412',
      'Ramesh Chandra Sharma',
      'ramesh.sharma@example.com',
      '+91 98765 43210',
      'Uttar Pradesh',
      'Noida',
      'Consumer-related issue',
      'E-commerce company refused warranty repair for defective laptop within 30 days',
      'Purchased a laptop on 15 Jan 2026. The motherboard failed within 3 weeks. The authorised service centre is refusing to honor the manufacturer warranty citing fabricated physical damage. I have written 4 emails with no resolution.',
      'Under Review',
      'Advised citizen to send a formal statutory legal notice via e-Daakhil. Drafting template.'
    );

    db.prepare(`
      INSERT INTO complaints (ref_number, full_name, email, phone, state, district, category, subject, description, status, admin_notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      'LA-2026-44218',
      'Sunita Devi',
      'sunita.devi@example.com',
      '+91 98111 22334',
      'Haryana',
      'Gurugram',
      'Property-related issue',
      'Builder demanding illegal electrification surcharge after full payment and agreement',
      'Signed builder-buyer agreement in 2023. Upon taking physical possession, developer is demanding additional ₹2.5 Lakhs unauthorized surcharge not mentioned in the registered agreement.',
      'Referred to an Appropriate Resource',
      'Referred to District RERA Legal Assistance cell and provided formal complaint format.'
    );
  }
}

// Execute initial seeding
seedDatabase();

export default db;
