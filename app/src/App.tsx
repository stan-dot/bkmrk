import './App.css';
import { LinkPreviewer } from './components/LinkPreviewer';
import logo from './logo.svg';
import "./index.css";

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <LinkPreviewer
        link="https://hackernoon.com/"
      >
        IT news website: hackernoon
      </LinkPreviewer>
      <LinkPreviewer
        link="https://dev.to"
      >
      another IT news website: dev.to
      </LinkPreviewer>
    </div>
  );
}
