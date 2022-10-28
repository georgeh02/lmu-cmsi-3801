enum NegativeAmountError: Error {
  case negativeChange
}

func change(_ amount: Int) -> Result<(Int, Int, Int, Int), NegativeAmountError> {
  var amount = amount
  if amount < 0 {
    return .failure(.negativeChange)
  } else {
      var coins = [Int]()
      for (denomination) in [25, 10, 5] {
        let (q, r) = amount.quotientAndRemainder(dividingBy: denomination)
        coins.append(q)
        amount = r
      }
    coins.append(amount)
    return .success((coins[0], coins[1], coins[2], coins[3]))
  }
}

extension String {
  var stretched: String {
    return self.filter { !$0.isWhitespace }.enumerated().map {String(repeating: $1, count: $0+1)}.joined()
  }
}

extension Array {
    func mapThenUnique<T: Hashable>(f: (Element) -> T) -> Set<T> {
        return Set(map{ f($0) })
    }
}

func powers(of: Int, through: Int, then f: (Int) -> ()) {
    var power = 1
    while power <= through {
        f(power)
        power = power * of
    }
}

protocol Animal {
    var name: String { get }
    var sound: String { get }
}

extension Animal {
    func speak() -> String { return (self.name + " says " + self.sound) }
}

struct Horse: Animal {
    var name: String
    var sound = "neigh"
}

struct Cow: Animal {
    var name: String
    var sound = "moooo"
}

struct Sheep: Animal {
    var name: String
    var sound = "baaaa"
}

struct say { 
    var phrase: String
    init(_ phrase: String) {
        self.phrase = phrase
    }
    func and(_ x: String) -> say{
        return say(phrase + " " + x)
    }
}

func twice<T>(_ f: (T)->T, appliedTo x: T) -> T {
  return f(f(x))
}

func uppercasedFirst(of: [String], longerThan: Int) -> String? {
    return (of.first{ $0.count > longerThan })?.uppercased() ?? nil
}

struct Quaternion {
  var a: Double
  var b: Double
  var c: Double
  var d: Double

  static var I = Quaternion(a: 0, b: 1, c: 0, d: 0)
  static var J = Quaternion(a: 0, b: 0, c: 1, d: 0)
  static var K = Quaternion(a: 0, b: 0, c: 0, d: 1)
  static var ZERO = Quaternion(a: 0, b: 0, c: 0, d: 0)

  
  static func + (left: Quaternion, right: Quaternion) -> Quaternion {
      return Quaternion(a: left.a + right.a, b: left.b + right.b, c: left.c + right.c, d: left.d + right.d)
  }
  
  static func - (left: Quaternion, right: Quaternion) -> Quaternion {
      return Quaternion(a: left.a - right.a, b: left.b - right.b, c: left.c - right.c, d: left.d - right.d)
  }
  
  static func * (left: Quaternion, right: Quaternion) -> Quaternion {
      return Quaternion(a: right.a * left.a - right.b * left.b - right.c * left.c - right.d * left.d, b: right.a * left.b + right.b * left.a - right.c * left.d + right.d * left.c, c: right.a * left.c + right.b * left.d + right.c * left.a - right.d * left.b, d: right.a * left.d - right.b * left.c + right.c * left.b + right.d * left.a)
  }

  static func == (left: Quaternion, right: Quaternion) -> Bool {
    return [left.a, left.b, left.c, left.d] == [right.a, right.b, right.c, right.d]
  }
  
  var coefficients: [Double] {
      return [self.a, self.b, self.c, self.d];
  }

  var sign: [String] {
    return [self.a < 0 ? "" : "+",self.b < 0 ? "" : "+",self.c < 0 ? "" : "+",self.d < 0 ? "" : "+"]
  }
}

extension Quaternion: CustomStringConvertible {
      var description: String {
        return "\(a)\(self.sign[1])\(b)i\(self.sign[2])\(c)j\(self.sign[3])\(d)k"    }
}