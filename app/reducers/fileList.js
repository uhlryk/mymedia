import _ from "lodash";
import md5 from "md5";
import { ADD_NEW_BULK_FILES, SET_PROJECT_BULK_FILES, UPDATE_FILE } from "../actions/fileList";

export default function fileList(state = {}, action) {
  let newState;
  switch(action.type) {
    case SET_PROJECT_BULK_FILES:
      newState = {};
      Object.keys(action.list).forEach(hashPath => {
        let file = _.cloneDeep(action.list[hashPath]);
        file.exist = false;
        newState[hashPath] = file;
      });
      return newState;
    case ADD_NEW_BULK_FILES:
      newState = _.cloneDeep(state);
      action.list.forEach(file => {
        let hashPath = md5(file.path);
        let projectFile = newState[hashPath];
        if(projectFile) {
          projectFile.exist = true;
        } else {
          file.exist = true;
          file.hashPath = hashPath;
          newState[hashPath] = file;
        }
      });
      return newState;
    case UPDATE_FILE:
      console.log("C1");
      let newState = _.cloneDeep(state);
      let originalFile = newState[action.hashPath];
      Object.assign(originalFile, action.data);
      console.log(originalFile);
      console.log(action.data);
      console.log(newState);
      return newState;
    default:
      return state
  }
}
