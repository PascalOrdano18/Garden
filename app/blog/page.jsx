
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';



export default async function BlogPage(){
    const postsDirectory = path.join(process.cwd(), "app", "content", "posts");  // agarra el directorio /content/posts
    const fileNames = fs.readdirSync(postsDirectory);  // Lee los nombres de los archivos de la carpeta

    const posts = fileNames.map((fileName) => {
        const filePath = path.join(postsDirectory, fileName);  
        const fileContent = fs.readFileSync(filePath, "utf-8");  // lee el contenido del archivo de markdown
 
        const { data } = matter(fileContent);   // extrae los datos, titulo y date
    
        return {
            slug: fileName.replace(".md", ""),
            ...data,  // el operador ... devuelve todos los elementos del objeto
        }
    })

    return (
        <div>
          <h1 className="text-3xl font-bold">Blog</h1>
          <ul>
            {posts.map(({ slug, title, date }) => (
              <li key={slug} className='my-8'>
                <Link href={`/blog/${slug}`} className='hover:text-yellow-100'>
                  <h2>{title}</h2>
                </Link>
                <p>{date}</p>
              </li>
            ))}
          </ul>
        </div>
      );
      
}