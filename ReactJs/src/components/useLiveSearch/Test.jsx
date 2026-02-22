import useLiveSearch from "./useLiveSearch";
import { useState, useRef, useEffect } from "react";

const Test = () => {
  const [query, setQuery] = useState("");
  const ref = useRef(null);

  const { data, loading, error } = useLiveSearch(query);

  console.log(data);

  useEffect(() => {
    ref.current.addEventListener('click', () => {
      Promise.resolve().then(() => {
        console.log("MicroTask1");
      });
      console.log("Listner1");
    });

    ref.current.addEventListener('click', () => {
      Promise.resolve().then(() => {
        console.log("MicroTask2");
      });
      console.log("Listner2");
    });
    ref.current.click();
  }, []);

  return (
    <div>
      <button ref={ref}>CLikc me</button>
      <input
        type="text"
        onChange={(e) => {
          e.preventDefault();
          setQuery(e.target.value);
        }}
      />
      {!loading ? (
        <div>
          {data.map((d) => {
            return <div>{d.id}</div>;
          })}
        </div>
      ) : (
        "Loading"
      )}
    </div>
  );
};

export default Test;
