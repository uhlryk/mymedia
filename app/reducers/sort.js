import { ADD_SORT_ATTRIBUTE, REMOVE_SORT_ATTRIBUTE, CHANGE_ORDER_SORT_ATTRIBUTE } from "../actions/sort";

export default function sort(state = [], action) {
  switch(action.type) {
    case ADD_SORT_ATTRIBUTE:
      return state.slice().concat(action.payload);
    case REMOVE_SORT_ATTRIBUTE:
      return state.filter(sortObj => sortObj.id !== action.payload.id);
    case CHANGE_ORDER_SORT_ATTRIBUTE:
      return state.map(sortObj => {
        if(sortObj.id !== action.payload.id) {
          return Object.assign({}, sortObj);
        } else {
          return Object.assign({}, sortObj, {
            order: sortObj.order === "ASC" ? "DESC" : "ASC"
          });
        }
      });
    default:
      return state
  }
}
