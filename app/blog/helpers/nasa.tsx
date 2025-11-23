'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Nasa() {
  const [image, setImage] = useState<string>('');

  const getNasaImage = async () => {
    try {
      const res = await fetch('/api/nasa');
      if (!res.ok) return;

      const data = await res.json();
      console.log(data);
      setImage(data.url);
    } catch (error) {
      console.error('Error fetching NASA image:', error);
    }
  };

  useEffect(() => {
    void getNasaImage();
  }, []);

  return (
    <div>
      {image && (
        <Image src={image} alt="NASA image" width={500} height={500} />
      )}
    </div>
  );
}
