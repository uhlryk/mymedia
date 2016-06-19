import _ from "lodash";
import { ADD_NEW_BULK_FILES, SET_PROJECT_BULK_FILES } from "../actions/fileList";

export default function fileList(state = {}, action) {
  switch(action.type) {
    case SET_PROJECT_BULK_FILES:
      let newState = {};
      Object.keys(action.list).forEach(filePath => {
        let file = _.cloneDeep(action.list[filePath]);
        file.exist = false;
        newState[file.path] = file;
      });
      return newState;
    case ADD_NEW_BULK_FILES:
      let cloneState = _.cloneDeep(state);
      action.list.forEach(file => {
        let projectFile = cloneState[file.path];
        if(projectFile) {
          projectFile.exist = true;
        } else {
          file.exist = true;
          cloneState[file.path] = file;
        }
      });
      return cloneState;
    default:
      return state
  }
}
