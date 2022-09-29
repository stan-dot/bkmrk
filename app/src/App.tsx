import './App.css';
import { BookmarkTable } from './components/Table';
import "./index.css";

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.unregister();

export default function App() {
  console.log('starting the app');
  return (
    <div className="App">
      <p>icon</p>
      <p>side panel with the tree</p>
      <p>scroll indicator on the side</p>
      <p>search - is in the table</p>
      <p>3 dots for manipulation</p>
      <p>sorting, keywords - need to do in the data source</p>
      <BookmarkTable />
    </div>
  );
}
