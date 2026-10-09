import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://legalarjun.com'),
  title: "Legal Arjun — Legal Information, Professional Services & Public Assistance",
  description:
    "Access reliable legal resources, submit complaints, discover your rights, and explore public petitions. A professional legal practice combined with a public-interest information portal for Indian citizens.",
  keywords: [
    "legal services India",
    "legal information",
    "public assistance",
    "complaint submission",
    "legal resources",
    "know your rights",
    "public petitions",
    "Indian law",
  ],
  authors: [{ name: "Legal Arjun - Adv. Arjun Panwar" }],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Legal Arjun — Legal Information & Public Assistance",
    description:
      "Access reliable legal resources, submit complaints, and discover your rights — all in one place.",
    type: "website",
    locale: "en_IN",
    siteName: "Legal Arjun - Adv. Arjun Panwar",
    images: [{ url: "/images/logo.png", width: 1020, height: 1024, alt: "Advocate Arjun Panwar Logo" }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
