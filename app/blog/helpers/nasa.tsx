'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Nasa() {
  const [image, setImage] = useState<string>('');

  useEffect(() => {
    let cancelled = false;
    
    (async () => {
      try {
        const res = await fetch('/api/nasa');
        if (!res.ok || cancelled) return;

        const data = await res.json();
        if (cancelled) return;
        
        console.log(data);
        setImage(data.url);
      } catch (error) {
        if (!cancelled) {
          console.error('Error fetching NASA image:', error);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      {image && (
        <Image src={image} alt="NASA image" width={500} height={500} />
      )}
    </div>
  );
}
