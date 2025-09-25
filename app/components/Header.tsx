import Link from "next/link";
import FixBgButton from "./FixBgButton";

export default function Header() {
    return(
        <header className="text-white fixed top-0 left-0 w-full h-16 flex items-center z-50 px-4">
                <div className="flex-1"></div>
                <nav className="flex space-x-4 sm:space-x-6 md:space-x-8 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
                    <Link href="/" className="hover:text-yellow-100 transition">HOME</Link>
                    <Link href="/blog" className="hover:text-yellow-100 transition">JOURNAL</Link>
                    <Link href="/projects" className="hover:text-yellow-100 transition">PROJECTS</Link>
                </nav>
                <div className="flex-1 flex justify-end">
                    <FixBgButton />
                </div>
        </header>
    );
}