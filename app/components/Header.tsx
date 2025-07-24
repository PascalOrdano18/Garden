import Link from "next/link";

export default function Header() {
    return(
        <header className="text-white fixed top-0 left-1/2 -translate-x-1/2 w-[98%] max-w-4xl bg-black/80 backdrop-blur-sm h-16 flex items-center justify-center z-50 rounded-lg">
                <nav className="flex space-x-4 sm:space-x-6 md:space-x-8 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold px-4">
                    <Link href="/" className="hover:text-yellow-100 transition">HOME</Link>
                    <Link href="/blog" className="hover:text-yellow-100 transition">JOURNAL</Link>
                    <Link href="/projects" className="hover:text-yellow-100 transition">PROJECTS</Link>
                </nav>
        </header>
    );
}