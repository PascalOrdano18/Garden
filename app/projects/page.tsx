import Link from "next/link"
import PCard from "@/app/components/PCard";
import GitHubActivity from "@/app/components/GitHubActivity";

interface Project {
    title: string;
    image: string;
    alt: string;
    link: string;
    description: string;
}

const projects: Project[] = [
    {
        title: "Archivo 909",
        image: "/Archivo909.jpeg",
        alt: "Archivo 909",
        link: "https://archivo909.com/",
        description: "Digital Magazine web site"
    },
    {
        title: "C Graphics",
        image: "/graphics.png",
        alt: "C graphics",
        link: "/projects/graphics",
        description: "C Graphics using SDL"
    },
    {
        title: "Coding for fun",
        image: "/MiniGames.jpeg",
        alt: "Mini games",
        link: "/projects/mini_games",
        description: "A collection of fun mini-games and interactive experiences"
    },
    {
        title: "Chat With Your Journal",
        image: "/journal.png",
        alt: "Chat With Your Journal application",
        link: "https://chat-with-your-journal.vercel.app/journal",
        description: "AI-powered journaling companion"
    },
    {
        title: "ITBA's ASME web site",
        image: "/asme.png",
        alt: "ITBA's ASME web site",
        link: "https://asme-web-page.vercel.app/",
        description: "ITBA's ASME web site"
    },
    {
        title: "SAT Vocabulary Tutor",
        image: "/SAT.png",
        alt: "SAT vocabulary learning application",
        link: "https://sat-app.vercel.app/",
        description: "Interactive vocabulary learning platform"
    },
];

export default function Projects() {
    return (
        <div className="min-h-screen w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                <div className="mb-8 sm:mb-12 text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">Projects</h1>
                    <p className="text-gray-400 text-base sm:text-lg md:text-xl">
                        Find my work on{' '}
                        <Link 
                            href="https://github.com/PascalOrdano18" 
                            className="text-white hover:text-yellow-100 transition-all"
                            target="_blank"
                        >
                            GitHub
                        </Link>
                    </p>
                    <GitHubActivity />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                    {projects.map((project, index) => (
                        <div key={index} className="w-full">
                            <Link 
                                href={project.link} 
                                target={project.link.startsWith('/') ? undefined : "_blank"}
                            >
                                <PCard 
                                    projectTitle={project.title}
                                    imageSource={project.image}
                                    imageAlt={project.alt}
                                    description={project.description}
                                />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
