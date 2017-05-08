import { ADD_SORT_ATTRIBUTE, REMOVE_SORT_ATTRIBUTE } from "../actions/sort";

export default function sort(state = [], action) {
  switch(action.type) {
    case ADD_SORT_ATTRIBUTE:
      return state.slice().concat(action.payload);
    case REMOVE_SORT_ATTRIBUTE:
      return state.filter(sortObj => sortObj.id !== action.payload.id);
    default:
      return state
  }
}
