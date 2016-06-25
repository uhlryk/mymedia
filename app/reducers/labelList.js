import _ from "lodash";
import uuid from "uuid-v4";
import { ADD_NEW_LABEL } from "../actions/labelList";

export default function labelList(state = {}, action) {
  let newState;
  switch(action.type) {
    case ADD_NEW_LABEL:
      newState = _.cloneDeep(state);
      let uuidKey = uuid();
      newState[uuidKey] = {
        name: action.name,
        uuid: uuidKey
      };
      return newState;
    default:
      return state
  }
}
