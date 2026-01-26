import { INFINITE_SCROLL_FETCH_API } from "./infiniteScroll.constants";

export const fetchItems = async ({ setList, nextPageToken, setNextPageToken, setLoading }) => {
    if (nextPageToken === null) return;
    setLoading(true);
    let baseUrl = `${INFINITE_SCROLL_FETCH_API}?limit=10`;
    if (nextPageToken) {
        baseUrl += `&after=${nextPageToken}`;
    }
    await fetch(baseUrl).then(async (res) => {
        const response = await res.json();
        setList((prev) => [...prev, ...response.data.children]);
        setNextPageToken(response.data.after);
        console.log(response)
        setLoading(false);
    })
};