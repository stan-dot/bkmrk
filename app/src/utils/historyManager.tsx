// Create your own history instance.
import { createBrowserHistory } from "history";
let history = createBrowserHistory();

// ... or just import the browser history singleton instance.
import history from "history/browser";

// Alternatively, if you're using hash history import
// the hash history singleton instance.
// import history from 'history/hash';

// Get the current location.
let location = history.location;

// Listen for changes to the current location.
let unlisten = history.listen(({ location, action }) => {
  console.log(action, location.pathname, location.state);
});

// Use push to push a new entry onto the history stack.
history.push("/home", { some: "state" });

// Use replace to replace the current entry in the stack.
history.replace("/logged-in");

// Use back/forward to navigate one entry back or forward.
history.back();

// To stop listening, call the function returned from listen().
unlisten();