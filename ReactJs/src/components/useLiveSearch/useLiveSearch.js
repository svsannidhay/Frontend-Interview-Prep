import { useRef, useState, useCallback, useEffect } from "react";

const useDebounce = (func, delay) => {
  const debounceRef = useRef(null);
  const funcRef = useRef(func);

  funcRef.current = func;

  const debouncedFunc = useCallback(
    (...args) => {
      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        funcRef.current(...args);
      }, delay);
    },
    [delay],
  );

  useEffect(() => {
    return () => {
      clearTimeout(debounceRef.current);
    };
  }, []);

  return debouncedFunc;
};

const useLiveSearch = (query) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const controllerRef = useRef(null);

  const fetchResults = useCallback((searchTerm) => {
    // Abort previous request
    controllerRef.current?.abort();

    const controller = new AbortController();
    controllerRef.current = controller;

    setLoading(true);
    setError(null);

    const api = searchTerm
      ? `https://api.github.com/search/repositories?q=${searchTerm}}`
      : "https://api.github.com/search/repositories?q=Sample";

    fetch(api, {
      signal: controller.signal,
    })
      .then(async (res) => {
        const data = await res.json();
        setData(data.items || []);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const debouncedFetch = useDebounce(fetchResults, 1000);

  useEffect(() => {
    debouncedFetch(query);
  }, [query, debouncedFetch]);

  return {
    data,
    loading,
    error,
  };
};

export default useLiveSearch;
