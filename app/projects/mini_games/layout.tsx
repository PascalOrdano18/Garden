import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Mini Projects',
  description: 'A collection of interactive experiments and mini games.',
  alternates: { canonical: '/projects/mini_games' },
  openGraph: { title: "Mini Projects · Pascal's Garden", url: '/projects/mini_games' },
};

export default function MiniGamesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
