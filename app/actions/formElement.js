export const ADD_NEW_ELEMENT = "form_element.new_add";

export function addNewElement(name, type, options) {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_NEW_ELEMENT,
      name,
      formType: type
    });
  };
}

