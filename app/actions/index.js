import path from "path";
import { PROJECT_FILE } from "../constants/general";
import fileSave from "../helpers/fileSave";
import { showErrorModal } from "./modal";
import { showLoader, hideLoader } from "./loader";
import { showNotification } from "./notification";
import { updateFile } from "./fileList";


export function save() {
  return (dispatch, getState) => {
    dispatch(showLoader("saving data"));
    fileSave(path.join(getState().project.path, PROJECT_FILE), JSON.stringify({
      media: getState().fileList
    }), (err) => {
      if(err) {
        dispatch(showErrorModal(err));
      } else {
        showNotification("success", "save project");
      }
      dispatch(hideLoader());
    });
  };
}

export function saveMedia(hashPath, data) {
  return (dispatch, getState) => {
    dispatch(updateFile(hashPath, data));
    dispatch(save());
  };
}

export function load() {
  return (dispatch, getState) => {

  };
}
