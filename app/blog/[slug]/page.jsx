import path from "path";
import fs from "fs";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import html from "remark-html";

export async function generateStaticParams(){
    const postsDirectory = path.join(process.cwd(), "app", "content", "posts");
    const filenames = fs.readdirSync(postsDirectory);
    
    return filenames.map((filename) => ({
        slug: filename.replace('.md', ''),
      }));    
}

export default async function BlogPost({ params }){
    const { slug } = await params;

    // Ruta del archivo Markdown
    const filePath = path.join(process.cwd(), "app", "content", "posts", `${slug}.md`);
    const fileContents = fs.readFileSync(filePath, "utf8");

    // Extraer contenido de los archivos
    // Aca se usa gray matter
    const { data, content } = matter(fileContents);

    return(
        <div className="max-w-3xl mx-auto p-6 space-y-6 justify-center align-middle">
            <h1 className="text-2xl font-bold underline underline-offset-2">{data.title}</h1>
            <p>{data.date}</p>
            <ReactMarkdown>{content}</ReactMarkdown>
        </div>
    );
}
