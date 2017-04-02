import _ from "lodash";
import uuid from "uuid-v4";
import { ADD_NEW_ELEMENT, LOAD_SAVED_ELEMENTS } from "../actions/attributes";

export default function attributes(state = {}, action) {
  let newState;
  switch(action.type) {
    case LOAD_SAVED_ELEMENTS:
      newState = {};
      Object.keys(action.list).forEach(id => {
        newState[id] = _.cloneDeep(action.list[id]);
      });
      return newState;
    case ADD_NEW_ELEMENT:
      newState = _.cloneDeep(state);
      let id;
      if (action.id) {
        id = action.id
      } else {
        id = uuid();
      }
      newState[id] = {
        id,
        name: action.name,
        type: action.formType,
        settings: action.settings
      };
      return newState;
    default:
      return state
  }
}
