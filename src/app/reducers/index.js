import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux"
import project from "./project";
import modal from "./modal";


export default combineReducers({
  project,
  modal,
  routing: routerReducer
});

