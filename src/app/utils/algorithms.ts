export function checkSemiprime(num: number) {
  let cnt = 0;

  for (let i = 2; cnt < 2 && i * i <= num; ++i)
    while (num % i == 0) {
      num /= i;

      // Increment count
      // of prime numbers
      ++cnt;
    }

  // If number is greater than 1,
  // add it to the count variable
  // as it indicates the number
  // remain is prime number
  if (num > 1) ++cnt;

  // Return '1' if count is equal
  // to '2' else return '0'
  return cnt == 2 ? true : false;
}

export function simpleCheckPrime(possiblePrime: number) {
  if (possiblePrime < 1) return 0;

  let count = 0;
  const sqrtN = Math.sqrt(possiblePrime);

  for (let i = 1; i <= sqrtN; i++) {
    if (possiblePrime % i === 0) {
      count++; // i is a divisor
      if (i !== possiblePrime / i) {
        count++; // possiblePrime / i is also a divisor if it's different from i
      }
    }
  }

  if (count < 2)
    throw new Error(
      `⚠️ Space Time Anomaly Detected! ⚠️ \n ${possiblePrime} has ${count} multiples`
    );

  return count === 2;
}

export function checkPrime(possiblePrime: number, primes: number[]) {
  if (
    possiblePrime === 5 ||
    possiblePrime === 7 ||
    possiblePrime === 11 ||
    possiblePrime === 13
  )
    return true;
  const result = checkSemiprime(possiblePrime)
    ? false
    : possiblePrime % 5 === 0 ||
      possiblePrime % 7 === 0 ||
      possiblePrime % 11 === 0 ||
      possiblePrime % 13 === 0 ||
      primes.includes(Math.sqrt(possiblePrime))
    ? false
    : true;

  return result;
}
