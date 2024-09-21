"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { TaggedNumber } from "./_components/TaggedNumber";
import { checkPrime, simpleCheckPrime } from "./utils/algorithms";

export function HomePage({
  cols,
  primes,
}: {
  cols: number[][];
  primes: number[];
}) {
  const [foundPrimes, setFoundPrimes] = useState(0);
  const [totalNumbers, setTotalNumbers] = useState(0);

  useEffect(() => {
    let primeCount = 0;
    let totalCount = 0;
    document
      .querySelectorAll("div.grid.grid-cols-1.gap-7")
      .forEach((domCollumn) => {
        const children = domCollumn.children;
        for (let child of children) {
          totalCount++;
          const style = window.getComputedStyle(child);
          const color = style.color;
          if (color === "rgb(0, 0, 0)") {
            primeCount++;
          }
        }
      });

    setFoundPrimes(primeCount);
    setTotalNumbers(cols.reduce((count, row) => count + row.length, 0));
    return () => {
      primeCount = 0;
    };
  }, [cols]);

  console.log({ cols });

  return (
    <main className="flex min-h-screen flex-col gap-10 items-center p-24 bg-white">
      <div className="flex gap-3 text-black text-xl">
        <span>Primes found:</span>
        <span>
          {foundPrimes} in {totalNumbers} numbers
        </span>
      </div>
      <div className="grid grid-cols-4 gap-10 w-full text-center max-w-lg">
        {cols.map((col, i) => (
          <div key={`col-${i}`} className="grid grid-cols-1 gap-7">
            {col.slice(-1).map((possiblePrime) =>
              simpleCheckPrime(possiblePrime) ? (
                <TaggedNumber
                  className={`${
                    i === 0 ? "list-decimal list-item marker:text-black" : ""
                  }`}
                  key={`possiblePrime-${possiblePrime}`}
                  initialColor={
                    "black" //checkPrime(possiblePrime, primes) ? "red" : "black"
                  }
                >
                  {possiblePrime}
                </TaggedNumber>
              ) : (
                <div
                  key={`possiblePrime-${possiblePrime}`}
                  className={`text-[#00000040] text-xl font-semibold ${
                    i === 0 ? "list-decimal list-item marker:text-black" : ""
                  }`}
                >
                  {possiblePrime}
                </div>
              )
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
