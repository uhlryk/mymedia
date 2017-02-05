import { save } from "./index";
export const ADD_NEW_ELEMENT = "form_element.new_add";
export const LOAD_SAVED_ELEMENTS = "form_element.load_element";

export function addNewElement(name, type, options) {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_NEW_ELEMENT,
      name,
      formType: type
    });
    dispatch(save());
  };
}

export function loadElements(list) {
  return (dispatch, getState) => {
    dispatch({
      type: LOAD_SAVED_ELEMENTS,
      list
    });
  };
}

