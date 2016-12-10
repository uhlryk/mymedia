import _ from "lodash";
import uuid from "uuid-v4";
import { ADD_NEW_LABEL, SET_BULK_LABELS } from "../actions/labelList";

export default function labelList(state = {}, action) {
  let newState;
  switch(action.type) {
    case SET_BULK_LABELS:
      newState = {};
      Object.keys(action.list).forEach(hashPath => {
        let label = _.cloneDeep(action.list[hashPath]);
        newState[hashPath] = label;
      });
      return newState;
    case ADD_NEW_LABEL:
      newState = _.cloneDeep(state);
      let uuidKey = uuid();
      newState[uuidKey] = {
        name: action.name,
        parent: action.parent,
        uuid: uuidKey
      };
      return newState;
    default:
      return state
  }
}
