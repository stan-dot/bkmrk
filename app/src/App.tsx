import './App.css';
import { TableLoader } from './components/Table';
import "./index.css";

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.unregister();

export default function App() {
  return (
    <div className="App" style={{ width: window.screen.availWidth, height: window.screen.availHeight }}>
      <TableLoader />
    </div>
  );
}
