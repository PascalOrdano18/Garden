import Link from "next/link"
import PCard from "../components/PCard";

const projects = [
    {
        title: "Discrete Math",
        image: "/Graph1.png",
        alt: "A discrete math app",
        github: "https://github.com/PascalOrdano18/Visual-Discrete-Math",
        description: "A visual tool for learning discrete mathematics"
    },
    {
        title: "SAT Vocabulary Tutor",
        image: "/SAT1.png",
        alt: "SAT vocabulary learning application",
        github: "https://sat-app.vercel.app/",
        description: "Interactive vocabulary learning platform"
    }
];

export default function Projects(){
    return(
        <div className="min-h-screen w-full">
            <div className="max-w-7xl mx-auto px-8 py-16">
                <div className="mb-24">
                    <h1 className="text-6xl font-bold mb-6">Projects</h1>
                    <p className="text-gray-400 text-xl">
                        Find my work on{' '}
                        <Link 
                            href="https://github.com/PascalOrdano18" 
                            className="text-white hover:text-yellow-100 transition-all"
                            target="_blank"
                        >
                            GitHub
                        </Link>
                    </p>
                </div>

                <div className="space-y-32">
                    {projects.map((project, index) => (
                        <div key={index} className="w-full">
                            <Link href={project.github} target="_blank">
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