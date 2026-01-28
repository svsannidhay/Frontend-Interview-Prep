function myNew(constructor, ...args) {
    if (typeof constructor !== 'function') {
        throw new TypeError("myNew - constructor is not a function");
    }

    const obj = Object.create(constructor.prototype); 
    // Equivalent to: const obj = {};
    // obj.__proto__ = constructor.prototype;

    const result = constructor.apply(obj, args);

    return (typeof result === 'object' && result !== null) ? result : obj;
}

function Person(name) {
    this.name = name;
    return 1;
}



const p = myNew(Person, 'Alice');

console.log(p); 