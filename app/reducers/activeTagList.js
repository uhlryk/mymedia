import _ from "lodash";
import { ADD_POSITIVE_ACTIVE_TAG, ADD_NEGATIVE_ACTIVE_TAG, REMOVE_ACTIVE_TAG } from "../actions/activeTagList";

export default function activeTagList(state = {}, action) {
  let newState;
  switch(action.type) {
    case ADD_POSITIVE_ACTIVE_TAG:
      newState = _.cloneDeep(state);
      newState[action.uuid] = {
        name: action.name,
        charge: true,
        uuid: action.uuid
      };
      return newState;
    case ADD_NEGATIVE_ACTIVE_TAG:
      newState = _.cloneDeep(state);
      newState[action.uuid] = {
        name: action.name,
        charge: false,
        uuid: action.uuid
      };
      return newState;
    case REMOVE_ACTIVE_TAG:
      newState = _.cloneDeep(state);
      delete newState[action.uuid];
      return newState;
    default:
      return state
  }
}
