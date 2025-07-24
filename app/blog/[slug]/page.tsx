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
        <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6 fade-in">
            <ClientReadingProgress />
            <h1 className="text-yellow-100 text-xl sm:text-2xl font-bold underline underline-offset-2">{data.title}</h1>
            <div className="flex items-center space-x-4 text-xs sm:text-sm text-gray-400">
                <p>{data.date}</p>
                <span>•</span>
                <p>{readingTime} min read</p>
            </div>
            <ReactMarkdown 
                className="prose prose-invert max-w-none prose-p:my-4 sm:prose-p:my-6 prose-headings:my-4 sm:prose-headings:my-6 prose-sm sm:prose-base"
                components={{
                    p: ({...props}) => <p className="mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed" {...props} />,
                    h1: ({...props}) => <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6" {...props} />,
                    h2: ({...props}) => <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4" {...props} />,
                    h3: ({...props}) => <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3" {...props} />
                }}
            >
                {content}
            </ReactMarkdown>
            <Link href="/blog" className="block mt-6 sm:mt-8 text-base sm:text-lg transition-all hover:text-yellow-100">Back</Link>
        </div>
    );
}
