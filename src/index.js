import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "./app/store/configureStore";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.min.css";
import "react-calendar/dist/Calendar.css";
import App from "./app/layout/App";
import ScrollToTop from "./app/layout/ScrollToTop";
import { loadEvents } from "./features/events/eventActions";

const store = configureStore();

store.dispatch(loadEvents());

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ScrollToTop />
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
