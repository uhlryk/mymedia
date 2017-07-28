import React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import { createBrowserHistory } from "history";
import App from "./App";
import style from "./sass/style.scss";  // eslint-disable-line
const history = createBrowserHistory("project/menu");

const initialState = window.__INITIAL_STATE__;
const config = window.__CONFIG__;

render(
  <AppContainer>
    <App
      config={config}
      history={history}
      initialState={initialState}
    />
  </AppContainer>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept("./App", () => {
    const App = require("./App"); // eslint-disable-line
    render(
      <AppContainer>
        <App
          config={config}
          history={history}
          initialState={initialState}
        />
      </AppContainer>,
      document.getElementById("root")
    );
  });
}
