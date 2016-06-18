import { CLOSE_NOTIFICATION, SHOW_NOTIFICATION } from "../actions/notification";

export default function notification(state = false, action) {
  switch(action.type) {
    case SHOW_NOTIFICATION:
      return {
        message: action.message,
        title: action.title,
        level: action.level
      };
    case CLOSE_NOTIFICATION:
      return false;
    default:
      return state
  }
}
