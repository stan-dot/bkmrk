import './App.css';
import { OptionsField } from './components/options';
import { PopupField } from './components/Popup';
import { BookmarkTable } from './components/Table';
import "./index.css";
import logo from './logo.svg';

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.unregister();

export default function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header> */}
      {/* <p>icon</p>
      <p>side panel with the tree</p>
      <p>scroll indicator on the side</p>
      <p>search - is in the table</p>
      <p>3 dots for manipulation</p>
      <p>sorting, keywords - need to do in the data source</p> */}
      {/* <BookmarkTable /> */}
      <OptionsField />
      <PopupField/>
    </div>
  );
}
