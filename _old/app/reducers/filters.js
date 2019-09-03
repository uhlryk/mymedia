import _ from "lodash";
import { CHANGE_RESOURCE_PATH } from "../actions/filters";

export default function filters(state = {}, action) {
  let newState;
  switch(action.type) {
    case CHANGE_RESOURCE_PATH:
      newState = _.cloneDeep(state);
      newState.pathFilter = action.payload.resourcePath;
      return newState;
    default:
      return state
  }
}
