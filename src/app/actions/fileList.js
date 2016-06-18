export const ADD_NEW_BULK_FILES = "file_list.bulk_new_add";

export function addNewFiles(list) {
  return {
    type: ADD_NEW_BULK_FILES,
    list
  }
}
