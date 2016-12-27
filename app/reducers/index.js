import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux"
import project from "./project";
import modal from "./modal";
import notification from "./notification";
import loader from "./loader";
import fileList from "./fileList";
import tagList from "./tagList";
import activeTagList from "./activeTagList";


export default combineReducers({
  project,
  fileList,
  tagList,
  activeTagList,
  modal,
  notification,
  loader,
  routing: routerReducer
});

