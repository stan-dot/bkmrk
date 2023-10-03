import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContextMenu from "./features/context-menu/ContextMenu";
import Popup from "./components/multi-displayers/Popup";
import { TableLoader } from "./components/Table";
import { ContextMenuProvider } from "./features/context-menu/ContextMenuContext";
import { HistoryProvider } from "./features/history/HistoryContext";
import { PathProvider } from "./features/path/PathContext";
import { PopupProvider } from "./features/alerts/PopupContext";
import { LocationProvider } from "./contexts/LocationContext";
// import "../public/styles/globals.css";

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.unregister();

// todo make it detect when it's inside the options, and when the window, and when the bookmark page
// options should go into settings
export default function App() {
  return (
    <div className="App w-full h-full">
      <LocationProvider>
        <PopupProvider>
          {/* <ContextMenuProvider> */}
          <PathProvider>
            <HistoryProvider>
              <TableLoader />
              <Popup />
              <ContextMenu />
            </HistoryProvider>
          </PathProvider>
          {/* </ContextMenuProvider> */}
        </PopupProvider>
      </LocationProvider>
      <ToastContainer position="bottom-left" />
    </div>
  );
}
