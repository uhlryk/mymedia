import _ from "lodash";
import { ADD_NEW_BULK_FILES } from "../actions/fileList";

export default function fileList(state = {}, action) {
  switch(action.type) {
    case ADD_NEW_BULK_FILES:
      let cloneState = _.cloneDeep(state);
      action.list.forEach(file => {
        cloneState[file.path] = file;
      });
      return cloneState;
    default:
      return state
  }
}
