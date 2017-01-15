import { save } from "./index";
export const ADD_NEW_TAG = "tag_list.new_add";
export const SET_BULK_TAGS = "tag_list.bulk_set";

export function addTag(name, uuid) {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_NEW_TAG,
      name,
      uuid
    });
    dispatch(save());
  }
}

export function setTags(list) {
  return {
    type: SET_BULK_TAGS,
    list
  }
}
