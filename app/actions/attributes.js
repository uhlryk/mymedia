import { save } from "./index";
export const ADD_NEW_ATTRIBUTE = "attribute.new_add";
export const LOAD_SAVED_ATTRIBUTES = "attribute.load_element";

export function addNewAttribute(extensionName, settings) {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_NEW_ATTRIBUTE,
      payload: {
        extensionName: extensionName,
        ...settings
      }
    });
    dispatch(save());
  };
}

export function addNewAttributeWithId(id, extensionName, settings) {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_NEW_ATTRIBUTE,
      payload: {
        id,
        extensionName: extensionName,
        ...settings
      }
    });
    dispatch(save());
  };
}

export function loadAttributes(list) {
  return (dispatch, getState) => {
    dispatch({
      type: LOAD_SAVED_ATTRIBUTES,
      payload: {
        list
      }
    });
  };
}

