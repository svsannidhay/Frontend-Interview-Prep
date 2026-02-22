import { useQuery, useMutation, QueryClient, useQueryClient } from "@tanstack/react-query";
import "../App.css";
import { addPost, fetchPosts } from "../api/api";

function App() {
    const {data, error, isLoading} = useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts,
    });

    console.log(data, isLoading);

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: addPost,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["posts"],
            });
        },
    });
    
  return (
    <div className="container">
      <h1>React Query PlayGround</h1>
      <div className="content">
        {data?.map((post) => {
            return <div>{post.title}</div>
        })}
      </div>
      <button onClick={() => {
        mutate({
            id: `${data?.length+1}`,
            title: 'Dummmy',
            views: 0,
        })
      }}>Add DUMY</button>
    </div>
  );
}

export default App;


