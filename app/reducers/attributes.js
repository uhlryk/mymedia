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
      // const {type, ...attributeData} = action;
      /**
       * attributeData:
       * - extensionName name of extension attribute
       * - displayName what should be shown
       * - disableViewDisplayName - if true displayName will not be shown in View
       * - viewClassName
       * - alwaysVisible it will be visible on top of resource
       * - disableEdit it will not be visible in edit mode
       * - editClassName
       * - disableSort if true this attribute will not be sortable
       */
      newState = _.cloneDeep(state);
      let id;
      if (action.payload.id) {
        id = action.payload.id
      } else {
        id = uuid();
      }
      newState[id] = {
        id,
        ...action.payload
      };
      return newState;
    default:
      return state
  }
}
