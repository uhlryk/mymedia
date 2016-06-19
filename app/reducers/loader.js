import { SHOW_LOADER, CLOSE_LOADER } from "../actions/loader";

export default function notification(state = false, action) {
  switch(action.type) {
    case SHOW_LOADER:
      return {
        message: action.message
      };
    case CLOSE_LOADER:
      return false;
    default:
      return state
  }
}
