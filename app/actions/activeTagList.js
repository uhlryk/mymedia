export const REMOVE_ACTIVE_TAG = "active_tag_list.remove";
export const ADD_POSITIVE_ACTIVE_TAG = "active_tag_list.add_positive";
export const ADD_NEGATIVE_ACTIVE_TAG = "active_tag_list.add_negative";

export function removeActiveTag(tagHash) {
  return (dispatch, getState) => {
    dispatch({
      type: REMOVE_ACTIVE_TAG,
      uuid: tagHash
    });
  }
}

export function addPositiveActiveTag(tagHash) {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_POSITIVE_ACTIVE_TAG,
      uuid: tagHash
    });
  }
}

export function addNegativeActiveTag(tagHash) {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_NEGATIVE_ACTIVE_TAG,
      uuid: tagHash
    });
  }
}
