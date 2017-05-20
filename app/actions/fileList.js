import { save } from "./index";
export const ADD_NEW_BULK_FILES = "file_list.bulk_new_add";
export const LOAD_SAVED_FILES = "file_list.bulk_project_set";
export const UPDATE_RESOURCE = "resources.update_resource";
export const ADD_RESOURCE = "resources.add_resource";

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

export function addResource(data) {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_RESOURCE,
      payload: {
        ...data,
      }
    });
    dispatch(save());
  };
}

export function updateResource(hashPath, data) {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_RESOURCE,
      payload: {
        ...data,
        hashPath
      }
    });
    dispatch(save());
  };
}
