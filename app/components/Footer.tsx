import Link from "next/link";

export default function Footer() {
    return(
        <footer className="fixed bottom-0 w-full py-2 sm:py-3 bg-black/30 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center space-y-1 sm:space-y-0">
                <p className="text-gray-500 text-xs sm:text-sm">{new Date().getFullYear()} All Rights reserved</p>
                <div className="flex flex-col sm:flex-row space-y-0 sm:space-y-0 sm:space-x-3 text-center sm:text-left">
                    <Link href="https://github.com/PascalOrdano18" className="text-gray-500 hover:text-yellow-100 transition-all text-xs sm:text-sm">
                        GitHub
                    </Link>
                    <Link href="https://www.linkedin.com/in/pascal-ordano-826405216/" className="text-gray-500 hover:text-yellow-100 transition-all text-xs sm:text-sm">
                        LinkedIn
                    </Link>
                    <Link href="pordano@itba.edu.ar" className="text-gray-500 hover:text-yellow-100 transition-all text-xs sm:text-sm">
                        Email
                    </Link>
                </div>
            </div>
        </footer>
    );
}