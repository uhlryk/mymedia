import _ from "lodash";
import { UPDATE_TAGS } from "../actions/tagList";

export default function tagList(state = [], action) {
  switch(action.type) {
    case UPDATE_TAGS:
      return action.tags;
    default:
      return state
  }
}
