import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContextMenu from "./components/multi-displayers/ContextMenu";
import Popup from "./components/multi-displayers/Popup";
import { TableLoader } from "./components/Table";
import { ContextMenuProvider } from "./contexts/ContextMenuContext";
import { PathProvider } from "./contexts/PathContext";
import { PopupProvider } from "./contexts/PopupContext";
import { RootProvider } from "./contexts/RootContext";
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
      <RootProvider>
        <PopupProvider>
          <ContextMenuProvider>
            <PathProvider>
              <TableLoader />
              <Popup />
              <ContextMenu />
            </PathProvider>
          </ContextMenuProvider>
        </PopupProvider>
      </RootProvider>
      <ToastContainer position="bottom-left" />
    </div>
  );
}
