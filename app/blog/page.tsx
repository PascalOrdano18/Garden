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
    })


    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">Journal</h1>
          <ul className="space-y-6 sm:space-y-8">
            {posts.map(({ slug, title, date }) => (
              <li key={slug}>
                <Link href={`/blog/${slug}`} className='hover:text-yellow-100 transition-all block'>
                  <h2 className='text-lg sm:text-xl font-medium mb-2 transition-all'>{title}</h2>
                  <p className="text-sm sm:text-base text-gray-400">{date}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      );
      
}
