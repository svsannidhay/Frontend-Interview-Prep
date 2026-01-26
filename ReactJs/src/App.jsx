import "./App.css";
import IntfiniteScroll from "./components/infiniteScroll/intersectionObserverInfiniteScroll";

function App() {
  return (
    <div className="container">
      <h1>PlayGround</h1>
      <div className="content">
        <IntfiniteScroll />
      </div>
    </div>
  );
}

export default App;
