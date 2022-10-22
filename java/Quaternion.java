import java.util.*;

public record Quaternion(double a, double b, double c, double d) {
    public Quaternion {
        if (Double.isNaN(a) || Double.isNaN(b) || Double.isNaN(c) || Double.isNaN(d)) {
            throw new IllegalArgumentException("must be a number");
        }
    }


    public static final Quaternion I = new Quaternion(0, 1, 0, 0);
    public static final Quaternion J = new Quaternion(0, 0, 1, 0);
    public static final Quaternion K = new Quaternion(0, 0, 0, 1);
    public static final Quaternion ZERO = new Quaternion(0, 0, 0, 0);

    public Quaternion plus(Quaternion q) {
        return new Quaternion(this.a + q.a, this.b + q.b, this.c + q.c, this.d + q.d);
    }

    public Quaternion minus(Quaternion q) {
        return new Quaternion(this.a - q.a, this.b - q.b, this.c - q.c, this.d - q.d);
    }

    public Quaternion times(Quaternion q) {
        return new Quaternion(
        q.a * this.a - q. b * this.b - q.c * this.c - q. d * this.d,
        q.a * this.b + q.b * this.a - q.c * this.d + q.d * this.c,
        q.a * this.c + q.b * this.d + q.c * this.a - q.d * this.b,
        q.a * this.d - q.b * this.c + q.c * this.b + q.d * this.a
        );
    }

    public List<Double> coefficients() {
        return List.of(this.a, this.b, this.c, this.d);
    }

}