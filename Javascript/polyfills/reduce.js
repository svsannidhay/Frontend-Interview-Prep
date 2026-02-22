Array.prototype.myReduce = function (callback, initialValue) {
  if (this === null || this === undefined) {
    throw new TypeError(
      "Array.prototype.myReduce - context is null or undefined",
    );
  }

  if (typeof callback !== "function") {
    throw new TypeError("Array.prototype.myReduce - callback is not callable");
  }

  if (initialValue === undefined && !this.length) {
    throw new TypeError("Reduce of empty array with no initial value");
  }

  let acc = initialValue === undefined ? this[0] : initialValue;
  let start = initialValue === undefined ? 1 : 0;
  for (let i = start; i < this.length; i++) {
    if (i in this) acc = callback(acc, this[i], i, this);
  }
  return acc;
};

console.log([1, 2, 3, 4].myReduce((acc, val) => acc + val, 0)); // 10
console.log([1, 2, 3, 4].myReduce((acc, val) => acc * val, 1));
