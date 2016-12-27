export const ACTIVATE_POSITIVE = "active_tag_list.activate_positive";
export const ACTIVATE_NEGATIVE = "active_tag_list.activate_negative";

export function activatePositiveTag(tagHash) {
  return (dispatch, getState) => {
    dispatch({
      type: ACTIVATE_POSITIVE,
      uuid: tagHash
    });
  }
}

export function activateNegativeTag(tagHash) {
  return (dispatch, getState) => {
    dispatch({
      type: ACTIVATE_NEGATIVE,
      uuid: tagHash
    });
  }
}
