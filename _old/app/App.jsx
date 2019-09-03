import "babel-polyfill";
import React from "react";
import { Provider, Route } from "react-redux";
import { routerMiddleware, ConnectedRouter, push } from "react-router-redux";
import reducer from "./reducers/index.js";
import { createStore, applyMiddleware, compose } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import RegisterExtensions from "./features/RegisterExtensions.renderer.jsx";
import StoreExtensionManager from "./features/StoreExtensionManager";
import * as extensions from "./extensions";
import thunk from "./middlewares/thunk";
import Notification from "./components/Notification.jsx";
import Loader from "./components/Loader.jsx";
import RegisterModals from "./features/modals/RegisterModals.jsx"
import AppRouter from "./AppRouter.jsx";

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

  componentDidMount() {

  }

  render() {
    return (
      <Provider store={this.store}>
        <RegisterExtensions list={extensions} extensionManager={this.extensionManager}>
          <ConnectedRouter history={this.props.history} >
            <RegisterModals>
              <AppRouter />
              <Loader />
              <Notification />
            </RegisterModals>
          </ConnectedRouter>
        </RegisterExtensions>
      </Provider>
    );
  }
}
export default App;
