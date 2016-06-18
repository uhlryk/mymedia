import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import style from "./sass/style.scss";
import createStore from "./stores/index.js";
import reducer from "./reducers/index.js";
import App from "./components/App.jsx";
import { Router, Route, createMemoryHistory } from "react-router";
import SelectDirectory from "./components/pages/SelectDirectory.jsx";
import Collection from "./components/pages/Collection.jsx";

const history = createMemoryHistory("selectDirectory");

const store = createStore(reducer);

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="collection" component={Collection}/>
        <Route path="selectDirectory" component={SelectDirectory}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById("root")
);
