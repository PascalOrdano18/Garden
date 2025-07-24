'use client';

import ProgressiveText from '@/app/components/ProgressiveText';

export default function Home() {
  return (
    <div className="fade-in max-w-4xl mx-auto px-4 sm:px-6 min-h-[60vh] flex flex-col justify-center">
      <div className="space-y-6 sm:space-y-8">
        <div className="w-full overflow-hidden">
          <ProgressiveText text="Pascal Ordano&apos;s Garden" />
        </div>
        <div className="space-y-4 sm:space-y-6">
          <p className="text-base sm:text-lg lg:text-xl slide-up leading-relaxed max-w-2xl">
            A place where I share what I create and things that interest me.
          </p>
          <p className="slide-up text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed max-w-2xl">
            I&apos;m a software engineering student at Instituto Tecnológico de Buenos Aires (ITBA)
          </p>
        </div>
      </div>
    </div>
  );
} 
