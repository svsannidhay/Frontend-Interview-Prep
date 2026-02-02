import "./App.css";
// import IntfiniteScroll from "./components/infiniteScroll/Temp/InfiniteScroll";
// import Debounce from "./components/debounceAndThrottle/debounce/Debounce";
import Throttle from "./components/debounceAndThrottle/throttle/Throttle";

function App() {
  return (
    <div className="container">
      <h1>PlayGround</h1>
      <div className="content">
        {/* <IntfiniteScroll /> */}
        {/* <Debounce /> */}
        <Throttle />
      </div>
    </div>
  );
}

export default App;
