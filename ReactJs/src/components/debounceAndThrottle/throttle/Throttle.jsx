import { useState, useRef, useCallback } from 'react';

const useThrottle = (func, wait) => {
    const throttleRef = useRef(false);
    const funcRef = useRef(func);

    funcRef.current = func;

    const throttledFunc = useCallback((...args) => {
        if (throttleRef.current) return;
        throttleRef.current = true;
        funcRef.current(...args);
        setTimeout(() => {
            throttleRef.current = false;
        }, wait);
    }, [wait]);

    return throttledFunc;
}

const Throttle = () => {
    const [count, setCount] = useState(0);

    const onClick = useCallback(() => {
        console.log('Click', count);
    }, [count]);

    const throttledClick = useThrottle(onClick, 3000);

    return (
        <div>
            <button onClick={() => setCount(prev => prev + 1)}>Increment</button>
            {`Count: ${count}`}
            <button onClick={throttledClick}>Throttle Click</button>
        </div>
    );
};

export default Throttle;