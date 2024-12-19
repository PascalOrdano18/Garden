import Link from "next/link"
import PCard from "../components/PCard";


export default function Projects(){
    return(
        <div className="mt-8 p-6 space-y-12 min-h-screen">
            <h1 className="text-3xl font-bold">PROJECTS</h1>
            <p>All my projects are public on my github 
                <Link href="https://github.com/PascalOrdano18" className="hover:text-yellow-100 transition-all"> PascalOrdano18. </Link>
            Cool things on the way.</p>

            <ul className="space-y-10">
                <li>
                    <PCard projectTitle="Discrete Math" imageSource="/Graph1.png" imageAlt="A discrete math app" />
                </li>

                <li>
                    <PCard projectTitle="SAT Vocabulary tutor" imageSource="/SAT1.png" imageAlt="A discrete math app" />
                </li>
            </ul>

        </div>
    );
}