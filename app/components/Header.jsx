import Link from "next/link";

export default function Header() {
    return(
        <header className="text-white fixed top-0 w-full bg-black h-16 flex items-center justify-center z-50">
                <nav className="flex space-x-8 text-3xl font-bold">
                    <Link href="/" className="hover:text-yellow-100 transition">HOME</Link>
                    <Link href="/blog" className="hover:text-yellow-100 transition">JOURNAL</Link>
                    <Link href="/projects" className="hover:text-yellow-100 transition">PROJECTS</Link>
                </nav>
        </header>
    );
}