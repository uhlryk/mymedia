import { CLOSE_MODAL, SHOW_MODAL_INFO, SHOW_MODAL_YES_NO } from "../actions/modal";
import * as MODAL_TYPE from "./../constants/modalType"

export default function modal(state = false, action) {
  switch(action.type) {
    case SHOW_MODAL_INFO:
      return {
        show: true,
        modalType: MODAL_TYPE.INFO,
        title: action.title,
        message: action.message,
        label: action.label,
        onClick: action.onClick

      };
    case SHOW_MODAL_YES_NO:
      return {
        show: true,
        modalType: MODAL_TYPE.YES_NO,
        title: action.title,
        message: action.message,
        labelYes: action.labelYes,
        labelNo: action.labelNo,
        onClickYes: action.onClickYes,
        onClickNo: action.onClickNo

      };
    case CLOSE_MODAL:
      return {
        show: false
      };
    default:
      return state
  }
}
