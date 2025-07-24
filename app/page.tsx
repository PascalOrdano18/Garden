'use client';

import ProgressiveText from '@/app/components/ProgressiveText';

export default function Home() {
  return (
    <div className="fade-in max-w-4xl mx-auto px-4 sm:px-6">
      <div className="justify-items-start space-y-4 sm:space-y-6">
        <ProgressiveText text="Pascal Ordano&apos;s Garden" />
        <p className="mt-3 sm:mt-4 text-base sm:text-lg lg:text-xl slide-up leading-relaxed">
          A place where I share what I create and things that interest me.
        </p>
        <p className="slide-up text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed">
          I&apos;m a software engineering student at Instituto Tecnologico de Buenos
          Aires (ITBA)
        </p>
      </div>
    </div>
  );
} 
