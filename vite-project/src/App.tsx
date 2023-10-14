import { ToastContainer } from "react-toastify";
import "./App.css";
import New2Table from "./components/New2Table";
import { PopupProvider } from "./features/alerts/PopupContext";
import { BookmarksProvider } from "./lib/GlobalReducer";

function App() {
  return (
    <div className="App">
      <BookmarksProvider>
        <PopupProvider>
          <New2Table />
        </PopupProvider>
      </BookmarksProvider>
      <ToastContainer position="bottom-left" />
    </div>
  );
}

export default App;
