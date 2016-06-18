import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux"
import project from "./project";
import modal from "./modal";
import notification from "./notification";


export default combineReducers({
  project,
  modal,
  notification,
  routing: routerReducer
});

