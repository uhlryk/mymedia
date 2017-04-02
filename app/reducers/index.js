import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux"
import project from "./project";
import notification from "./notification";
import loader from "./loader";
import fileList from "./fileList";
import tagList from "./tagList";
import attributes from "./attributes";
import activeTagList from "./activeTagList";


export default combineReducers({
  project,
  fileList,
  tagList,
  attributes,
  activeTagList,
  notification,
  loader,
  routing: routerReducer
});

