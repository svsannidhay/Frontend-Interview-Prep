Function.prototype.myBind = function (thisArg, ...initArgs) {
  if (typeof this !== 'function') {
    throw new TypeError("Function.prototype.myBind - is not callable");
  }

  const fn = this;
  function boundFn (...args){
    const context = this instanceof boundFn ? this : thisArg === null ? globalThis : Object(thisArg);
  
    const fnKey = Symbol();
    context[fnKey] = fn
    return context[fnKey](...initArgs, ...args);
  } 

  return boundFn
}

function Person(name) {
  this.name = name;
}

const Bound = Person.myBind({ a: 1 });
const p = new Bound('Alice');

console.log(p);

p instanceof Person; // true
