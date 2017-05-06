export const ADD_SORT_ATTRIBUTE = "sort.add_sort_attribute";

export function addSort(attributeId) {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_SORT_ATTRIBUTE,
      payload: {
        id: attributeId,
        order: "ASC"
      }
    });
  };
}
