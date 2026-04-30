import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://www.keystonecleaner.com"),
  title: "Keystone Cleaner | Exterior Cleaning Vancouver & Lower Mainland",
  description: "Keystone Cleaner — professional roof cleaning, pressure washing, gutter cleaning & house washing across Vancouver, Surrey & the Lower Mainland. Free quotes, same-day response.",
  keywords: "roof cleaning lower mainland, gutter cleaning surrey, pressure washing vancouver, house washing BC, exterior cleaning services Canada, roof soft wash, keystone cleaner",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Keystone Cleaner | Exterior Cleaning Vancouver & Lower Mainland",
    description: "Professional roof cleaning, pressure washing, gutter cleaning & house washing across Vancouver & the Lower Mainland. Free quotes — same-day response.",
    url: "https://www.keystonecleaner.com",
    type: "website",
    locale: "en_CA",
    siteName: "Keystone Cleaner",
  },
  twitter: {
    card: "summary_large_image",
    title: "Keystone Cleaner | Exterior Cleaning Vancouver & Lower Mainland",
    description: "Professional roof cleaning, pressure washing & exterior cleaning across Vancouver & the Lower Mainland. Free quotes — fast response.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Keystone Cleaner",
  url: "https://www.keystonecleaner.com",
  telephone: "+12503171366",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Vancouver",
    addressRegion: "BC",
    addressCountry: "CA",
  },
  areaServed: [
    "Vancouver", "Surrey", "Burnaby", "Richmond",
    "Coquitlam", "Langley", "North Vancouver", "Delta", "Maple Ridge",
  ],
  description: "Professional roof cleaning, pressure washing, gutter cleaning & house washing across the Lower Mainland & Islands.",
  priceRange: "$$",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
