import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux"
import project from "./project";
import modal from "./modal";
import notification from "./notification";
import loader from "./loader";
import fileList from "./fileList";
import labelList from "./labelList";


export default combineReducers({
  project,
  fileList,
  labelList,
  modal,
  notification,
  loader,
  routing: routerReducer
});

