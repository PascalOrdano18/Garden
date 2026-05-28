import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BASE_URL = 'https://pordano.com';
const SITE_TITLE = "Pascal's Garden";
const SITE_DESCRIPTION = "Writings and notes by Pascal Ordano.";

function escapeXml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const postsDirectory = path.join(process.cwd(), 'app', 'content', 'posts');
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames
    .map((filename) => {
      const filePath = path.join(postsDirectory, filename);
      const { data, content } = matter(fs.readFileSync(filePath, 'utf8'));
      const slug = filename.replace(/\.md$/, '');
      const excerpt = content
        .replace(/```[\s\S]*?```/g, '')
        .replace(/[#*_`>[\]()]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 280);
      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        excerpt,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const items = posts
    .map(
      (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${BASE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
    </item>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_TITLE}</title>
    <link>${BASE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>en-us</language>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
