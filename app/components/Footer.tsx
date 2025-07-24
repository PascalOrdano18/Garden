import Link from "next/link";

export default function Footer() {
    return(
        <footer className="fixed bottom-0 w-full py-4 sm:py-6 bg-black/50 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
                <p className="text-gray-400 text-sm sm:text-base">{new Date().getFullYear()} All Rights reserved</p>
                <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
                    <Link href="https://github.com/PascalOrdano18" className="text-gray-400 hover:text-yellow-100 transition-all text-sm sm:text-base">
                        GitHub
                    </Link>
                    <Link href="https://www.linkedin.com/in/pascal-ordano-826405216/" className="text-gray-400 hover:text-yellow-100 transition-all text-sm sm:text-base">
                        LinkedIn
                    </Link>
                    <Link href="pordano@itba.edu.ar" className="text-gray-400 hover:text-yellow-100 transition-all text-sm sm:text-base">
                        Email
                    </Link>
                </div>
            </div>
        </footer>
    );
}