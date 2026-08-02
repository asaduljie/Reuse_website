import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://reuse.my.id"),
  title: {
    default: "ReUse Marketplace - Jual Beli Barang Preloved & Eco-Friendly",
    template: "%s | ReUse Marketplace",
  },
  description:
    "ReUse Marketplace adalah platform terpercaya tempat jual beli barang preloved berkualitas tinggi, thrift fashion, elektronik bekas, dan produk gaya hidup ramah lingkungan di Indonesia.",
  keywords: [
    "reuse marketplace",
    "reuse",
    "reuse.my.id",
    "marketplace preloved",
    "jual beli barang bekas",
    "thrift online indonesia",
    "barang bekas berkualitas",
    "eco friendly marketplace",
    "preloved indonesia",
    "reuse indonesia",
  ],
  authors: [{ name: "ReUse Team", url: "https://reuse.my.id" }],
  creator: "ReUse Marketplace",
  publisher: "ReUse Marketplace",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://reuse.my.id",
  },
  openGraph: {
    title: "ReUse Marketplace - Platform Jual Beli Barang Preloved & Eco-Friendly",
    description:
      "Temukan barang preloved berkualitas tinggi, pakaian thrift, elektronik bekas, dan produk ramah lingkungan di ReUse Marketplace.",
    url: "https://reuse.my.id",
    siteName: "ReUse Marketplace",
    images: [
      {
        url: "https://reuse.my.id/icon.png",
        width: 512,
        height: 512,
        alt: "ReUse Marketplace Logo",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReUse Marketplace",
    description:
      "Platform jual beli barang preloved berkualitas tinggi & ramah lingkungan di Indonesia.",
    images: ["https://reuse.my.id/icon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

import FloatingChat from "../components/layout/FloatingChat";
import GlobalAlertModal from "../components/common/GlobalAlertModal";
import GlobalNavigationLoader from "../components/common/GlobalNavigationLoader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${plusJakartaSans.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://reuse.my.id/#website",
                  "url": "https://reuse.my.id",
                  "name": "ReUse Marketplace",
                  "description": "Platform tempat jual beli barang preloved berkualitas tinggi & eco-friendly di Indonesia",
                  "inLanguage": "id-ID",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://reuse.my.id/products?q={search_term_string}",
                    "query-input": "required name=search_term_string"
                  }
                },
                {
                  "@type": "Organization",
                  "@id": "https://reuse.my.id/#organization",
                  "name": "ReUse Marketplace",
                  "url": "https://reuse.my.id",
                  "logo": "https://reuse.my.id/icon.png"
                }
              ]
            })
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <GlobalNavigationLoader>
          {children}
          <FloatingChat />
          <GlobalAlertModal />
        </GlobalNavigationLoader>
      </body>
    </html>
  );
}
