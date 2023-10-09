import { ToastContainer } from "react-toastify";
import "./App.css";
import { TableLoader } from "./components/Table";
import { PopupProvider } from "./features/alerts/PopupContext";
import { LocationProvider } from "./features/path/LocationContext";
import { PathProvider } from "./features/path/PathContext";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <div className="App">
      <LocationProvider>
        <PopupProvider>
          <PathProvider>
            <TableLoader />
          </PathProvider>
        </PopupProvider>
      </LocationProvider>
      <ToastContainer position="bottom-left" />
    </div>
  );
}

export default App;
