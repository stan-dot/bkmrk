import './App.css';
import { TableLoader } from './components/Table';
import "./index.css";

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.unregister();

export default function App() {
  return (
    <div className="App">
      <p>icon</p>
      <p>side panel with the tree</p>
      <p>lunr search - is in the table</p>
      <p>sorting, keywords - need to do in the data source</p>
      <p>side panel for only opening folders with such and such tag, and with color moods</p>
      <TableLoader />
    </div>
  );
}
