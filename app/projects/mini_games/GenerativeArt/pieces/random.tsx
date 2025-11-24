'use client';

import { useEffect, useRef } from 'react';

export default function Random({ isPreview }: { isPreview?: boolean }){
    const canvasRef = useRef<HTMLCanvasElement | null>(null);



    useEffect(() => {
        const canvas = canvasRef.current;
        if(!canvas) return ;
        const ctx = canvas.getContext("2d");
        if(!ctx) return ;


        let frame: number;

const draw = (time: number) => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      const w = rect.width;
      const h = rect.height;

      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, w, h);

      const step = isPreview ? 45 : 25;

      for (let x = 0; x < w; x += step) {
        for (let y = 0; y < h; y += step) {
          const t = time * 0.0005;
          const n = Math.sin(x * 0.05 + t) * Math.cos(y * 0.05 + t);
          const v = (n + 1) / 2;
          const size = step * v;

          ctx.fillStyle = `hsl(${200 + v * 120}, 80%, 60%)`;
          ctx.beginPath();
          ctx.arc(x, y, size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      frame = requestAnimationFrame(draw);
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [isPreview]);
    


    return(
        <div className={isPreview ? "w-full h-40" : "w-full h-full"}>
            <canvas
                ref={canvasRef}
                className="w-full h-full"
            />
        </div>
    );
}
