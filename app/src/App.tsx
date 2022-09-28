import './App.css';
import { BookmarkTable } from './components/Table';
import "./index.css";
import logo from './logo.svg';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <p>icon</p>
      <p>side panel with the tree</p>
      <p>scroll indicator on the side</p>
      <p>search - is in the table</p>
      <p>3 dots for manipulation</p>
      <p>sorting, keywords - need to do in the data source</p>
      <p> here there'll be a table</p>
      <BookmarkTable />
    </div>
  );
}
