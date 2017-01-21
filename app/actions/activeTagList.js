export const REMOVE_ACTIVE_TAG = "active_tag_list.remove";
export const ADD_ACTIVE_TAG = "active_tag_list.add";

export function removeActiveTag(name) {
  return (dispatch, getState) => {
    dispatch({
      type: REMOVE_ACTIVE_TAG,
      name
    });
  }
}

export function addActiveTag(name) {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_ACTIVE_TAG,
      name
    });
  }
}


