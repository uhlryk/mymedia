import _ from "lodash";
import uuid from "uuid-v4";
import { ADD_NEW_ELEMENT } from "../actions/formElement";

export default function formElement(state = {}, action) {
  let newState;
  switch(action.type) {
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
