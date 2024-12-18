import Link from "next/link";

export default function Header() {
    return(
        <header className="text-white fixed top-5">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <nav className="flex space-x-8 text-2xl font-bold">
                    <Link href="/" className="hover:text-yellow-100 transition">HOME</Link>
                    <Link href="/blog" className="hover:text-yellow-100 transition">BLOG</Link>
                    <Link href="/projects" className="hover:text-yellow-100 transition">PROJECTS</Link>
                </nav>
            </div>
        </header>
    );
}