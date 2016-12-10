import { save } from "./index";
export const ADD_NEW_LABEL = "label_list.new_add";
export const SET_BULK_LABELS = "label_list.bulk_label_set";

export function addLabel(data) {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_NEW_LABEL,
      name: data.name,
      parent: data.parent
    });
    dispatch(save());
  }
}

export function setLabels(list) {
  return {
    type: SET_BULK_LABELS,
    list
  }
}
