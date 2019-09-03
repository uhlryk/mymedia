import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux"
import project from "./project";
import projects from "./projects";
import notification from "./notification";
import loader from "./loader";
import filters from "./filters";
import resources from "./resources";
import attributes from "./attributes";
import sort from "./sort";
import search from "./search";


export default combineReducers({
  project,
  projects,
  resources,
  filters,
  attributes,
  notification,
  loader,
  sort,
  search,
  routing: routerReducer
});

