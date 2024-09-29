"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { TaggedNumber } from "./_components/TaggedNumber";
import { checkPrime, simpleCheckPrime } from "./utils/algorithms";

function isMultipleOf11OfCol5(x: number) {
  // 11n - 4
  //? from 7 on, summing 11 will lead to uniquely non-primes
  // Solve for n
  const n = (x + 4) / 11;

  // Check if n is a positive integer
  return Number.isInteger(n) && n > 0;
}

function isMultipleOf13OfCol5(x: number) {
  // 13n - 7
  // Solve for n
  const n = (x + 7) / 13;

  // Check if n is a positive integer
  return Number.isInteger(n) && n > 0;
}

function isMultipleOf17OfCol5(x: number) {
  // 17n - 15
  // Solve for n
  const n = (x + 15) / 17;

  // Check if n is a positive integer
  return Number.isInteger(n) && n > 0;
}

function isMultipleOf19OfCol5(x: number) {
  // 19n - 20
  // Solve for n
  const n = (x + 20) / 19;

  // Check if n is a positive integer
  return Number.isInteger(n) && n > 0;
}

function isMultipleOf23OfCol5(x: number) {
  // 23n - 9
  // Solve for n
  const n = (x + 9) / 23;

  // Check if n is a positive integer
  return Number.isInteger(n) && n > 0;
}

function isMultipleOf29OfCol5(x: number) {
  // 29n - -3
  // Solve for n
  const n = (x - 3) / 29;

  // Check if n is a positive integer
  return Number.isInteger(n) && n > 0;
}

function isMultipleOf33OfCol5(x: number) {
  // 31n - 33
  // Solve for n
  const n = (x + 33) / 31;

  // Check if n is a positive integer
  return Number.isInteger(n) && n > 0;
}

function isMultipleOf37OfCol5(x: number) {
  // 37n - 21
  // Solve for n
  const n = (x + 21) / 37;

  // Check if n is a positive integer
  return Number.isInteger(n) && n > 0;
}

export function HomePage({
  cols,
  primes,
}: {
  cols: { index: number; possiblePrime: number }[][];
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

  return (
    <main className="flex min-h-screen flex-col gap-10 items-center p-24 bg-white">
      <div className="flex gap-3 text-black text-xl">
        <span>Primes found:</span>
        <span>
          {foundPrimes} in {totalNumbers} numbers
        </span>
      </div>
      <div className="grid grid-cols-2 gap-10 w-full text-center max-w-lg">
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
                  className={`mr-auto ${
                    // ! (line / 100 > 1 && (line / 10) % 10 === 5) ||
                    //isMultipleOf11OfCol5(line) ||
                    //isMultipleOf13OfCol5(line) ||
                    //isMultipleOf17OfCol5(line) ||
                    //isMultipleOf19OfCol5(line) ||
                    //isMultipleOf29OfCol5(line) ||
                    //isMultipleOf23OfCol5(line) ||
                    //isMultipleOf33OfCol5(line) ||
                    //isMultipleOf37OfCol5(line) ||
                    (line !== 1 && line % 10 === 1) || // ? (12 * 10x) + 5 = não primo kkkkkk
                    line % 10 === 6 || //? (6-1) * algo = não primo kkkkkkk
                    line % 7 === 0
                      ? "text-[#00000040!important]"
                      : simpleCheckPrime(possiblePrime)
                      ? ""
                      : "text-[red!important]"
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
                  className={`mr-auto text-[#00000040] text-xl font-semibold`}
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
