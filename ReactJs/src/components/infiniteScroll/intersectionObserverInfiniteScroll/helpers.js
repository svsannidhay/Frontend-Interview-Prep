import { INFINITE_SCROLL_FETCH_API } from "./constants";

export const fetchItems = async ({ setList, nextPageTokenRef, loadingRef, setLoading }) => {
  if (nextPageTokenRef.current === null || loadingRef.current) return;
  loadingRef.current = true;
  setLoading(true);
  let url = `${INFINITE_SCROLL_FETCH_API}?limit=10`;
  if (nextPageTokenRef.current) {
    url += `&after=${nextPageTokenRef.current}`;
  }
  await fetch(url).then(async (req) => {
    const response = await req.json();
    nextPageTokenRef.current = response.data.after;
    setList((prev) => [...prev, ...response.data.children]);
  });
  setLoading(false);
  loadingRef.current = false;
};
