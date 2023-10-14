import { ToastContainer } from "react-toastify";
import "./App.css";
import Table from "./components/Table";
import { PopupProvider } from "./features/alerts/PopupContext";
import { BookmarksProvider } from "./lib/GlobalReducer";
import AlertManager from "./features/alerts/AlertManager";

function App() {
  return (
    <div className="App">
      <BookmarksProvider>
        <PopupProvider>
          <Table />
          <AlertManager />
        </PopupProvider>
      </BookmarksProvider>
      <ToastContainer position="bottom-left" />
    </div>
  );
}

export default App;
