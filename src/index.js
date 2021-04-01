import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "./app/store/configureStore";
import "semantic-ui-css/semantic.min.css";
import App from "./app/layout/App";
import ScrollToTop from "./app/layout/ScrollToTop";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ScrollToTop />
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
