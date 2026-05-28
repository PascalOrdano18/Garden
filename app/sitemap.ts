import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { MetadataRoute } from 'next';

const BASE_URL = 'https://pordano.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const postsDirectory = path.join(process.cwd(), 'app', 'content', 'posts');
  const filenames = fs.readdirSync(postsDirectory);

  const posts: MetadataRoute.Sitemap = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    const slug = filename.replace(/\.md$/, '');
    const lastModified = data.date ? new Date(data.date) : fs.statSync(filePath).mtime;

    return {
      url: `${BASE_URL}/blog/${slug}`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    };
  });

  const now = new Date();

  return [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/projects`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/projects/graphics`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${BASE_URL}/projects/mini_games`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    ...posts,
  ];
}
