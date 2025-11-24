'use client';

// app/projects/mini_games/GenerativeArt/pieces.ts
import type { ComponentType } from "react";

import Random from './pieces/random';
import Lines from './pieces/lines';

export type ArtComponent = ComponentType<{ isPreview?: boolean }>;

export const ART_PIECES = [
  {
    slug: "random",
    title: "Random",
    description: "Una pieza de arte generativo aleatorio.",
    Component: Random,
  },
  {
    slug: "Lines",
    title: "Try it",
    description: "Testing art",
    Component: Lines,
  },
];

export function getArtBySlug(slug: string) {
  return ART_PIECES.find((p) => p.slug === slug);
}
