import Link from "next/link"


export default function Projects(){
    return(
        <div>
            <h1 className="text-3xl font-bold">PROJECTS</h1>
            <p>All my projects are public on my github 
                <Link href="https://github.com/PascalOrdano18" className="hover:text-yellow-100 hover:text-lg transition-all"> PascalOrdano18. </Link>
            Cool things on the way.</p>
        </div>
    );
}