'use client';

import { useEffect, useRef } from 'react';
import { time } from 'console';
export default function Lines({ isPreview }: { isPreview?: boolean }){
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

              const step = 20;

              ctx.fillStyle = "black";
              ctx.fillRect(0, 0, w, h);

              ctx.strokeStyle = "white";
                ctx.lineWidth = 3;

                ctx.beginPath();
               

                let rand;
                for(let i = 0; i < w; i += step){
                    for(let j = 0; j < h; j += step){
                        rand =  Math.random(); 
                        if(rand < 0.25){
                            ctx.moveTo(i, j);
                            ctx.lineTo(i + step, j + step);
                        } else if (rand < 0.5){
                            ctx.moveTo(i, j);
                            ctx.lineTo(i + step, j); 
                        } else if (rand < 0.75){
                            ctx.moveTo(i, j);
                            ctx.lineTo(i, j + step);
                        } else {
                            ctx.moveTo(i + step, j + step);
                            ctx.lineTo(i, j + step);
                        }
                    }
                }
                ctx.stroke();
              //frame = requestAnimationFrame(draw);
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
