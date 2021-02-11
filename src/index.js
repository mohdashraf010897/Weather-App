import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./styles/main.scss";

import { store } from "./redux/store";
import ErrorBoundary from "./components/common/ErrorBoundary";
import NotFound from "./pages/NotFound";
import Landing from "./pages/index";
//being only one page, Routing is deliberately being ignored
//and the single page component is directly fed to React engine

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/404" exact component={NotFound} />
            <Redirect to="/404" />
          </Switch>
        </Router>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
