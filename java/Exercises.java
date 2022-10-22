import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;
import java.util.function.IntConsumer;
import java.util.function.Predicate;

public class Exercises {
    
    private Exercises() {
        //intentionally empty
    }
    
    public static List<Integer> change(int amount) {
        if (amount < 0) {
            throw new IllegalArgumentException("amount must not be negative");
        }
        var coins = new ArrayList<Integer>();
        for (var denomination : List.of(25, 10, 5)) {
            coins.add(amount / denomination);
            amount %= denomination;
        }
        coins.add(amount);
        return List.copyOf(coins);
    }

    public static String stretched(String s) {
        return s.codePoints().mapToObj(c -> String.valueOf((char) c)).map(c -> c.replace(" ", "")).map(c -> c.replace("\t", "")).map(c -> c.replace("\n", "")).collect(Collectors.joining());

    }

    public static void powers(int base, int limit, IntConsumer consumer) {
        for (var power = 1; power <= limit; power *= base) {
            consumer.accept(power);
        }
    }

    public static IntStream powersStream(int base) {
        return IntStream.iterate(1, n -> n * base);
    }

    public static String say(String s) {
        return null;
    }

    public static Optional<String> findFirstThenLower(Predicate<String> p, List<String> strings) {
        return strings.stream().filter(p).findFirst().map(string -> string.toLowerCase());    
    }


    public static List<String> topTenScorers(Map<String, List<String>> stats) {
        return null;
}
