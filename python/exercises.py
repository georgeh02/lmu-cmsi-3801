from typing import Tuple

def change(amount: int) -> Tuple[int, int, int, int]:
    try:
        !isinstance(amount, int)
    except TypeError:
        raise TypeError()
    try:
        amount < 0
    except ValueError:
        raise ValueError("amount cannot be negative")

    result = [0, 0, 0, 0]

    while amount >= 25:
        result[0] += 1
        amount -= 25

    while amount >= 10:
        result[1] += 1
        amount -= 10

    while amount >= 5:
        result[2] += 1
        amount -= 5

    tupleResult = (result[0], result[1], result[2], amount)
    return tupleResult

def stretched(s: str) -> str:
    s = s.replace(' ', '').replace('\t', '').replace('\n', '')
    x = [i * (s.index(i) + 1) for i in s]
    return ''.join(x)

def powers(*, base: int, limit: int) -> list:
    power = 1
    while power <= limit:
        yield power
        power = power * base

def say(s: str) -> str:
    return ''

def find_first_then_lower(f, l: list) -> str:
    for x in l:
        if f(x):
            return x.lower()
    raise ValueError("no value in list satisfies property")

def top_ten_scorers(input) -> list:
    result = []
    for team in input:
        result = result + [(players[0], format(players[2] / players[1],
                                               ".2f"), team)
                           for players in input[team] if players[1] >= 15]
    result.sort(key=lambda player: -float(player[1]))
    result = [("|".join(player)) for player in result]
    return result[:10]