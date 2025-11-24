'use client';

// app/projects/mini_games/GenerativeArt/pieces.ts
import type { ComponentType } from "react";

import Random from './pieces/random';

export type ArtComponent = ComponentType<{ isPreview?: boolean }>;

export const ART_PIECES = [
  {
    slug: "random",
    title: "Random",
    description: "Una pieza de arte generativo aleatorio.",
    Component: Random,
  },
];

export function getArtBySlug(slug: string) {
  return ART_PIECES.find((p) => p.slug === slug);
}
