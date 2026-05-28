# SEO Improvements — Design

**Date:** 2026-05-28
**Project:** Pascal's Garden (`pordano.com`)
**Scope:** Full SEO package — favicon, OG image, metadata, robots/sitemap, JSON-LD, per-page metadata.

## Goals

1. Replace the default Next/Vercel favicon with a branded one.
2. Make link previews on social/messaging platforms look intentional (OG image + correct meta).
3. Let search engines crawl and index the site properly (robots, sitemap, canonical URLs).
4. Improve the chance Google produces a knowledge panel for "Pascal Ordano" (Person JSON-LD).
5. Give every public route a meaningful `<title>` and description, especially blog posts.

## Non-Goals

- Refactoring `app/page.tsx` (currently `'use client'`) to a server component. Layout metadata already covers the home; no SEO win.
- Multilingual / hreflang (kept as English only).
- Performance/Core Web Vitals work — outside scope.

## Decisions

| Topic | Decision |
|---|---|
| Production domain | `https://pordano.com` |
| Metadata language | English, `lang="en"` |
| Favicon | SVG, letter "P" in `#FEF9C3` (tailwind `yellow-100`) on `#000000` |
| OG image | Dynamic via `next/og` `ImageResponse` at `app/opengraph-image.tsx`, 1200×630, same palette |
| `/links` indexing | `noindex` (it is an easter-egg page) |
| JSON-LD `sameAs` | Omit for now |
| Blog post descriptions | Derive from frontmatter if present, otherwise from first ~160 chars of post body |

## Architecture / File-by-file changes

### Icons

- **`app/icon.svg`** (new) — minimalist "P" on black background. Next.js automatically wires this up as `<link rel="icon">`.
- **`app/apple-icon.png`** (new, 180×180) — same artwork rasterized. Next wires as `apple-touch-icon`.
- **`app/favicon.ico`** — **delete** the existing file. It is the Next default and would be served preferentially by some legacy browsers if kept. `icon.svg` is sufficient for all modern browsers.

### OG image

- **`app/opengraph-image.tsx`** (new) — `ImageResponse` with: black background, "Pascal Ordano's Garden" centered in `#FEF9C3`, subtitle line in white/gray. Exports `size = { width: 1200, height: 630 }` and `contentType = 'image/png'`. Next serves it at `/opengraph-image` and wires it into OG/Twitter meta automatically.
- **`app/twitter-image.tsx`** — re-export the same image to satisfy Twitter card.

### Global metadata (`app/layout.tsx`)

Replace the current `metadata` export with:

```ts
export const metadata: Metadata = {
  metadataBase: new URL('https://pordano.com'),
  title: {
    default: "Pascal's Garden",
    template: "%s · Pascal's Garden",
  },
  description: '...',  // existing
  keywords: [...],     // existing
  authors: [{ name: 'Pascal Ordano', url: 'https://pordano.com' }],
  creator: 'Pascal Ordano',
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Pascal's Garden",
    description: '...',
    url: 'https://pordano.com',
    siteName: "Pascal's Garden",
    type: 'website',
    locale: 'en_US',
    // images auto-injected from app/opengraph-image.tsx
  },
  twitter: {
    card: 'summary_large_image',
    title: "Pascal's Garden",
    description: '...',
    // images auto-injected from app/twitter-image.tsx
  },
};
```

### JSON-LD Person schema

- **`app/components/JsonLd.tsx`** (new) — server component that renders a `<script type="application/ld+json">` tag with:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Pascal Ordano",
    "url": "https://pordano.com",
    "jobTitle": "Founding Engineer",
    "worksFor": { "@type": "Organization", "name": "Roomix.ai", "url": "https://roomix.ai" },
    "alumniOf": { "@type": "CollegeOrUniversity", "name": "Instituto Tecnológico de Buenos Aires" }
  }
  ```
- Render it inside `<body>` in `app/layout.tsx`.

### Crawling

- **`app/robots.ts`** (new) — exports a default function returning `{ rules: [{ userAgent: '*', allow: '/', disallow: ['/links'] }], sitemap: 'https://pordano.com/sitemap.xml' }`.
- **`app/sitemap.ts`** (new) — exports a default function returning an array of `{ url, lastModified, changeFrequency, priority }`. Includes:
  - `/` (priority 1.0)
  - `/blog` (0.8)
  - `/projects` (0.8)
  - One entry per blog post slug, `lastModified` derived from the post's frontmatter `date`. Reuses the same `path.join(process.cwd(), 'app/content/posts')` pattern as the existing blog page.
  - `/projects/graphics`, `/projects/mini_games` (0.5).
  - Excludes `/links` (matches the noindex above).

### Per-page metadata

- **`app/blog/page.tsx`** — add `export const metadata = { title: 'Blog', description: 'Writings by Pascal Ordano.' }`.
- **`app/projects/page.tsx`** — add `export const metadata = { title: 'Projects', description: 'Things Pascal has built.' }`.
- **`app/projects/graphics/page.tsx`** — `title: 'Graphics'`.
- **`app/projects/mini_games/page.tsx`** — `title: 'Mini Games'`.
- **`app/links/page.tsx`** — `export const metadata = { title: 'Links', robots: { index: false, follow: false } }`.
- **`app/blog/[slug]/page.tsx`** — add `generateMetadata({ params })` that:
  1. Reads the markdown file (same pattern as the page).
  2. Returns `title: data.title`.
  3. Returns `description: data.description ?? content.replace(/[#*_`>\[\]()]/g, '').trim().slice(0, 160)`.
  4. Returns `openGraph: { type: 'article', publishedTime: data.date, title, description }`.

  No need to add `description` to existing post frontmatter — the fallback handles it. Future posts can add it explicitly when they want control.

## Testing / Verification

- Run `pnpm build` — must succeed with no metadata-related warnings.
- Run `pnpm dev` and inspect `<head>` of `/`, `/blog`, `/blog/blog1`, `/projects`, `/links`:
  - `/` has canonical, OG image URL, JSON-LD script tag.
  - `/blog/blog1` title is `"Start with a Why · Pascal's Garden"`.
  - `/links` has `<meta name="robots" content="noindex, nofollow">`.
- Visit `/robots.txt` and `/sitemap.xml` — both render and reference `pordano.com`.
- Visit `/opengraph-image` — renders a 1200×630 PNG with the title.
- Validate the rendered HTML once with Google's Rich Results Test (after deploy) for the Person schema.

## Risk / open questions

- `ImageResponse` requires Node runtime; on Vercel it works out of the box. No extra config expected.
- If a blog post has frontmatter without a `date`, `sitemap.ts` should fall back to the file's `mtime`. Plan will codify this.
- Deleting `app/favicon.ico` removes the Vercel default; modern browsers will use `icon.svg`. No IE support concerns.
