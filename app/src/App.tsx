import { TableLoader } from './components/Table';
// import "../public/styles/globals.css";

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.unregister();

// todo make it detect when it's inside the options, and when the window, and when the bookmark page
// options should go into settings
export default function App() {
  return (
    <div className="App" style={{ width: window.screen.availWidth, height: window.screen.availHeight }}>
      <TableLoader />
    </div>
  );
}
