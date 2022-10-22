import crypto from "crypto";

export function change(amount) {
  if (amount < 0) {
    throw new RangeError("amount cannot be negative");
  }
  let [coins, remaining] = [[], amount];
  for (let denomination of [25, 10, 5]) {
    coins.push(Math.floor(remaining / denomination));
    remaining %= denomination;
  }
  coins.push(remaining);
  return coins;
}

export function stretched(s) {
  return [...s.replaceAll(" ", "")].map((c, i) => c.repeat(i + 1)).join("");
}

export function powers(base, limit, consume) {
  for (let power = 1; power <= limit; power *= base) {
    consume(power);
  }
}

export function* powersGenerator(base, limit) {
  for (let power = 1; power <= limit; power *= base) {
    yield power;
  }
}

/*
 * The world-famous curried say function.
 *
 * This function can be reduced to one line:
 *
 *   s = a => a===undefined ? '' : b => b===undefined ? a : s(a + ' ' + b)
 *
 * If you take some liberties with it, which you shouldn't, you can get:
 *
 *   s = a => !a ? '' : b => !b ? a : s(a + ' ' + b)
 *
 * or golfed even more:
 *
 *   s=a=>a?b=>b?s(a+' '+b):a:''
 *
 * but falsiness is not the same as undefined so, it's cute but not right. The
 * empty string (and for that matter 0, 0n, null, and NaN) are perfectly good
 * arguments and should be part of a chain.
 */
export function say(first) {
  if (first === undefined) {
    return "";
  }
  return (second) => {
    if (second === undefined) {
      return first;
    }
    return say(`${first} ${second}`);
  };
}

/* Returns an array of two functions, an encyptor and a decryptor, each using a
 * given key, algorithm, and initialization vector. The encryptor turns a UTF-8
 * encoded string into a hex-string; the decryptor does the reverse.
 */
export function makeCryptoFunctions({
  forKey: key,
  using: algorithm,
  withIV: iv,
}) {
  return [
    (data) => {
      const cipher = crypto.createCipheriv(algorithm, key, iv);
      return cipher.update(data, "utf-8", "hex") + cipher.final("hex");
    },
    (data) => {
      const cipher = crypto.createDecipheriv(algorithm, key, iv);
      return cipher.update(data, "hex", "utf-8") + cipher.final("utf-8");
    },
  ];
}

export function topTenScorers(stats) {
  return Object.entries(stats)
    .flatMap(([team, players]) => players.map((player) => [...player, team]))
    .filter(([, games, ,]) => games >= 15)
    .map(([name, games, points, team]) => ({ name, ppg: points / games, team }))
    .sort((p1, p2) => p2.ppg - p1.ppg)
    .slice(0, 10);
}

export async function pokemonInfo(name) {
  name = encodeURIComponent(name); //making the code safe from url injection hack
  const url = `https://pokeapi.co/api/v2/pokemon/${name}/`;
  const response = await fetch(url);
  if (response.status < 200 || response.status > 299) {
    return { error: `No information for ${decodeURIComponent(name)}` };
  }
  const data = await response.json();
  return { id: data.id, name: data.name, weight: data.weight };
}

export class Quaternion {
  #a;
  #b;
  #c;
  #d;
  constructor(a, b, c, d) {
    this.#a = a;
    this.#b = b;
    this.#c = c;
    this.#d = d;
  }
  plus(q) {
    return new Quaternion(
      this.#a + q.#a,
      this.#b + q.#b,
      this.#c + q.#c,
      this.#d + q.#d
    );
  }
  times(q) {
    return new Quaternion(
      q.#a * this.#a - q.#b * this.#b - q.#c * this.#c - q.#d * this.#d,
      q.#a * this.#b + q.#b * this.#a - q.#c * this.#d + q.#d * this.#c,
      q.#a * this.#c + q.#b * this.#d + q.#c * this.#a - q.#d * this.#b,
      q.#a * this.#d - q.#b * this.#c + q.#c * this.#b + q.#d * this.#a
    );
  }
  coefficients() {
    return [this.#a, this.#b, this.#c, this.#d];
  }
}
