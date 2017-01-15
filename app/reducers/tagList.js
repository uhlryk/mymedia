import _ from "lodash";
import { ADD_NEW_TAG, SET_BULK_TAGS } from "../actions/tagList";

export default function tagList(state = {}, action) {
  let newState;
  switch(action.type) {
    case SET_BULK_TAGS:
      newState = {};
      Object.keys(action.list).forEach(hashPath => {
        let tag = _.cloneDeep(action.list[hashPath]);
        newState[hashPath] = tag;
      });
      return newState;
    case ADD_NEW_TAG:
      newState = _.cloneDeep(state);
      newState[action.uuid] = {
        name: action.name,
        uuid: action.uuid
      };
      return newState;
    default:
      return state
  }
}
