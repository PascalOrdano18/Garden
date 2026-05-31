import type { Metadata } from "next";
import PinnedTweet from "@/app/components/PinnedTweet";

export const metadata: Metadata = {
  title: 'Links',
  robots: { index: false, follow: false },
};

const PINNED_TWEET_ID = "2056462580462350666";

interface LinkItem {
    title: string;
    url: string;
    note?: string;
}

const links: LinkItem[] = [
    { title: "news.ycombinator.com", url: "https://news.ycombinator.com" },
    { title: "arkaung.github.io/interactive-turboquant", url: "https://arkaung.github.io/interactive-turboquant/" },
    { title: "paulgraham.com", url: "https://paulgraham.com" },
    { title: "subliminal-learning.com", url: "https://subliminal-learning.com/", note: "wtf" },
    { title: "makingsoftware.com", url: "https://www.makingsoftware.com" },
];

export default function Links() {
    return (
        <div className="fade-in min-h-[calc(100vh-7rem)] w-full flex items-start justify-center px-4 py-16 sm:py-24">
            <div className="w-full max-w-2xl text-center">
                <h1 className="text-3xl sm:text-4xl font-bold mb-4 slide-up">Links</h1>

                <div className="w-32 mx-auto border-t border-gray-700/50 my-8 slide-up" style={{ animationDelay: '150ms' }} />

                <ul className="flex flex-col gap-3 sm:gap-4">
                    {links.map((link, index) => (
                        <li
                            key={link.url}
                            className="slide-up"
                            style={{ animationDelay: `${300 + index * 80}ms` }}
                        >
                            <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-base sm:text-lg hover:text-yellow-100 transition-colors"
                            >
                                {link.title}
                            </a>
                            {link.note && (
                                <span className="ml-2 text-xs sm:text-sm text-gray-500 italic">
                                    {link.note}
                                </span>
                            )}
                        </li>
                    ))}
                </ul>

                <div
                    data-theme="dark"
                    className="flex justify-center mt-10 slide-up"
                    style={{ animationDelay: `${300 + links.length * 80}ms` }}
                >
                    <PinnedTweet id={PINNED_TWEET_ID} />
                </div>
            </div>
        </div>
    );
}
