import _ from "lodash";
import uuid from "uuid-v4";
import { ADD_NEW_ATTRIBUTE, LOAD_SAVED_ATTRIBUTES } from "../actions/attributes";

export default function attributes(state = {}, action) {
  let newState;
  switch(action.type) {
    case LOAD_SAVED_ATTRIBUTES:
      newState = {};
      Object.keys(action.payload.list).forEach(id => {
        newState[id] = _.cloneDeep(action.payload.list[id]);
      });
      return newState;
    case ADD_NEW_ATTRIBUTE:
      newState = _.cloneDeep(state);
      let id;
      if (action.payload.id) {
        id = action.payload.id
      } else {
        id = uuid();
      }
      newState[id] = {
        id,
        ...Object.assign({ edit: {}, create: {}, view: {}, sort: {}}, action.payload)
      };
      return newState;
    default:
      return state
  }
}
