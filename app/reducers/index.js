import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux"
import project from "./project";
import projects from "./projects";
import notification from "./notification";
import loader from "./loader";
import filters from "./filters";
import fileList from "./fileList";
import attributes from "./attributes";


export default combineReducers({
  project,
  projects,
  fileList,
  filters,
  attributes,
  notification,
  loader,
  routing: routerReducer
});

