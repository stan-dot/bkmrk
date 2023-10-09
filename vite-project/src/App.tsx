import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { TestContextMenu } from "./test-contextmenu/TestContextMenu";
import { TableLoader } from "./components/Table";
import { LocationProvider } from "./features/path/LocationContext";
import { PopupProvider } from "./features/alerts/PopupContext";
import { PathProvider } from "./features/path/PathContext";
import { ToastContainer } from "react-toastify";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <div className="App">
      <LocationProvider>
        <PopupProvider>
          <PathProvider>
            {/* {ViteHeader(setCount, count)} */}
            <TableLoader />
            <TestContextMenu />
          </PathProvider>
        </PopupProvider>
      </LocationProvider>
      <ToastContainer position="bottom-left" />
    </div>
  );
}

export default App;

function ViteHeader(setCount: Function, count: number) {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>Hello Vite + React!</p>
      <p>
        <button type="button" onClick={() => setCount((c: number) => c + 1)}>
          count is: {count}
        </button>
      </p>
      <p>
        Edit <code>App.tsx</code> and save to test HMR updates.
      </p>
      <p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {" | "}
        <a
          className="App-link"
          href="https://vitejs.dev/guide/features.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Vite Docs
        </a>
      </p>
    </header>
  );
}
