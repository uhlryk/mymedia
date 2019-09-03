import { CLOSE_NOTIFICATION, SHOW_NOTIFICATION } from "../actions/notification";

export default function notification(state = false, action) {
  switch(action.type) {
    case SHOW_NOTIFICATION:
      return {
        message: action.payload.message,
        title: action.payload.title,
        level: action.payload.level
      };
    case CLOSE_NOTIFICATION:
      return false;
    default:
      return state
  }
}
