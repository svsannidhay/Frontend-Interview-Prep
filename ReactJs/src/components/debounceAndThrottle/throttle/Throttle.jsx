import React, { useState, useRef, useCallback, useEffect } from "react";

const useThrottle = (func, delay) => {
  const shouldThrottle = useRef(false);

  const throttledFunc = useCallback(
    (...args) => {
      if (!shouldThrottle.current) {
        func(...args);
        shouldThrottle.current = true;
        setTimeout(() => {
          shouldThrottle.current = false;
        }, delay);
      }
    },
    [func, delay],
  );

  useEffect(() => {
    return () => {
      shouldThrottle.current = false;
    };
  }, []);

  return throttledFunc;
};

const Throttle = () => {
  const [count, setCount] = useState(0);

  const onClick = useCallback(() => {
    console.log("Throttle Button clicked!", count);
  }, [count]);

  const throtttledOnClick = useThrottle(onClick, 3000);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count ++</button>
      {count}
      <button onClick={throtttledOnClick}>Throttle Button</button>
    </div>
  );
};

export default Throttle;
