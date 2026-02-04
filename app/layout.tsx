import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import BackToTop from "@/app/components/BackToTop";
import BackgroundShaders from "@/app/components/BackgroundShaders";
import { BackgroundProvider } from "@/app/contexts/BackgroundContext";
import './globals.css';
import { Analytics } from "@vercel/analytics/next"

export const metadata = {
  title: "Pascal's Garden",
  description: 'A place where Pascal Ordano shares creations, projects, and things that interest him. Software engineering student at ITBA.',
  keywords: ['Pascal Ordano', 'portfolio', 'software engineering', 'ITBA', 'projects', 'blog'],
  authors: [{ name: 'Pascal Ordano' }],
  openGraph: {
    title: "Pascal's Garden",
    description: 'A place where Pascal Ordano shares creations, projects, and things that interest him.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: "Pascal's Garden",
    description: 'A place where Pascal Ordano shares creations, projects, and things that interest him.',
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
        <Analytics />
      </body>
    </html>
  );
} 