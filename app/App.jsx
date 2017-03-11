import React from "react";
import { Provider } from "react-redux";
import { syncHistoryWithStore, routerMiddleware, push } from "react-router-redux";
import reducer from "./reducers/index.js";
import { createStore, applyMiddleware, compose } from "redux";
import AppRouter from "./routes/AppRouter.jsx";
import thunk from "redux-thunk";
import { devToolsEnhancer } from "redux-devtools-extension";


class App extends React.Component {
  static propsTypes = {
    history: React.PropTypes.object,
    config: React.PropTypes.object,
    initialState: React.PropTypes.object
  };
  constructor(props) {
    super(props);
    this.store = createStore(
      reducer,
      this.props.initialState,
      compose(
        applyMiddleware(thunk, routerMiddleware(this.props.history)),
        devToolsEnhancer()
      )
    );
    this.syncHistory= syncHistoryWithStore(this.props.history, this.store);
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
