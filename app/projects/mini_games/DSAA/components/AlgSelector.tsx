'use client';

import { useState } from "react";

type AlgSelectorProps = {
  files: string[];
};

export default function AlgSelector({ files }: AlgSelectorProps) {
  const [alg, setAlg] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="flex flex-wrap justify-center gap-3">
        {files.map((file) => (
          <button
            key={file}
            className={`text-xs sm:text-sm md:text-base border border-yellow-100 rounded-md px-3 py-2 sm:px-4 sm:py-2 transition-colors ${
              alg === file
                ? "bg-yellow-100 text-black"
                : "text-yellow-100 hover:bg-yellow-100 hover:text-black"
            }`}
            onClick={() => setAlg(file)}
          >
            {file}
          </button>
        ))}
      </div>

      <div className="text-yellow-100 text-sm sm:text-base text-center">
        {alg ? (
          <p>
            Selected algorithm:{" "}
            <span className="font-semibold">{alg}</span>
          </p>
        ) : (
          <p className="italic">Select an algorithm to begin.</p>
        )}
      </div>
    </div>
  );
}
