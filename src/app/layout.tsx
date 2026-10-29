import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Playfair_Display, Dancing_Script } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const cursiveFont = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-cursive",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eb5406" },
    { media: "(prefers-color-scheme: dark)", color: "#101720" },
  ],
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// ─── SENIOR SEO METADATA MATRIX ───────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL("https://binghanipharmacy.com"),

  // Primary Title & Description (CTR & Keyword Optimized)
  title: {
    default: "Bin Ghani Pharmacy | Licensed Drug Dispensary & Community Healthcare",
    template: "%s | Bin Ghani Pharmacy",
  },
  description:
    "Bin Ghani Pharmacy - Government-licensed community drug dispensary (Lic: 6777-A/2021). 100% genuine allopathic medicines, certified clinical pharmacists, precision cold-chain storage, and heritage healthcare. Open 365 days, 9:00 AM – 2:00 AM.",

  applicationName: "Bin Ghani Pharmacy",

  authors: [
    { name: "Bin Ghani Pharmacy", url: "https://binghanipharmacy.com" },
    { name: "Muhammad Ghani - Founder & CEO", url: "https://binghanipharmacy.com/#leadership" },
  ],
  generator: "Next.js",

  keywords: [
    "Bin Ghani Pharmacy",
    "Licensed Pharmacy Pakistan",
    "Licensed Drug Dispensary 6777-A/2021",
    "Genuine Medicines",
    "Clinical Pharmacist Consultation",
    "Cold Chain Storage Pharmacy",
    "Allopathic Medicines",
    "Prescription Drugs Dispensary",
    "Medication Therapy Management",
    "Elderly Dose Packaging",
    "Pediatric Dosing Scaler",
    "Surgical Equipment Supplies",
    "Emergency First Aid Kits",
    "Medical Electronic Devices",
    "Pharmacy Open Till 2 AM",
    "Peshawar Pharmacy",
    "DRAP Approved Medicines",
    "Bin Ghani Healthcare",
  ],

  referrer: "origin-when-cross-origin",
  creator: "Muhammad Ghani",
  publisher: "Bin Ghani Pharmacy",
  category: "Health & Pharmaceuticals",

  // Canonical & Multilingual Alternates
  alternates: {
    canonical: "https://binghanipharmacy.com",
    languages: {
      "en-PK": "https://binghanipharmacy.com",
      "ur-PK": "https://binghanipharmacy.com",
      "x-default": "https://binghanipharmacy.com",
    },
  },

  // Open Graph (WhatsApp, Facebook, LinkedIn, iMessage rich link previews)
  openGraph: {
    title: "Bin Ghani Pharmacy | Licensed Drug Dispensary & Community Healthcare",
    description:
      "Your trusted community dispensary in Peshawar. 100% genuine DRAP-approved medicines, licensed clinical pharmacists, and open 365 days a year from 9:00 AM to 2:00 AM.",
    url: "https://binghanipharmacy.com",
    siteName: "Bin Ghani Pharmacy",
    images: [
      {
        url: "/landing-storefront-exterior-hd.jpg",
        width: 1200,
        height: 630,
        alt: "Bin Ghani Pharmacy Storefront Exterior & Illuminated Signage",
        type: "image/jpeg",
      },
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Bin Ghani Pharmacy Official Logo",
        type: "image/png",
      },
    ],
    locale: "en_PK",
    type: "website",
  },

  // Twitter / X Rich Card
  twitter: {
    card: "summary_large_image",
    title: "Bin Ghani Pharmacy | Licensed Drug Dispensary",
    description:
      "100% genuine medicines, precision cold-chain storage, and certified clinical pharmacists. Open daily 9 AM - 2 AM.",
    images: ["/landing-storefront-exterior-hd.jpg"],
    creator: "@BinGhaniRx",
  },

  // Search Engine Bot Instructions
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Icons & Touch Devices - Bin Ghani Pharmacy Logo Favicons
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },

  // Local SEO Geo & Regulatory Meta Tags
  other: {
    "geo.region": "PK-KP",
    "geo.placename": "Peshawar, Khyber Pakhtunkhwa, Pakistan",
    "geo.position": "34.0151;71.5249",
    "ICBM": "34.0151, 71.5249",
    "format-detection": "telephone=yes, address=yes, email=yes",
    "business:contact_data:phone_number": "+923322022221",
    "business:contact_data:email": "binghanipharmacy@gmail.com",
    "business:contact_data:license": "Drug Dispensary Lic. 6777-A/2021",
    "business:contact_data:tax_id": "NTN: 1730127706629",
    "rating": "General",
    "revisit-after": "3 days",
  },
};

