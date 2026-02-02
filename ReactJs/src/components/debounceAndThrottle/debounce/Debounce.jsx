import React, { useCallback, useState, useRef, useEffect } from "react";
import { FETCH_API } from "./debounce.constants";

const useDebounce = (func, wait) => {
  const timerRef = useRef(null);
  const funcRef = useRef(func);

  useEffect(() => {
    funcRef.current = func;
  }, [func]);

  const debouncedFunc = useCallback(
    function (...args) {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        funcRef.current(...args);
      }, wait);
    },
    [wait],
  );

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  return debouncedFunc;
};

const Debounce = () => {
  const [count, setCount] = useState(0);

  const onClick = useCallback(() => {
    console.log(count);
    console.log("Debounced Button clicked!");
  }, [count]);

  const debouncedOnClick = useDebounce(onClick, 3000);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count ++</button>
      {count}
      <button onClick={debouncedOnClick}>Debounced log count</button>
    </div>
  );
};

export default Debounce;
