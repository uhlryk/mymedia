import { INIT_PROJECT, CLEAR_PROJECT } from "../actions/project";

export default function project(state = false, action) {
  switch(action.type) {
    case INIT_PROJECT:
      return {
        name: "",
        path: action.path,
        existingFiles: [],
        newFiles: []
      };
    case CLEAR_PROJECT:
      return false;
    default:
      return state
  }
}