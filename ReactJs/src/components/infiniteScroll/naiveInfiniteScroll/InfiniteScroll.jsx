import React, { useState, useEffect } from "react";
import { fetchItems } from "./infiniteScroll.helpers";

const InfinteScrollContainer = () => {
  const [list, setList] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchItems({ setList, nextPageToken, setNextPageToken, setLoading });
  }, []);

  const handleScroll = (e) => {
    if (loading) return;
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      fetchItems({ setList, nextPageToken, setNextPageToken, setLoading });
    }
  };

  return (
    <div
      style={{ height: "80vh", overflowY: "auto" }}
      onScroll={handleScroll}
    >
      {list.map((item, index) => {
        return (
          <div
            key={index}
            style={{
              border: "1px solid black",
              margin: "10px",
              padding: "10px",
            }}
          >
            <h3>{item.data.title}</h3>
            <p>Author: {item.data.author}</p>
            <a href={item.data.url} target="_blank" rel="noreferrer">
              Link
            </a>
          </div>
        );
      })}
      {loading && <div style={{ height: "10px" }}>...Loading</div>}
    </div>
  );
};

export default InfinteScrollContainer;
