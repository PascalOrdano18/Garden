'use client';

import ProgressiveText from '@/app/components/ProgressiveText';

export default function Home() {
  return (
    <div className="fade-in">
      <div className="justify-items-start space-y-6">
        <ProgressiveText text="Pascal Ordano&apos;s Garden" />
        <p className="mt-4 text-lg slide-up">
          A place where I share what I create and things that interest me.
        </p>
        <p className="slide-up">
          I&apos;m a software engineering student at Instituto Tecnologico de Buenos
          Aires (ITBA)
        </p>
      </div>
    </div>
  );
} 
