export const ADD_SORT_ATTRIBUTE = "sort.add_sort_attribute";

export function addSort(attributeId, order = "ASC") {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_SORT_ATTRIBUTE,
      payload: {
        id: attributeId,
        order
      }
    });
  };
}
