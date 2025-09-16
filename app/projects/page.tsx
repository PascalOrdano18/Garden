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
        title: "Discrete Math",
        image: "/Graph1.png",
        alt: "A discrete math app",
        link: "https://github.com/PascalOrdano18/Visual-Discrete-Math",
        description: "A visual tool for learning discrete mathematics"
    },
    {
        title: "Archivo 909",
        image: "/Archivo909.jpeg",
        alt: "Archivo 909",
        link: "https://archivo909.vercel.app/",
        description: "Digital Magazine web site"
    },
    {
        title: "SAT Vocabulary Tutor",
        image: "/SAT1.png",
        alt: "SAT vocabulary learning application",
        link: "https://sat-app.vercel.app/",
        description: "Interactive vocabulary learning platform"
    },
    {
        title: "Mini Games",
        image: "/MiniGames.jpeg",
        alt: "Mini games",
        link: "/projects/mini_games",
        description: "A collection of fun mini-games and interactive experiences"
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
                                target={project.title === 'Mini Games' ? undefined : "_blank"}
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