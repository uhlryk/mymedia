import _ from "lodash";
import uuid from "uuid-v4";
import { ADD_NEW_ATTRIBUTE, LOAD_SAVED_ATTRIBUTES } from "../actions/attributes";

export default function attributes(state = {}, action) {
  let newState;
  switch(action.type) {
    case LOAD_SAVED_ATTRIBUTES:
      newState = {};
      Object.keys(action.list).forEach(id => {
        newState[id] = _.cloneDeep(action.list[id]);
      });
      return newState;
    case ADD_NEW_ATTRIBUTE:
      const {type, ...attributeData} = action;
      /**
       * attributeData:
       * - extensionName name of extension attribute
       * - displayName what should be shown
       * - viewClassName
       * - alwaysVisible it will be visible on top of resource
       * - disableEdit it will not be visible in edit mode
       *
       */
      newState = _.cloneDeep(state);
      let id;
      if (action.id) {
        id = action.id
      } else {
        id = uuid();
      }
      newState[id] = {
        id,
        ...attributeData
      };
      return newState;
    default:
      return state
  }
}
