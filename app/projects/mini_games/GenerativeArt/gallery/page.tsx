'use client';

import Link from 'next/link';   
import { ART_PIECES } from '../pieces';

export default function Gallery(){
    return(
        <div className="min-h-screen p-4 max-w-5xl mx-auto">
           <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-yellow-100 text-center">
             Generative Art Gallery
           </h1>
        
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                { ART_PIECES.map((piece) => (
                    <Link 
                        key={piece.slug}
                        href={`/projects/mini_games/GenerativeArt/gallery/${piece.slug}`}       
                        className="group border border-neutral-700 rounded-xl overflow-hidden hover:border-neutral-500 transition"
                    >
                    <div className="aspect-video bg-neutral-900">
                        <piece.Component isPreview />
                    </div>
                    <div className="p-4">
                      <h2 className="font-semibold group-hover:underline">
                        {piece.title}
                      </h2>
                      <p className="text-sm text-neutral-400 mt-1">
                        {piece.description}
                      </p>
                    </div>
                        
                    </Link>
                )) }
            </div>
        </div>
    );
}