'use client';

interface GraphProps {
    directed: boolean;
    biPartite: boolean;
    weighted: boolean;
}



class Node {
    x: number;
    y: number;
    width?: number;
    value?: number | null;

    constructor(x: number, y: number, width?:number, value?:number){
        this.x = x;
        this.y = y;
        this.width = width ?? 10;
        this.value = value ?? null;
    }

}


export default function Graphs(){



    const handleDrag = (xPos: number, yPos: number) => {
        console.log(xPos, yPos);
    }

    return(
        <div className="bg-yellow-100 w-screen h-screen">
            
            {Array.from({ length: 5 }).map((idx) => (
                <div draggable={true} onDrag={(e) => handleDrag(e.clientX, e.clientY)} className="w-full h-full">
                    <div className="rounded-full bg-black m-10">5</div>
                </div>
            ))}

        </div>
    );
}