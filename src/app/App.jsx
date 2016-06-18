import React from "react";
import { Provider } from "react-redux";
import { syncHistoryWithStore, routerMiddleware, push } from "react-router-redux";
import createStore from "./stores/index.js";
import reducer from "./reducers/index.js";
import { Router, Route, createMemoryHistory } from "react-router";
import AppRouter from "./routes/AppRouter.jsx";

class App extends React.Component {
  static propsTypes = {
    history: React.PropTypes.object,
    config: React.PropTypes.object,
    initialState: React.PropTypes.object
  };
  static childContextTypes = {
    config: React.PropTypes.object
  };
  constructor(props) {
    super(props);
    this.store = createStore(reducer, this.props.initialState, [routerMiddleware(this.props.history)]);
    this.syncHistory= syncHistoryWithStore(this.props.history, this.store);
  }
  getChildContext() {
    return {
      config: this.props.config
    }
  }
  render() {
    return (
      <Provider store={this.store}>
        <AppRouter history={this.syncHistory} />
      </Provider>
    );
  }
}
export default App;
