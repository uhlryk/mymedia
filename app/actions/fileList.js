export const ADD_NEW_BULK_FILES = "file_list.bulk_new_add";
export const SET_PROJECT_BULK_FILES = "file_list.bulk_project_set";

export function addNewFiles(list) {
  return {
    type: ADD_NEW_BULK_FILES,
    list
  }
}

export function setProjectFiles(list) {
  return {
    type: SET_PROJECT_BULK_FILES,
    list
  }
}
