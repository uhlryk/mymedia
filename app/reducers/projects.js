import _ from "lodash";
import { LOAD_PROJECTS } from "../actions/projects";

export default function projects(state = [], action) {
  switch(action.type) {
    case LOAD_PROJECTS:
      return action.payload.list ? _.cloneDeep(action.payload.list) : [];
    default:
      return state
  }
}
