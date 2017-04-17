import { save } from "./index";
export const ADD_NEW_BULK_FILES = "file_list.bulk_new_add";
export const LOAD_SAVED_FILES = "file_list.bulk_project_set";
export const UPDATE_FILE = "file_list.update_file";

export function addFiles(list, markAsNew = false) {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_NEW_BULK_FILES,
      payload: {
        list,
        markAsNew
      }
    });
  };
}

export function loadFiles(list) {
  return (dispatch, getState) => {
    dispatch({
      type: LOAD_SAVED_FILES,
      payload: {
        list
      }

    });
  };
}

export function updateFile(hashPath, data) {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_FILE,
      payload: {
        data,
        hashPath
      }
    });
    dispatch(save());
  };
}
