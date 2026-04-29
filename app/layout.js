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
  title: "KeystoneCleaner | Exterior Cleaning Vancouver & Surrey",
  description: "Professional exterior cleaning in Vancouver, Surrey & the Lower Mainland. Roof cleaning, pressure washing, gutter cleaning & more. Free quotes — fast response.",
  openGraph: {
    title: "KeystoneCleaner | Exterior Cleaning Vancouver & Surrey",
    description: "Professional exterior cleaning in Vancouver, Surrey & the Lower Mainland. Roof cleaning, pressure washing, gutter cleaning & more.",
    type: "website",
    locale: "en_CA",
    siteName: "KeystoneCleaner",
  },
  twitter: {
    card: "summary_large_image",
    title: "KeystoneCleaner | Exterior Cleaning Vancouver & Surrey",
    description: "Professional exterior cleaning in Vancouver, Surrey & the Lower Mainland. Free quotes — fast response.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
