function change(total) {
  if (total < 0) {
    throw new RangeError("amount cannot be negative");
  }
  let result = [0, 0, 0, 0];

  while (total >= 25) {
    result[0]++;
    total -= 25;
  }

  while (total >= 10) {
    result[1]++;
    total -= 10;
  }

  while (total >= 5) {
    result[2]++;
    total -= 5;
  }

  result[3] = total;
  return result;
}

function stretched(word) {
  let split = word.replace(/\s/g, "").split("");
  stretch = split.map((x, index) => x.repeat(index + 1));
  return stretch.join("");
}

function powers(base, limit, p) {
  let power = 0;
  while (base ** power <= limit) {
    p(base ** power);
    power++;
  }
}

function* powersGenerator(base, limit) {
  let value = 1;
  while (value <= limit) {
    yield value;
    value *= base;
  }
}

function say(word) {
  if (word === undefined) return 0;
  else y => {if (y === undefined) return word else word =  }

}

function makeCryptoFunctions({ forKey, using, withIV }) {
  return [
    crypto.createCipheriv(using, forKey, withIV),
    crypto.createDecipheriv(using, forKey, withIV),
  ];
}

function topTenScorers(list) {
   return Object.entries(list).flatMap((players) => );

// First, use Object.entries so you are working with a stream of [team, playerlist] pairs.
// FlatMap this entry array with the operation that adds the team to the end of each player array. (Full credit if you use the spread operator, fewer points for using concat.
// Filter to keep only those players who have appeared in 15 or more games.
// Map to build objects for each player with their points per game included.
// Sort by decreasing points per game.
// Keep the first 10 items (using slice).

}

async function pokemonInfo(pokemon) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  const data = await response.json();
  return `id: ${data.id}, name: ${data.name}, weight: ${data.weight}`;
}

class Quaternion {
  constructor(a, b, c, d) {
    this.q1 = a;
    this.q2 = b;
    this.q3 = c;
    this.q4 = d;
  }

  plus(other) {
    return new Quaternion(
      this.q1 + other.q1,
      this.q2 + other.q2,
      this.q3 + other.q3,
      this.q4 + other.q4
    );
  }

  times(other) {
    return new Quaternion(
      this.q1 * other.q1 -
        this.q2 * other.q2 -
        this.q3 * other.q3 -
        this.q4 * other.q4,
      this.q1 * other.q2 +
        this.q2 * other.q1 +
        this.q3 * other.q4 -
        this.q4 * other.q3,
      this.q1 * other.q3 -
        this.q2 * other.q4 +
        this.q3 * other.q1 +
        this.q4 * other.q2,
      this.q1 * other.q4 +
        this.q2 * other.q3 -
        this.q3 * other.q2 +
        this.q4 * other.q1
    );
  }

  coefficients() {
    return [this.q1, this.q2, this.q3, this.q4];
  }
}
