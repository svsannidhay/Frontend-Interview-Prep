Array.prototype.myMap = function(callback, thisArg) {
    if (this === null || this === undefined) {
        throw new TypeError("Array.prototype.myMap - context is null or undefined");
    }

    if (typeof callback !== 'function') {
        throw new TypeError("Array.prototype.myMap - callback is not a function");
    }

    const context = Object(thisArg);
    const result = new Array(this.length);

    for (let i = 0; i < this.length; i++) {
        if (i in this) result[i] = callback.call(context, this[i], i, this);
    }
    return result;
};

console.log([1, 2, 3, 4].map((i) => i)); // [1, 2, 3, 4]
console.log([1, 2, 3, 4].map((i) => i * i)); // [1, 4, 9, 16]