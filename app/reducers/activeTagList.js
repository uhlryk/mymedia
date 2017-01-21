import _ from "lodash";
import { ADD_ACTIVE_TAG, REMOVE_ACTIVE_TAG } from "../actions/activeTagList";

export default function activeTagList(state = [], action) {
  switch(action.type) {
    case ADD_ACTIVE_TAG:
      let newState = state.slice();
      newState.splice(0,0, action.name);
      return [...new Set(newState)];
    case REMOVE_ACTIVE_TAG:
      return state.filter(tagName => tagName !== action.name);
    default:
      return state
  }
}
