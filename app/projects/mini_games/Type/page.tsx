'use client'

import { useState, useEffect, useRef } from "react";

type LetterStatus = "correct" | "incorrect" | "current" | "pending";

// const texts = [
//   {
//     text: "Aprender a tipear rapido es clave para codear"
//   },
//   {
//     text: "Cuando cuentes cuentos cuenta cuantos cuentos cuentas porque sino nunca sabras cuantos cuantos sabes contar"
//   },
//   {
//     text: "Que linda mirada y que linda boca, te lo tenia que decir. Gracias, ojala igual. Dale, dale dale"
//   },

// ]

export default function Type() {
  const [input, setInput] = useState<string>('');
  const [finish, setFinish] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<number>(0);
  const [color, setColor] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const [strokesAmount, setStrokesAmount] = useState<number>(0);

  const [poem, setPoem] = useState("");

  const startTimerRef = useRef<number | null>(null);
  const endTimerRef = useRef<number | null>(null);

  // useEffect(() => {
  //   const idx: number = Math.floor(Math.random() * (texts.length));
  //   setText(texts[idx].text);
  // }, []);

  useEffect(() => {
    (async () => {
      await getPoem();
    })();
  }, []);

  const getPoem = async () => {
    try {
      const res = await fetch('/api/games/type', {
        cache: 'no-store'
      });
      if(!res.ok){
        console.log(res.status);
        return;
      }
      
      const data = await res.json();
      const lines = Array.isArray(data) && data[0]?.lines ? data[0].lines : [];
      const joined = Array.isArray(lines) ? lines.join(' ') : '';

      if (joined) {
        const value = joined.slice(0, 200);
        setPoem(value);
        setText(value);
      }
    
    } catch(error){
      console.log(error);
    }
  }

  const startTimer = () => {
    startTimerRef.current = performance.now();
  }

  const handleChange = (value: string): void => {
    if(value.length > text.length) return ;
    if(startTimerRef.current == null && value.length > 0){
      startTimer();
    }
    setInput(value);
    setCurrentId(value.length - 1);
    if (text.charAt(value.length - 1) === value.charAt(value.length - 1)) {
      setColor(true);
    } else {
      setColor(false);
    }
    setStrokesAmount(prev => prev + 1);
    if (value.length === text.length && startTimerRef.current !== null) {
      endTimerRef.current = performance.now(); 
      setFinish(true);
    }
  }

  const reset = () => {
    
    setColor(false);
    setFinish(false);
    setCurrentId(0);
    setStrokesAmount(0);
    setInput('');
    startTimerRef.current = null;
    endTimerRef.current = null;
    getPoem();
  }

  const getStatuses = (text: string, input: string): LetterStatus[] => {
    const res: LetterStatus[] = [];
    for (let i = 0; i < text.length; i++) {
      const typed = input[i];
      if (typed == null) {
        res.push(i === input.length ? "current" : "pending");
      } else {
        res.push(typed === text[i] ? "correct" : "incorrect");
      }
    }
    return res;
  }

  const statuses = getStatuses(text, input);

  function classFor(status: LetterStatus): string {
    switch (status) {
      case 'correct': return 'text-green-500';
      case 'incorrect': return 'text-red-500 underline';
      case 'current': return 'text-yellow-400 underline';
      case 'pending': return 'text-gray-500';
    }
  }

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-3xl">TYPING TEST</h1>
      <div className="w-full my-10">
        {Array.from(text).map((char, i) => (
          <span key={i} className={`text-2xl ${classFor(statuses[i])}`}>
            {char}
          </span>
        ))}
      </div>
      <textarea
        className="text-white overflow-hidden w-full my-10 bg-transparent border-white p-2"
        value={input}
        placeholder="Type Here..."
        onChange={(e) => handleChange(e.target.value)}
      />

      {finish && startTimerRef.current && endTimerRef.current &&
        <div>
          <h1 className="text-3xl font-extrabold text-blue-500">FINISHED!</h1>
          {(() => {
            const elapsedMs = endTimerRef.current - startTimerRef.current;
            const minutes = Math.max(elapsedMs / 60000, 1e-6);
            const wpm = Math.round((text.length / 5) / minutes);
            const accuracy = (text.length / strokesAmount) * 100;
            return (
              <div>
                <h3>WPM: {wpm}</h3>
                <h3>Time: {(minutes * 60).toFixed(2)}</h3>
                <h3>Strokes: {strokesAmount}</h3>
                <h3>Accuracy: {accuracy.toFixed(2)} %</h3>  
              </div>
              )
          })()}
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