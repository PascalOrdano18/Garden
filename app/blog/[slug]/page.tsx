import path from "path";
import fs from "fs";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import type { Metadata } from "next";

function calculateReadingTime(content: string) {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
}

function readPost(slug: string) {
    const filePath = path.join(process.cwd(), "app", "content", "posts", `${slug}.md`);
    const fileContents = fs.readFileSync(filePath, "utf8");
    return matter(fileContents);
}

export async function generateStaticParams(){
    const postsDirectory = path.join(process.cwd(), "app", "content", "posts");
    const filenames = fs.readdirSync(postsDirectory);

    return filenames.map((filename) => ({
        slug: filename.replace('.md', ''),
      }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const { data, content } = readPost(slug);

    const description = (data.description as string | undefined)
        ?? content
            .replace(/```[\s\S]*?```/g, '')
            .replace(/[#*_`>[\]()]/g, '')
            .replace(/\s+/g, ' ')
            .trim()
            .slice(0, 160);

    return {
        title: data.title,
        description,
        alternates: { canonical: `/blog/${slug}` },
        openGraph: {
            title: data.title,
            description,
            type: 'article',
            publishedTime: data.date,
            url: `/blog/${slug}`,
        },
        twitter: {
            card: 'summary_large_image',
            title: data.title,
            description,
        },
    };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }){
    const { slug } = await params;
    const { data, content } = readPost(slug);
    const readingTime = calculateReadingTime(content);

    return(
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-2 sm:py-4 fade-in">
            {/* Back button - fixed at top on mobile */}
            <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-yellow-100 active:text-yellow-100
                    mb-4 sm:mb-6 py-2 -ml-1 transition-colors touch-manipulation"
            >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-sm sm:text-base">Back to Journal</span>
            </Link>

            <article className="space-y-4 sm:space-y-6">
                <header>
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-100 mb-3">{data.title}</h1>
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-500">
                        <time>{data.date}</time>
                        <span className="w-1 h-1 rounded-full bg-gray-600" />
                        <span>{readingTime} min read</span>
                    </div>
                </header>

                <ReactMarkdown
                    className="prose prose-invert max-w-none prose-sm sm:prose-base"
                    components={{
                        p: ({...props}) => <p className="mb-4 sm:mb-5 text-sm sm:text-base leading-relaxed text-gray-300 break-words" {...props} />,
                        h1: ({...props}) => <h1 className="text-xl sm:text-2xl font-bold mb-4 mt-8 text-white" {...props} />,
                        h2: ({...props}) => <h2 className="text-lg sm:text-xl font-bold mb-3 mt-6 text-white" {...props} />,
                        h3: ({...props}) => <h3 className="text-base sm:text-lg font-bold mb-2 mt-5 text-white" {...props} />,
                        a: ({...props}) => <a className="text-yellow-100 hover:underline break-words" {...props} />,
                        ul: ({...props}) => <ul className="list-disc list-inside mb-4 space-y-1 text-gray-300" {...props} />,
                        ol: ({...props}) => <ol className="list-decimal list-inside mb-4 space-y-1 text-gray-300" {...props} />,
                        blockquote: ({...props}) => <blockquote className="border-l-2 border-yellow-100/50 pl-4 italic text-gray-400 my-4" {...props} />,
                        code: ({...props}) => <code className="bg-gray-800 px-1.5 py-0.5 rounded text-sm text-yellow-100" {...props} />,
                        pre: ({...props}) => (
                            <pre
                                className="mb-4 sm:mb-5 overflow-x-auto rounded-lg border border-gray-800 bg-gray-900/70 p-4 text-sm
                                    [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-gray-200 [&_code]:whitespace-pre"
                                {...props}
                            />
                        ),
                    }}
                >
                    {content}
                </ReactMarkdown>
            </article>
        </div>
    );
}
