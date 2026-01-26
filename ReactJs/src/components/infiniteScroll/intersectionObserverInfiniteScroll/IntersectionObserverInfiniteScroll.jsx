import React, { useState, useEffect, useRef } from "react";
import { fetchItems } from "./helpers";

const IntersectionObserverInfiniteScroll = () => {
  const [list, setList] = useState([]);

  const listContainerRef = useRef();
  const listEndRef = useRef();
  const nextPageTokenRef = useRef(undefined);
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingRef.current) {
          fetchItems({ setList, nextPageTokenRef, loadingRef, setLoading });
        }
      },
      {
        root: listContainerRef.current,
        rootMargin: "0px",
        threshold: 0.1,
      },
    );

    observer.observe(listEndRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ height: "80vh", overflow: "auto" }} ref={listContainerRef}>
      {list.map((item, index) => {
        return (
          <div
            key={index}
            style={{ border: "1px solid black", height: "100px" }}
          >
            {item.data.title}
          </div>
        );
      })}
      <div ref={listEndRef} style={{ height: "1px" }}></div>
      {loading && <div style={{ height: "12px" }}>...Loading</div>}
    </div>
  );
};

export default IntersectionObserverInfiniteScroll;
