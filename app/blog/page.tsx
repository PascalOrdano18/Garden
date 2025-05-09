import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

interface BlogPost {
    slug: string;
    title: string;
    date: string;
    [key: string]: any; // for any additional frontmatter fields
}

interface MatterData {
    title: string;
    date: string;
    [key: string]: any;
}

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
        <div>
          <h1 className="text-4xl font-bold">Journal</h1>
          <ul>
            {posts.map(({ slug, title, date }) => (
              <li key={slug} className='my-8'>
                <Link href={`/blog/${slug}`} className='hover:text-yellow-100 transition-all'>
                  <h2 className='text-lg transition-all'>{title}</h2>
                </Link>
                <p>{date}</p>
              </li>
            ))}
          </ul>
        </div>
      );
      
}