// ─── GOOGLE SCHEMA.ORG JSON-LD (Rich Results Snippet) ─────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Pharmacy", "MedicalBusiness", "LocalBusiness"],
      "@id": "https://binghanipharmacy.com/#pharmacy",
      "name": "Bin Ghani Pharmacy",
      "legalName": "Bin Ghani Pharmacy & Drug Dispensary",
      "alternateName": "Bin Ghani Chemist & Druggist",
      "description":
        "Government-licensed community pharmacy and drug dispensary in Peshawar, Pakistan. Specializing in verified allopathic medicines, clinical pharmacist consultations, precision cold-chain vaccines, elderly dose packaging, and pediatric healthcare.",
      "url": "https://binghanipharmacy.com",
      "logo": "https://binghanipharmacy.com/logo.png",
      "image": "https://binghanipharmacy.com/landing-storefront-exterior-hd.jpg",
      "telephone": "+923322022221",
      "email": "binghanipharmacy@gmail.com",
      "priceRange": "$$",
      "currenciesAccepted": "PKR",
      "paymentAccepted": "Cash, Credit Card, Debit Card, EasyPaisa, JazzCash",
      "hasMap": "https://maps.google.com/?q=Bin+Ghani+Pharmacy+Peshawar",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Peshawar",
        "addressRegion": "Khyber Pakhtunkhwa",
        "addressCountry": "PK",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 34.0151,
        "longitude": 71.5249,
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          "opens": "09:00",
          "closes": "02:00",
        },
      ],
      "founder": {
        "@type": "Person",
        "name": "Muhammad Ghani",
        "jobTitle": "Founder & Chief Executive Officer",
      },
      "award": [
        "Government Licensed Drug Dispensary Lic. 6777-A/2021",
        "Registered with Federal Board of Revenue NTN 1730127706629",
      ],
      "medicalSpecialty": [
        "CommunityPharmacy",
        "ClinicalPharmacy",
        "Pediatrics",
        "Geriatrics",
      ],
      "availableService": [
        {
          "@type": "MedicalProcedure",
          "name": "Medication Therapy Management",
          "description": "Comprehensive drug interaction checks and clinical pharmacist review.",
        },
        {
          "@type": "MedicalProcedure",
          "name": "Elderly Dose Packaging",
          "description": "Customized daily and weekly blister packaging for senior citizens.",
        },
        {
          "@type": "MedicalProcedure",
          "name": "Pediatric Dosing Scaler",
          "description": "Accurate weight-based dosage scaling for infants and children.",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://binghanipharmacy.com/#website",
      "url": "https://binghanipharmacy.com",
      "name": "Bin Ghani Pharmacy",
      "publisher": {
        "@id": "https://binghanipharmacy.com/#pharmacy",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${playfair.variable} ${cursiveFont.variable} scroll-smooth`}
    >
      <head>
        {/* Performance Resource Hints: Preconnect to Font CDNs & Preload LCP Storefront Image */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="image"
          href="/landing-storefront-exterior.jpg?v=5"
          fetchPriority="high"
        />

        {/* Bin Ghani Pharmacy Logo Favicons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icon.png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />

        {/* Google Rich Snippet Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#fafafa] text-[#1a1f2c] antialiased selection:bg-[#eb5406] selection:text-white">
        {children}
      </body>
    </html>
  );
}
