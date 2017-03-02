import React from "react";
import ReactDOM from "react-dom";
import style from "./sass/style.scss";
import { createMemoryHistory } from "react-router";
import App from "./App.jsx";

const initialState = window.__INITIAL_STATE__;
const config = window.__CONFIG__;

const history = createMemoryHistory("project/menu");

ReactDOM.render(
  <App
    config={config}
    history={history}
    initialState={initialState}
  />, document.getElementById("root"));
