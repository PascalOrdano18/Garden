'use client'

import { useState, useEffect } from "react";

const texts = [
    {
        text: "Aprender a tipear rapido es clave para codear"
    },
    {
        text: "Cuando cuentes cuentos cuenta cuantos cuentos cuentas porque sino nunca sabras cuantos cuantos sabes contar"
    },
    {
        text: "Que linda mirada y que linda boca, te lo tenia que decir. Gracias, ojala igual. Dale, dale dale"
    }
]

export default function Type(){
    const [input, setInput] = useState<string>('');
    const [finish, setFinish] = useState<boolean>(false);
    const [correctLetter, setCorrectLetter] = useState<boolean>(false);
    const [currentId, setCurrentId] = useState<number>(0);
    const [color, setColor] = useState<boolean>(false);
    const [text, setText] = useState<string>('');

    useEffect(() => {
        const idx:number = Math.floor(Math.random() * (texts.length - 1));
        setText(texts[idx].text);
    }, []);
    
    const handleChange = (value: string):void => {
        setInput(value);
        setCurrentId(value.length-1);
        if(text.charAt(value.length - 1) === value.charAt(value.length - 1)){
            setColor(true);
        } else {
            setColor(false);
        }
        setFinish(text === value);
    }

    const reset = () => {
        const idx:number = Math.floor(Math.random() * (texts.length - 1));
        setText(texts[idx].text); 
        setColor(false);
        setFinish(false);
        setCurrentId(0);
        setInput('');
    }

    // FALTA HACER QUE FUNCIONE BIEN EL TEMA DEL COLOR, QUE SI UNA LETRA FALLA, SOLO ESA SEA ROJA Y NO TODO LO ANTERIOR CORRECTO
    // TAMBIEN FALTA METER UN TIMER Y CALCULAR EL WPM Y LISTO
    // y promptear el front un poco
    return(
        <div className="flex flex-col items-center w-full">
            <h1 className="text-3xl">TYPING TEST</h1>
            <div className="w-full my-10">
                {Array.from(text).map((letter: string, id: number) => (
                    <span key={id} className={((id <= currentId) && color) ? 'text-green-500 text-2xl' : 'text-red-500 text-2xl'}>{letter}</span>
                ))}
            </div>
            <textarea
                className="text-white overflow-hidden w-full my-10 bg-transparent border-white p-2"
                placeholder="Type Here..."
                onChange={(e) => handleChange(e.target.value)}
            />

            {finish && 
                <div>
                    <h1 className="text-3xl font-extrabold text-blue-500">FINISHED!</h1>
                    <h3>WPM: 100 (mentira)</h3>
                </div>   
            }

            <button 
                onClick={reset}
                className="text-yellow-100 border border-yellow-100 px-4 py-2 sm:px-6 sm:py-3 rounded-md mt-4 sm:mt-6 hover:bg-yellow-100 hover:text-black transition-all text-sm sm:text-base touch-manipulation">
                    RESET
            </button>

        </div>
    );
}