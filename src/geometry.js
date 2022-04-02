export const vector = (x = 0, y = 0) => {
    return {
        x: typeof x === 'number' ? x : x.x,
        y: typeof x === 'number' ? y : x.y,
        add: function (other) {
            return vector(this.x + other.x, this.y + other.y);
        },
        sub: function (other) {
            return vector(this.x - other.x, this.y - other.y);
        },
        mul: function (factor) {
            return vector(this.x * factor, this.y * factor);
        },
        length: function () {
            return Math.hypot(Math.abs(this.x), Math.abs(this.y));
        },
        distanceTo: function (other) {
            return vector(other).sub(this).length();
        },
        setLength: function (length) {
            const len = this.length();
            return vector(this.x * length / len, this.y * length / len);
        },
        perpendicular: function () {
            return vector(-this.y, this.x);
        }
    }
};