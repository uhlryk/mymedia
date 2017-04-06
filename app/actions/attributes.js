import { save } from "./index";
export const ADD_NEW_ELEMENT = "attribute.new_add";
export const LOAD_SAVED_ELEMENTS = "attribute.load_element";

export function addNewElement(extensionName, settings) {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_NEW_ELEMENT,
      extensionName: extensionName,
      settings
    });
    dispatch(save());
  };
}

export function addNewElementWithId(id, extensionName, settings) {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_NEW_ELEMENT,
      id,
      extensionName: extensionName,
      settings
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

