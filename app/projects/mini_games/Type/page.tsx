'use client'

import { useState, useEffect, useRef, useCallback } from "react";

type LetterStatus = "correct" | "incorrect" | "current" | "pending";

export default function Type() {
  const [input, setInput] = useState<string>('');
  const [finish, setFinish] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const [strokesAmount, setStrokesAmount] = useState<number>(0);
  const [correctStrokes, setCorrectStrokes] = useState<number>(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const startTimerRef = useRef<number | null>(null);
  const endTimerRef = useRef<number | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const getPoem = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/games/type', {
        cache: 'no-store'
      });
      if(!res.ok){
        setText('The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.');
        return;
      }

      const data = await res.json();
      const lines = Array.isArray(data) && data[0]?.lines ? data[0].lines : [];
      const joined = Array.isArray(lines) ? lines.join(' ') : '';

      if (joined) {
        const value = joined.slice(0, 200);
        setText(value);
      } else {
        setText('The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.');
      }

    } catch {
      setText('The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getPoem();
  }, [getPoem]);

  const startTimer = () => {
    const now = performance.now();
    startTimerRef.current = now;
    setStartTime(now);
  }

  const handleChange = (value: string): void => {
    if(value.length > text.length) return ;
    if(startTimerRef.current == null && value.length > 0){
      startTimer();
    }
    // Track if the new character is correct
    if (value.length > input.length) {
      const newCharIndex = value.length - 1;
      if (value[newCharIndex] === text[newCharIndex]) {
        setCorrectStrokes(prev => prev + 1);
      }
    }
    setInput(value);
    setStrokesAmount(prev => prev + 1);
    if (value.length === text.length && startTimerRef.current !== null) {
      const now = performance.now();
      endTimerRef.current = now;
      setEndTime(now);
      setFinish(true);
    }
  }

  const reset = () => {
    setFinish(false);
    setStrokesAmount(0);
    setCorrectStrokes(0);
    setInput('');
    startTimerRef.current = null;
    endTimerRef.current = null;
    setStartTime(null);
    setEndTime(null);
    getPoem();
    // Focus textarea after reset
    setTimeout(() => textareaRef.current?.focus(), 100);
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
      case 'correct': return 'text-green-400';
      case 'incorrect': return 'text-red-400 bg-red-400/20 rounded';
      case 'current': return 'text-yellow-300 border-b-2 border-yellow-300';
      case 'pending': return 'text-gray-500';
    }
  }

  const progress = text.length > 0 ? (input.length / text.length) * 100 : 0;

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto px-4 sm:px-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-yellow-100 mb-2">TYPING TEST</h1>

      {/* Progress bar */}
      {!finish && !isLoading && (
        <div className="w-full h-1 bg-gray-800 rounded-full mb-4 sm:mb-6 overflow-hidden">
          <div
            className="h-full bg-yellow-100 transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Text display */}
      <div className="w-full p-4 sm:p-6 rounded-xl bg-black/30 backdrop-blur-sm border border-gray-800 mb-4 sm:mb-6 min-h-[120px] sm:min-h-[150px]">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-base sm:text-lg animate-pulse">Loading text...</p>
          </div>
        ) : (
          <p className="text-base sm:text-xl leading-relaxed sm:leading-loose font-mono">
            {Array.from(text).map((char, i) => (
              <span key={i} className={`${classFor(statuses[i])} transition-colors`}>
                {char}
              </span>
            ))}
          </p>
        )}
      </div>

      {/* Input area */}
      {!finish && (
        <textarea
          ref={textareaRef}
          className="w-full p-4 sm:p-5 rounded-xl bg-black/50 border border-gray-700
            text-white text-base sm:text-lg font-mono
            focus:border-yellow-100/50 focus:outline-none focus:ring-2 focus:ring-yellow-100/20
            placeholder:text-gray-600 resize-none
            transition-all touch-manipulation"
          rows={3}
          value={input}
          placeholder="Start typing here..."
          onChange={(e) => handleChange(e.target.value)}
          disabled={isLoading}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
      )}

      {/* Results */}
      {finish && startTime !== null && endTime !== null && (
        <div className="w-full p-4 sm:p-6 rounded-xl bg-green-500/10 border border-green-500/30 mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-green-400 mb-4 text-center">Complete!</h2>
          {(() => {
            const elapsedMs = endTime - startTime;
            const minutes = Math.max(elapsedMs / 60000, 1e-6);
            const wpm = Math.round((text.length / 5) / minutes);
            const accuracy = strokesAmount > 0 ? (correctStrokes / strokesAmount) * 100 : 0;
            const seconds = (minutes * 60).toFixed(1);
            return (
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="text-center p-3 sm:p-4 rounded-lg bg-black/30">
                  <p className="text-2xl sm:text-3xl font-bold text-yellow-100">{wpm}</p>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">WPM</p>
                </div>
                <div className="text-center p-3 sm:p-4 rounded-lg bg-black/30">
                  <p className="text-2xl sm:text-3xl font-bold text-yellow-100">{accuracy.toFixed(0)}%</p>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">Accuracy</p>
                </div>
                <div className="text-center p-3 sm:p-4 rounded-lg bg-black/30">
                  <p className="text-2xl sm:text-3xl font-bold text-white">{seconds}s</p>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">Time</p>
                </div>
                <div className="text-center p-3 sm:p-4 rounded-lg bg-black/30">
                  <p className="text-2xl sm:text-3xl font-bold text-white">{strokesAmount}</p>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">Keystrokes</p>
                </div>
              </div>
            )
          })()}
        </div>
      )}

      {/* Reset button */}
      <button
        onClick={reset}
        className="w-full sm:w-auto px-6 py-3 sm:py-4 rounded-xl
          bg-yellow-100/10 border border-yellow-100/50 text-yellow-100 font-bold
          hover:bg-yellow-100 hover:text-black
          active:scale-[0.98]
          transition-all duration-200 touch-manipulation
          text-sm sm:text-base"
      >
        {finish ? 'TRY AGAIN' : 'NEW TEXT'}
      </button>
    </div>
  );
}
