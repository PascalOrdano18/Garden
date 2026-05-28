import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'C Graphics',
  description: 'Graphics created in C with SDL — ray tracer, Mandelbrot set, sand simulation, Game of Life, fractal trees.',
  alternates: { canonical: '/projects/graphics' },
  openGraph: { title: "C Graphics · Pascal's Garden", url: '/projects/graphics' },
};

export default function GraphicsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
