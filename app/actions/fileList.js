import { save } from "./index";
import { showNotification } from "./notification";
export const ADD_NEW_BULK_FILES = "file_list.bulk_new_add";
export const LOAD_SAVED_FILES = "file_list.bulk_project_set";
export const UPDATE_RESOURCE = "resources.update_resource";
export const ADD_RESOURCE = "resources.add_resource";

export function addFiles(list) {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_NEW_BULK_FILES,
      payload: {
        list
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
  return async (dispatch, getState) => {
    dispatch({
      type: ADD_RESOURCE,
      payload: {
        ...data,
      }
    });
    dispatch(await save());
    dispatch(showNotification("Resource created with great success", "great success"));

  };
}

export function updateResource(hashPath, data) {
  return async (dispatch, getState) => {
    dispatch({
      type: UPDATE_RESOURCE,
      payload: {
        ...data,
        hashPath
      }
    });
    dispatch(await save());
    dispatch(showNotification("Resource updated", "success"));
  };
}
