import { ADD_SORT_ATTRIBUTE } from "../actions/sort";

export default function project(state = [], action) {
  let newState;
  switch(action.type) {
    case ADD_SORT_ATTRIBUTE:
      newState = [];
      newState.push(action.payload);
      return newState;
    default:
      return state
  }
}
