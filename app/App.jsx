import "babel-polyfill";
import React from "react";
import { Provider } from "react-redux";
import { routerMiddleware } from "react-router-redux";
import reducer from "./reducers/index.js";
import { createStore, applyMiddleware, compose } from "redux";
import AppRouter from "./routes/AppRouter.jsx";
import { devToolsEnhancer } from "redux-devtools-extension";
import RegisterExtensions from "./features/RegisterExtensions.jsx";
import StoreExtensionManager from "./features/StoreExtensionManager";
import * as extensions from "./extensions";
import thunk from "./middlewares/thunk";

class App extends React.Component {
  static propsTypes = {
    history: React.PropTypes.object,
    config: React.PropTypes.object,
    initialState: React.PropTypes.object
  };
  constructor(props) {
    super(props);
    this.extensionManager = new StoreExtensionManager(this.store);
    this.store = createStore(
      reducer,
      this.props.initialState,
      compose(
        applyMiddleware(thunk.createThunk(console, this.extensionManager), routerMiddleware(this.props.history)),
        this.extensionManager.createStoreEnhancer(),
        devToolsEnhancer()
      )
    );
    this.extensionManager.setStore(this.store);
  }
  render() {
    return (
      <Provider store={this.store}>
        <RegisterExtensions list={extensions} extensionManager={this.extensionManager}>
          <AppRouter history={ this.props.history } />
        </RegisterExtensions>
      </Provider>
    );
  }
}
export default App;
