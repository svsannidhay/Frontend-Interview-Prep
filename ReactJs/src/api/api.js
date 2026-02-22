export const fetchPosts = async() => {
    const response = await fetch('http://localhost:3001/posts');

    const posts = await response.json();
    return posts;

}

export const fetchComments = async () => {

}

export const addPost = async (post) => {
    const response = await fetch('http://localhost:3001/posts', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post)
    })
}