import _ from "lodash";
import uuid from "uuid-v4";
import { ADD_NEW_ELEMENT, LOAD_SAVED_ELEMENTS } from "../actions/formElement";

export default function formElement(state = {}, action) {
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
      const id = uuid();
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
