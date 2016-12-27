import _ from "lodash";
import { ACTIVATE_POSITIVE, ACTIVATE_NEGATIVE } from "../actions/activeTagList";

export default function activeTagList(state = {}, action) {
  let newState;
  switch(action.type) {
    case ACTIVATE_POSITIVE:
      newState = _.cloneDeep(state);
      newState[action.uuid] = {
        name: action.name,
        charge: 1,
        uuid: action.uuid
      };
      return newState;
    case ACTIVATE_NEGATIVE:
      newState = _.cloneDeep(state);
      newState[action.uuid] = {
        name: action.name,
        charge: -1,
        uuid: action.uuid
      };
      return newState;
    default:
      return state
  }
}
