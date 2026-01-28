Array.prototype.myReduce = function (callback, initialValue) {
  if (this === null || this === undefined) {
    throw new TypeError(
      "Array.prototype.myReduce - context is null or undefined",
    );
  }

  if (typeof callback !== "function") {
    throw new TypeError(
      "Array.prototype.myReduce - callback is not a function",
    );
  }

  let result = initialValue;

  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      if (result === undefined) {
        result = this[i];
        continue;
      }

      result = callback(result, this[i], i, this);
    }
  }

  return result;
};

console.log([1, 2, 3, 4].myReduce((acc, val) => acc + val, 0)); // 10
console.log([1, 2, 3, 4].myReduce((acc, val) => acc * val, 1));
