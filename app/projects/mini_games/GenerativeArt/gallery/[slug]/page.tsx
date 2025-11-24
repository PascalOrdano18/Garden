'use client';

import { ART_PIECES } from '../../pieces';

interface ArtPageProps {
  params: {
    slug: string;
  };
}

export default function Art({ params }: ArtPageProps) {
  const piece = ART_PIECES.find((p) => p.slug === params.slug);

  if (!piece) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-neutral-300">Obra no encontrada.</p>
      </div>
    );
  }

  const { Component, title, description } = piece;

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-yellow-100">
          {title}
        </h1>
        {description && (
          <p className="text-neutral-300 mb-4">{description}</p>
        )}
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="w-full h-[80vh] bg-neutral-900 border border-neutral-700 rounded-xl overflow-hidden">
          <Component />
        </div>
      </div>
    </div>
  );
}
