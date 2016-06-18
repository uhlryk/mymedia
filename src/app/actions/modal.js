import * as MODAL_TYPE from "./../constants/modalType"
export const CLOSE_MODAL = "modal.close";
export const SHOW_MODAL_INFO = "modal.show.info";
export const SHOW_MODAL_YES_NO = "modal.show.yes_no";

export function closeModal() {
  return {
    type: CLOSE_MODAL
  }
}

export function showInfoModal(title, message, label, onClick) {
  return {
    type: SHOW_MODAL_INFO,
    title,
    message,
    label,
    onClick
  }
}

export function showErrorModal(message, onClick) {
  return {
    type: SHOW_MODAL_INFO,
    title: "Error",
    message,
    label: "close",
    onClick
  }
}

export function showYesNoModal(title, message, labelYes, labelNo, onClickYes, onClickNo) {
  return {
    type: SHOW_MODAL_YES_NO,
    title,
    message,
    labelYes,
    labelNo,
    onClickYes,
    onClickNo
  }
}
