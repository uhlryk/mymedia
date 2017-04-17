import _ from "lodash";
import md5 from "md5";
import { ADD_NEW_BULK_FILES, LOAD_SAVED_FILES, UPDATE_FILE } from "../actions/fileList";

const DEFAULT_MEDIA_FILE = {
  tags: []
}
export default function fileList(state = {}, action) {
  let newState;
  switch(action.type) {
    case LOAD_SAVED_FILES:
      newState = {};
      Object.keys(action.payload.list).forEach(hashPath => {
        let file = _.cloneDeep(action.payload.list[hashPath]);
        file.isPresent = false;
        file.isNew = false;
        newState[hashPath] = file;
      });
      return newState;
    case ADD_NEW_BULK_FILES:
      newState = _.cloneDeep(state);
      action.payload.list.forEach(file => {
        let hashPath = md5(file.path);
        let fileFromProject = newState[hashPath];
        if(fileFromProject) {
          fileFromProject.isPresent = true;
        } else {
          file.isPresent = true;
          file.isNew = action.markAsNew;
          file.isChanged = false;
          file.hashPath = hashPath;
          newState[hashPath] = Object.assign({}, file, DEFAULT_MEDIA_FILE);
        }
      });
      return newState;
    case UPDATE_FILE:
      let newState = _.cloneDeep(state);
      let originalFile = newState[action.payload.hashPath];
      Object.assign(originalFile, action.payload.data, {isChanged: true, isNew: false});
      return newState;
    default:
      return state
  }
}
