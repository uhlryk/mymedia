import { ADD_SEARCH_ATTRIBUTE } from "../actions/search";

export default function search(state = {}, action) {
  switch(action.type) {
    case ADD_SEARCH_ATTRIBUTE:
      return Object.assign({}, state, { [action.payload.id]: action.payload.value });
    default:
      return state
  }
}
