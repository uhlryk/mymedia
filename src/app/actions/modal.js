import * as MODAL_TYPE from "./../constants/modalType"
export const CLOSE_MODAL = "modal.close";
export const SHOW_MODAL_INFO = "modal.show.info";

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
