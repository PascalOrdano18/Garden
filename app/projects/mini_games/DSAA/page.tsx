

import path from "path";
import fs from "fs";

import AlgSelector from "./components/AlgSelector";

export default function DSAA() {
  const dir = path.join(
    process.cwd(),
    "app",
    "projects",
    "mini_games",
    "DSAA",
    "algs",
  );
  const files = fs.readdirSync(dir).map((name) => name.replace(".tsx", ""));

  return (
    <div className="flex flex-col items-center p-4 sm:p-6 lg:p-8 min-h-screen">
      <div className="mb-4 sm:mb-6 text-center">
        <h1 className="text-yellow-100 font-bold text-2xl sm:text-3xl lg:text-4xl mb-2">
          Data Structures &amp; Algorithms
        </h1>
        <p className="text-yellow-100 text-sm sm:text-base max-w-xl mx-auto">
          Explore classic data structures and algorithms. Choose one from the
          list below to get started.
        </p>
      </div>

      <div className="w-full max-w-3xl">
        <AlgSelector files={files} />
      </div>
    </div>
  );
}
