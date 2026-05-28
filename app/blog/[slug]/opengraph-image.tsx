import { ImageResponse } from 'next/og';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export const alt = 'Pascal Ordano blog post';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function PostOGImage({ params }: { params: { slug: string } }) {
  const filePath = path.join(process.cwd(), 'app', 'content', 'posts', `${params.slug}.md`);
  const { data } = matter(fs.readFileSync(filePath, 'utf8'));

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#000000',
          padding: '80px',
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: '#9ca3af',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          Pascal Ordano · Journal
        </div>
        <div
          style={{
            fontSize: 80,
            fontWeight: 700,
            color: '#FEF9C3',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
          }}
        >
          {data.title}
        </div>
        <div
          style={{
            fontSize: 28,
            color: '#9ca3af',
          }}
        >
          {data.date}
        </div>
      </div>
    ),
    { ...size },
  );
}
