import _ from "lodash";
import md5 from "md5";
import { ADD_NEW_BULK_FILES, SET_PROJECT_BULK_FILES } from "../actions/fileList";

export default function fileList(state = {}, action) {
  switch(action.type) {
    case SET_PROJECT_BULK_FILES:
      let newState = {};
      Object.keys(action.list).forEach(hashPath => {
        let file = _.cloneDeep(action.list[hashPath]);
        file.exist = false;
        newState[hashPath] = file;
      });
      return newState;
    case ADD_NEW_BULK_FILES:
      let cloneState = _.cloneDeep(state);
      action.list.forEach(file => {
        let hashPath = md5(file.path);
        let projectFile = cloneState[hashPath];
        if(projectFile) {
          projectFile.exist = true;
        } else {
          file.exist = true;
          file.hashPath = hashPath;
          cloneState[hashPath] = file;
        }
      });
      return cloneState;
    default:
      return state
  }
}
