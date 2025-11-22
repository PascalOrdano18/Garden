'use client'

import { useEffect, useState } from 'react';

export default function WriteOrDie() {
  const [input, setInput] = useState<string>('');
  const [seconds, setSeconds] = useState<number>(0);
  const [started, setStarted] = useState<boolean>(false);

  const [initialRemainingSeconds, setInitialRemainingSeconds] = useState<number>(5);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(initialRemainingSeconds);

  const [died, setDied] = useState<boolean>(false);

  useEffect(() => {
    if (!started) return;

    const intervalId = setInterval(() => {
      setSeconds((prev) => prev + 1);

      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          setDied(true);
          clearInterval(intervalId);
          return 0; // no bajamos de 0
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [started]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(input);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    // Primera vez que escribe algo -> arrancamos el timer
    if (!started && input === '' && value.length > 0) {
      startTimer();
    }

    // Al escribir, reseteamos el contador de pensamiento
    setDied(false);
    setRemainingSeconds(initialRemainingSeconds);
    setInput(value);
  };

  const startTimer = () => {
    setSeconds(0);
    setRemainingSeconds(initialRemainingSeconds);
    setDied(false);
    setStarted(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-bold text-yellow-100 mb-8 sm:mb-10 tracking-wider text-center">
        WRITE OR DIE
      </h1>
      <div className="flex flex-col items-center mb-6 space-y-3">
        <h2 className="text-yellow-100 text-lg font-semibold text-center">
          Choose a thinking time limit:
        </h2>
        <div className="flex gap-3">
          <button
            onClick={() => {
              setInitialRemainingSeconds(5);
              setRemainingSeconds(5);
            }}
            className="text-yellow-100 border border-yellow-100 px-4 py-2 rounded-md hover:bg-yellow-100 hover:text-black transition-all text-sm sm:text-base"
          >
            5s
          </button>
          <button
            onClick={() => {
              setInitialRemainingSeconds(10);
              setRemainingSeconds(10);
            }}
            className="text-yellow-100 border border-yellow-100 px-4 py-2 rounded-md hover:bg-yellow-100 hover:text-black transition-all text-sm sm:text-base"
          >
            10s
          </button>
          <button
            onClick={() => {
              setInitialRemainingSeconds(30);
              setRemainingSeconds(30);
            }}
            className="text-yellow-100 border border-yellow-100 px-4 py-2 rounded-md hover:bg-yellow-100 hover:text-black transition-all text-sm sm:text-base"
          >
            30s
          </button>
        </div>
      </div>
      <div className="w-full max-w-7xl px-8">
        <h2 className="text-2xl text-white mb-4">
          Tiempo total: {seconds}s | Tiempo restante: {remainingSeconds}s
        </h2>
        <form onSubmit={handleSubmit} className="w-full">
          <textarea
            className="w-full h-96 text-white bg-transparent focus:outline-none text-2xl font-mono tracking-wide leading-relaxed resize-none placeholder:text-gray-500 border-2 border-gray-700 rounded-lg p-6 focus:border-gray-500 transition-colors"
            onChange={handleChange}
            value={input}
            placeholder="Empieza a escribir..."
            autoFocus
          />
        </form>
        <div className="items-center justify-center">
          <button
            className="text-yellow-100 border border-yellow-100 px-4 py-2 sm:px-6 sm:py-3 rounded-md mt-4 sm:mt-6 hover:bg-yellow-100 hover:text-black transition-all text-sm sm:text-base touch-manipulation"
            onClick={() => console.log('copied')}
          >
            Copy to Clipboard
          </button>
        </div>
        {died && (
          <h1 className="mt-6 text-3xl font-extrabold text-red-500 text-center">
            YOU DIED
          </h1>
        )}
      </div>
    </div>
  );
}
