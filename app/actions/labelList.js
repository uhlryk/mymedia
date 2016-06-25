import { save } from "./index";
export const ADD_NEW_LABEL = "label_list.new_add";

export function addLabel(data) {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_NEW_LABEL,
      name: data.name
    });
    dispatch(save());
  }
}
