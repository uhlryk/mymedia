import { ADD_SEARCH_ATTRIBUTE } from "../actions/search";

export default function search(state = [], action) {
  switch(action.type) {
    case ADD_SEARCH_ATTRIBUTE:
      return state.slice().concat(action.payload);
    default:
      return state
  }
}
