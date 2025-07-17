import path from "path";
import fs from "fs";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import ClientReadingProgress from "../../components/ClientReadingProgress";

function calculateReadingTime(content: string) {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
}

export async function generateStaticParams(){
    const postsDirectory = path.join(process.cwd(), "app", "content", "posts");
    const filenames = fs.readdirSync(postsDirectory);
    
    return filenames.map((filename) => ({
        slug: filename.replace('.md', ''),
      }));    
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }){
    const { slug } = await params;
    const filePath = path.join(process.cwd(), "app", "content", "posts", `${slug}.md`);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    const readingTime = calculateReadingTime(content);

    return(
        <div className="max-w-3xl mx-auto p-6 space-y-6 fade-in">
            <ClientReadingProgress />
            <h1 className="text-yellow-100 text-2xl font-bold underline underline-offset-2">{data.title}</h1>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
                <p>{data.date}</p>
                <span>•</span>
                <p>{readingTime} min read</p>
            </div>
            <ReactMarkdown 
                className="prose prose-invert max-w-none prose-p:my-8 prose-headings:my-8"
                components={{
                    p: ({...props}) => <p className="mb-8" {...props} />
                }}
            >
                {content}
            </ReactMarkdown>
            <Link href="/blog" className="block mt-8 text-lg transition-all hover:text-yellow-100">Back</Link>
        </div>
    );
}
