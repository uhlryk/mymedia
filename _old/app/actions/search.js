export const ADD_SEARCH_ATTRIBUTE = "search.add_search_attribute";

export function addSearch(attributeId, value) {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_SEARCH_ATTRIBUTE,
      payload: {
        id: attributeId,
        value
      }
    });
  };
}
