console.log("Debounce Module Loaded");

// Debounce
function debounceV1(func, wait) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.call(this, ...args);
    }, wait);
  };
}

// Debounce with flush and cancel
export default function debounceV2(func, wait) {
  let timer;
  let context = null;
  let cachedArgs = null;

  const debouncedFunc = function (...args) {
    clearTimeout(timer);
    context = this;
    cachedArgs = args;
    timer = setTimeout(() => {
      func.call(context, ...cachedArgs);
      timer = null;
    }, wait);
  };

  debouncedFunc.flush = () => {
    if (timer) {
      clearTimeout(timer);
      func.call(context, ...cachedArgs);
      timer = null;
    }
  };

  debouncedFunc.cancel = () => {
    clearTimeout(timer);
    timer = null;
  };

  return debouncedFunc;
}

// Usage Example
function loggerToBeDebounced(arg1, arg2) {
  console.log(`logger Method ${this?.name}: ${arg1}, ${arg2}`);
}

const CONTEXT_OBJECT = {
  name: "Sannidhay",
  debouncedLogger: debounceV1(loggerToBeDebounced, 2000),
  logger: loggerToBeDebounced,
};

const debouncedLogger = debounceV1(CONTEXT_OBJECT.logger, 2000);
const forcedBindDebouncedLogger = debounceV1(
  CONTEXT_OBJECT.logger.bind(CONTEXT_OBJECT),
  2000
);
// CONTEXT_OBJECT.debouncedLogger('Hello', 'World!'); // This will have the value for this as we are calling with CONTEXT_OBJECT
// debouncedLogger ('Hello', 'World!'); // This won't have the value for this as we are calling directly
// forcedBindDebouncedLogger ('Hello', 'World!'); // This will have the value for this as we are binding with CONTEXT_OBJECT

function initDebounceDemo() {
  const body = document.body;
  const debounceButtonWrapper = document.createElement("div");
  const unBindedDebounceBUtton = document.createElement("button");
  unBindedDebounceBUtton.textContent = "Click Me (Unbinded Debounce)";
  unBindedDebounceBUtton.onclick = () => {
    console.log("Calling debounced logger");
    debouncedLogger("Hello", "World!"); // Without the binded this
  };

  const implictBindedDebounceButton = document.createElement("button");
  implictBindedDebounceButton.textContent = "Click Me (Binded Debounce)";
  implictBindedDebounceButton.onclick = () => {
    console.log("Calling debounced logger");
    CONTEXT_OBJECT.debouncedLogger("Hello", "World!"); // With the context object as this
  };

  const forcedBindedDebounceButton = document.createElement("button");
  forcedBindedDebounceButton.textContent = "Click Me (Forced Binded Debounce)";
  forcedBindedDebounceButton.onclick = () => {
    console.log("Calling debounced logger");
    forcedBindDebouncedLogger("Hello", "World!"); // With the binded this
  };

  debounceButtonWrapper.appendChild(unBindedDebounceBUtton);
  debounceButtonWrapper.appendChild(implictBindedDebounceButton);
  debounceButtonWrapper.appendChild(forcedBindedDebounceButton);
  body.appendChild(debounceButtonWrapper);
}

initDebounceDemo();
