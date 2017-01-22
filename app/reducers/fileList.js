import _ from "lodash";
import md5 from "md5";
import { ADD_NEW_BULK_FILES, SET_PROJECT_BULK_FILES, UPDATE_FILE } from "../actions/fileList";

const DEFAULT_MEDIA_FILE = {
  tags: []
}
export default function fileList(state = {}, action) {
  let newState;
  switch(action.type) {
    case SET_PROJECT_BULK_FILES:
      newState = {};
      Object.keys(action.list).forEach(hashPath => {
        let file = _.cloneDeep(action.list[hashPath]);
        file.isPresent = false;
        file.isNew = false;
        newState[hashPath] = file;
      });
      return newState;
    case ADD_NEW_BULK_FILES:
      newState = _.cloneDeep(state);
      action.list.forEach(file => {
        let hashPath = md5(file.path);
        let fileFromProject = newState[hashPath];
        if(fileFromProject) {
          fileFromProject.isPresent = true;
        } else {
          file.isPresent = true;
          file.isNew = true;
          file.hashPath = hashPath;
          newState[hashPath] = Object.assign({}, file, DEFAULT_MEDIA_FILE);
        }
      });
      return newState;
    case UPDATE_FILE:
      let newState = _.cloneDeep(state);
      let originalFile = newState[action.hashPath];
      Object.assign(originalFile, action.data);
      return newState;
    default:
      return state
  }
}
