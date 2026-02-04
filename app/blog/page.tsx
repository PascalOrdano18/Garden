import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

interface BlogPost {
    slug: string;
    title: string;
    date: string;
    [key: string]: unknown; }

export default async function BlogPage(){

    const postsDirectory = path.join(process.cwd(), "app", "content", "posts");  // agarra el directorio /content/posts
    const fileNames = fs.readdirSync(postsDirectory);  // Lee los nombres de los archivos de la carpeta

    const posts: BlogPost[] = fileNames.map((fileName) => {
        const filePath = path.join(postsDirectory, fileName);
        const fileContent = fs.readFileSync(filePath, "utf-8");  // lee el contenido del archivo de markdown
        const { data } = matter(fileContent);

        // Ensure required fields exist
        if (!data.title || !data.date) {
            throw new Error(`Missing required frontmatter fields in ${fileName}`);
        }

        return {
            slug: fileName.replace(".md", ""),
            title: data.title,
            date: data.date,
            ...data,  // el operador ... devuelve todos los elementos del objeto
        }
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())


    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-yellow-100">Journal</h1>
          <ul className="space-y-1 sm:space-y-2">
            {posts.map(({ slug, title, date }) => (
              <li key={slug}>
                <Link
                  href={`/blog/${slug}`}
                  className="group block py-4 sm:py-5 px-4 sm:px-5 -mx-4 sm:-mx-5 rounded-xl
                    hover:bg-white/5 active:bg-white/10
                    transition-colors touch-manipulation"
                >
                  <h2 className="text-base sm:text-lg font-medium mb-1.5 group-hover:text-yellow-100 group-active:text-yellow-100 transition-colors">
                    {title}
                  </h2>
                  <p className="text-sm text-gray-500">{date}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      );
      
}
