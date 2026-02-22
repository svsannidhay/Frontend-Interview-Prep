import { useCallback, useState } from "react";
import "./styles.css";

// https://www.youtube.com/watch?v=fGxKOmCuH5w 
// Default Keys are index, so thats why they dont re-render as key never changes

function Child() {
  const [count, setCount] = useState(0);

  return (
    <div>
      {count}
      <button onClick={() => setCount((prev) => prev + 1)}>Inc</button>
    </div>
  );
}

export default function App() {
  const [childs, setChilds] = useState([0, 1]);

  const swap = useCallback(() => {
    setChilds((prev) => {
      if (prev[0] === 0) return [1, 0];
      return [0, 1];
    });
  }, []);

  return (
    <div className="App">
      <div>
        order :{" "}
        {childs.map((value) => (
          <span>{value}</span>
        ))}
      </div>

      {childs.map((val, index) => (
        <Child key={val} />
      ))}

      <button onClick={swap}>swap</button>
    </div>
  );
}
