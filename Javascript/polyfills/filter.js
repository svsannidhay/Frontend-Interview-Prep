Array.prototype.myFilter = function(callback, thisArg) {
    if (this === null || this === undefined) {
        throw new TypeError("Array.prototype.myFilter - context is null or undefined");
    }

    if (typeof callback !== 'function') {
        throw new TypeError("Array.prototype.myFilter - callback is not a function");
    }

    const context = Object(thisArg);
    const result = [];
    for (let i in this) {
        if (i in this) {
            if (callback.call(context, this[i], i, this)) {
                result.push(this[i]);
            }
        }
    }
    return result;
};

console.log([1, 2, 3, 4].myFilter((value) => value % 2 == 0)); // [2, 4]
console.log([1, 2, 3, 4].myFilter((value) => value < 3)); // [1, 2]