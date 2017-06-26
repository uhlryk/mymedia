import path from "path";
import { PROJECT_FILE } from "../constants/general";
import fileSave from "../helpers/fileSave";
import { showLoader, hideLoader } from "./loader";
import { showNotification } from "./notification";

export function save() {
  return async (dispatch, getState) => {
    await fileSave(path.join(getState().project.path, PROJECT_FILE), JSON.stringify({
      project: getState().project,
      resources: getState().resources,
      attributes: getState().attributes
    }));
  };
}

export function load() {
  return (dispatch, getState) => {

  };
}
