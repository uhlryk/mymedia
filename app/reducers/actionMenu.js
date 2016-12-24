import { CLOSE_ALL_MENU, OPEN_MENU } from "../actions/actionMenu";

export default function actionMenu(state = { menu: [] }, action) {
  switch(action.type) {
    case CLOSE_ALL_MENU:
      return {
        menu:[]
      };
    case OPEN_MENU:
      return {
        menu: action.menu
      };
    default:
      return state
  }
}
