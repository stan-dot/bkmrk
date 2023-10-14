import { ToastContainer } from "react-toastify";
import "./App.css";
import { TableLoader } from "./components/Table";
import { PopupProvider } from "./features/alerts/PopupContext";
import { LocationProvider } from "./features/path/LocationContext";
import { PathProvider } from "./features/path/PathContext";
import { NewTableLoader } from "./components/NewTable";
import { BookmarksProvider } from "./lib/GlobalReducer";
import New2Table from "./components/New2Table";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <div className="App">
      {
        /* <LocationProvider>
        <PopupProvider>
          <PathProvider> */
      }
      <BookmarksProvider>
        <New2Table />
      </BookmarksProvider>
      {/* <NewTableLoader /> */}
      {
        /* </PathProvider>
        </PopupProvider>
      </LocationProvider> */
      }
      <ToastContainer position="bottom-left" />
    </div>
  );
}

export default App;
