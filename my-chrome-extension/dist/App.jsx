const react = require('react');
const ReactDOM = require('react-dom');
function App() {
    return (React.createElement("div", null,
        React.createElement("h1", null, "Hello, Chrome!")));
}
const container = document.getElementById('mydiv');
const root = ReactDOM.createRoot(container);
root.render(<App />)
