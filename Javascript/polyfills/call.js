Function.prototype.myCall = function (thisArg, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError("Function.prototype.myCall is not callable");
  }

  const context = thisArg === null ? globalThis : Object(thisArg);

  const fn = Symbol();
  context[fn] = this;

  const result = context[fn](...args);
  delete context[fn];

  return result;
};

const CONTEXT = {
    age: 25
}

function printAge(multiplier) {
    console.log(this?.age * multiplier);
}

printAge.myCall(CONTEXT, 3);
printAge.myCall(CONTEXT, 4);
printAge();