import { HomePage } from "./HomePage";
import { checkSemiprime } from "./utils/algorithms";

const base = 12;
export const primeParents = [1, 5, 7, 11];

export default function Home() {
  const generateCol = (primeParent: number, from = -10, to = 1000) => {
    const resultingArray = [];
    for (let index = from; index < to + 1; index++) {
      //TODO, calcular removendo o anterior para ser infinito (nao quebrar pelo limite de tamanho de um array)
      const possiblePrime = primeParent + 12 * (index - 1);
      resultingArray.push({ index, possiblePrime });
    }
    return resultingArray;
  };

  const generateCols = () => {
    return primeParents.map((parent) => generateCol(parent));
  };

  const generateColsByLine = (line = 1) => {
    return primeParents.map((parent) => {
      const resultingArray = [parent];
      for (let index = 0; index < line; index++) {
        const possiblePrime = resultingArray[resultingArray.length - 1] + base;
        resultingArray.push(possiblePrime);
        resultingArray.shift();
      }
      return resultingArray;
    });
  };

  const cols = generateCols();

  // Create a Set for faster lookups
  const primeSet = new Set<number>();

  //? todo multiplo de 5 que ta aparecendo na lista, é um semi primo * 5?
  // Populate the Set with primes from cols
  cols.forEach((col) => {
    col.forEach(({ possiblePrime }) => {
      if (
        possiblePrime % 5 !== 0 &&
        possiblePrime % 7 !== 0 &&
        possiblePrime % 11 !== 0 &&
        possiblePrime % 13 !== 0
      ) {
        primeSet.add(possiblePrime);
      }
    });
  });

  // Convert the Set back to an array and filter out semi-primes
  const primes = Array.from(primeSet)
    .filter((primeOrSquare) => {
      const sqrt = Math.sqrt(primeOrSquare);
      return Number.isInteger(sqrt) ? !primeSet.has(sqrt) : true;
    })
    .filter((primeOrSemiprime) => !checkSemiprime(primeOrSemiprime));

  //const primeAmount =
  //  primes.filter((primeOrSquare) => !primes.includes(Math.sqrt(primeOrSquare)))
  //    .length + 6; /// [2, 3, 5, 7, 11, 13]

  //const missingPrimes = primes
  //  .filter((primeOrSquare) => !primes.includes(Math.sqrt(primeOrSquare)))
  //  .filter((prime) => !staticPrimes.includes(prime));

  //console.log(missingPrimes);

  //
  ////TODO semi-primes part 3 (rare primes that only have one solution: a random prime multiplied by another random prime)
  //
  //return (
  //  <div>
  //    5, 7, 11, 13, {` `}
  //    {primes
  //      .flat()
  //      .sort((a, b) => a - b)
  //      .join(", ")}
  //  </div>
  //);

  return <HomePage cols={cols} primes={primes} />;
}
