import { updateTags } from "./tagList";
export const ADD_NEW_BULK_FILES = "file_list.bulk_new_add";
export const SET_PROJECT_BULK_FILES = "file_list.bulk_project_set";
export const UPDATE_FILE = "file_list.update_file";

export function addNewFiles(list) {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_NEW_BULK_FILES,
      list
    });
    dispatch(updateTags());
  };
}

export function setProjectFiles(list) {
  return (dispatch, getState) => {
    dispatch({
      type: SET_PROJECT_BULK_FILES,
      list
    });
    dispatch(updateTags());
  };
}

export function updateFile(hashPath, data) {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_FILE,
      data,
      hashPath
    });
    dispatch(updateTags());
  };
}
