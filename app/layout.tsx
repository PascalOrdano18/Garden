import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import BackToTop from "@/app/components/BackToTop";
import BackgroundShaders from "@/app/components/BackgroundShaders";
import JsonLd from "@/app/components/JsonLd";
import { BackgroundProvider } from "@/app/contexts/BackgroundContext";
import './globals.css';
import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
};

const description = 'A place where Pascal Ordano shares creations, projects, and things that interest him. Founding Engineer at Roomix.ai, studying software engineering at ITBA.';

export const metadata: Metadata = {
  metadataBase: new URL('https://pordano.com'),
  title: {
    default: "Pascal's Garden",
    template: "%s · Pascal's Garden",
  },
  description,
  keywords: ['Pascal Ordano', 'portfolio', 'software engineering', 'ITBA', 'Roomix', 'projects', 'blog'],
  authors: [{ name: 'Pascal Ordano', url: 'https://pordano.com' }],
  creator: 'Pascal Ordano',
  alternates: {
    canonical: '/',
    types: { 'application/rss+xml': '/feed.xml' },
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Pascal's Garden",
    description,
    url: 'https://pordano.com',
    siteName: "Pascal's Garden",
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Pascal's Garden",
    description,
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen flex flex-col items-center justify-start sm:justify-center">
        <BackgroundProvider>
          <BackgroundShaders />
          <Header />
          <main className="mt-14 sm:mt-16 p-4 pb-16 sm:pb-20">
            {children}
          </main>
          <BackToTop />
          <Footer />
        </BackgroundProvider>
        <JsonLd />
        <Analytics />
      </body>
    </html>
  );
}
