Function.prototype.myApply = function(thisArg, args = []) {
  if (typeof this !== 'function') {
    throw new TypeError("Function.prototype.myAppy - is not callable");
  }

  const context = thisArg === null ? globalThis : Object(thisArg);

  const fnKey = Symbol();
  context[fnKey] = this;
  const result = context[fnKey](...args);

  delete context[fnKey];
  return result;
}

const CONTEXT = {
    age: 25
}

function printAge(multiplier) {
    console.log(this?.age * multiplier);
}

printAge.myApply(CONTEXT, [2]);
printAge.myApply(CONTEXT, [3]);
printAge();
 