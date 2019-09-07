export const ADD_SORT_ATTRIBUTE = "sort.add_sort_attribute";
export const REMOVE_SORT_ATTRIBUTE = "sort.remove_sort_attribute";
export const CHANGE_ORDER_SORT_ATTRIBUTE = "sort.change_order_sort_attribute";

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

export function removeSort(attributeId) {
  return (dispatch, getState) => {
    dispatch({
      type: REMOVE_SORT_ATTRIBUTE,
      payload: {
        id: attributeId
      }
    });
  };
}

export function changeOrderSort(attributeId) {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_ORDER_SORT_ATTRIBUTE,
      payload: {
        id: attributeId
      }
    });
  };
}