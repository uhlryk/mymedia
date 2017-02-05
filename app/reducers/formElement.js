import _ from "lodash";
import uuid from "uuid-v4";
import { ADD_NEW_ELEMENT, LOAD_SAVED_ELEMENTS } from "../actions/formElement";

export default function formElement(state = {}, action) {
  let newState;
  switch(action.type) {
    case LOAD_SAVED_ELEMENTS:
      newState = {};
      Object.keys(action.list).forEach(id => {
        let formElement = _.cloneDeep(action.list[id]);
        newState[id] = formElement;
      });
      return newState;
    case ADD_NEW_ELEMENT:
      newState = _.cloneDeep(state);
      const id = uuid();
      newState[id] = {
        id,
        name: action.name,
        type: action.formType
      };
      return newState;
    default:
      return state
  }
}
