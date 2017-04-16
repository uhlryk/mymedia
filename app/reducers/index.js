import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux"
import project from "./project";
import notification from "./notification";
import loader from "./loader";
import fileList from "./fileList";
import attributes from "./attributes";


export default combineReducers({
  project,
  fileList,
  attributes,
  notification,
  loader,
  routing: routerReducer
});

