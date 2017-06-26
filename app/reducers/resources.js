import _ from "lodash";
import uuid from "uuid-v4";
import { ADD_NEW_BULK_FILES, LOAD_RESOURCES, UPDATE_RESOURCE, ADD_RESOURCE } from "../actions/resources";

// const DEFAULT_MEDIA_FILE = {
//   tags: []
// }
export default function resources(state = {}, action) {
  let newState;
  switch(action.type) {
    case LOAD_RESOURCES:
      newState = {};
      Object.keys(action.payload.list).forEach(id => {
        let resource = _.cloneDeep(action.payload.list[id]);
        newState[id] = resource;
      });
      return newState;
    // case ADD_NEW_BULK_FILES:
    //   newState = _.cloneDeep(state);
    //   action.payload.list.forEach(file => {
    //     const id = uuid();
    //     let fileFromProject = newState[id];
    //     if(fileFromProject) {
    //       fileFromProject.isPresent = true;
    //     } else {
    //       file.isPresent = true;
    //       file.isNew = action.markAsNew;
    //       file.isChanged = false;
    //       file.id = id;
    //       newState[id] = Object.assign({}, file, DEFAULT_MEDIA_FILE);
    //     }
    //   });
    //   return newState;
    case ADD_RESOURCE:
      newState = _.cloneDeep(state);
      let id = uuid();
      newState[id] = Object.assign({}, action.payload, { id });
      return newState;
    case UPDATE_RESOURCE:
      newState = _.cloneDeep(state);
      let originalFile = newState[action.payload.id];
      Object.assign(originalFile, action.payload, {isChanged: true, isNew: false});
      return newState;
    default:
      return state
  }
}
