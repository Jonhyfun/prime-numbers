"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { TaggedNumber } from "./_components/TaggedNumber";
import { simpleCheckPrime } from "./utils/algorithms";
import { primeParents } from "./page";

const lineRules: Record<any, ((line: number) => boolean)[]> = {
  1: [
    (line: number) => (line - 3) % 5 === 0, // n = 5k + 3
    (line: number) => (line - 5) % 7 === 0, // n = 7k + 5
    (line: number) => line % 11 === 0, // n = 11k
    (line: number) => (line - 2) % 13 === 0, // n = 13k + 2
  ],
  5: [
    (line: number) => (line - 1) % 5 === 0, // n = 5k + 1
    (line: number) => line % 7 === 0, // n = 7k
    (line: number) => (line - 7) % 11 === 0, // n = 11k + 7
    (line: number) => (line - 6) % 13 === 0, // n = 13k + 6
  ],
  7: [
    (line: number) => line % 5 === 0, // n = 5k
    (line: number) => (line - 1) % 7 === 0, // n = 7k + 1,
    (line: number) => (line - 5) % 11 === 0, // n = 11k + 5
    (line: number) => (line - 8) % 13 === 0, // n = 13k - 8
  ],
  11: [
    (line: number) => (line - 3) % 5 === 0, // n = 5k + 3,
    (line: number) => (line - 3) % 7 === 0, // n = 7k + 3
    (line: number) => (line - 1) % 11 === 0, // n = 11k + 1
    (line: number) => (line - 12) % 13 === 0, // n = 13k + 12
  ],
};

export function HomePage({
  cols,
  primes,
}: {
  cols: { index: number; possiblePrime: number }[][];
  primes: number[];
}) {
  const [foundPrimes, setFoundPrimes] = useState(0);
  const [totalNumbers, setTotalNumbers] = useState(0);

  useLayoutEffect(() => {
    let primeCount = 0;
    let totalCount = 0;
    document
      .querySelectorAll("div.grid.grid-cols-1.gap-7")
      .forEach((domCollumn) => {
        const children = domCollumn.children;
        for (let child of children) {
          totalCount++;
          const classList = child.classList;
          if (!child.classList.contains("notPrime")) {
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

  return (
    <main className="flex min-h-screen flex-col gap-10 items-center p-24 bg-white">
      <div className="flex gap-3 text-black text-xl">
        <span>Primes found:</span>
        <span>
          {foundPrimes - totalNumbers} in {totalNumbers} numbers{" "}
          {/* //? Não faço ideia de onde veio esse bug de precisar subtrair kkkkk */}
        </span>
      </div>
      <div className="grid grid-cols-5 gap-10 w-full text-center max-w-lg">
        <div className="grid grid-cols-1 gap-7">
          {Array.from({ length: cols[0].length }).map((_, i) => (
            <a
              href={`#${cols[0][i].index}`}
              id={cols[0][i].index.toString()}
              key={`index-${cols[0][i].index}`}
              className="text-black font-semibold text-lg ml-auto"
            >
              {cols[0][i].index}.
            </a>
          ))}
        </div>
        {cols.map((col, i) => (
          <div key={`col-${i}`} className="grid grid-cols-1 gap-7">
            {col.map(({ index, possiblePrime }, l) => {
              const line = index;
              return true ? (
                <TaggedNumber
                  className={`mx-auto ${
                    // ! (line / 100 > 1 && (line / 10) % 10 === 5) ||
                    //isMultipleOf11OfCol5(line) ||
                    //isMultipleOf13OfCol5(line) ||
                    //isMultipleOf17OfCol5(line) ||
                    //isMultipleOf19OfCol5(line) ||
                    //isMultipleOf29OfCol5(line) ||
                    //isMultipleOf23OfCol5(line) ||
                    //isMultipleOf33OfCol5(line) ||
                    //isMultipleOf37OfCol5(line) ||
                    //(line !== 1 && line % 10 === 1) || // ? (12 * 10x) + 5 = não primo kkkkkk
                    //line % 10 === 6 || //? (6-1) * algo = não primo kkkkkkk
                    (
                      line !== 1
                        ? lineRules[primeParents[i]]?.some((fn) => fn(line))
                        : false
                    )
                      ? //line % 7 === 0
                        "text-[#00000040!important] notPrime"
                      : simpleCheckPrime(possiblePrime)
                      ? ""
                      : "text-[red!important] notPrime"
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
                  className={`mx-auto text-[#00000040] text-xl font-semibold`}
                >
                  {possiblePrime}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </main>
  );
}
