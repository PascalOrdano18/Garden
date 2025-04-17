import Link from "next/link";

export default function Footer() {
    return(
        <footer className="fixed bottom-0 w-full py-6 bg-black/50 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
                <p className="text-gray-400">{new Date().getFullYear()} All Rights reserved</p>
                <div className="flex space-x-4">
                    <Link href="https://github.com/PascalOrdano18" className="text-gray-400 hover:text-yellow-100 transition-all">
                        GitHub
                    </Link>
                    <Link href="https://www.linkedin.com/in/pascal-ordano-826405216/" className="text-gray-400 hover:text-yellow-100 transition-all">
                        LinkedIn
                    </Link>
                    <Link href="pordano@itba.edu.ar" className="text-gray-400 hover:text-yellow-100 transition-all">
                        Email
                    </Link>
                </div>
            </div>
        </footer>
    );
}