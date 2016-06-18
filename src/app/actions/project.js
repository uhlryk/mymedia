import remote from "remote";
import { push } from "react-router-redux";
import findFile from "../helpers/findFile";
import { showLoader, hideLoader } from "./loader";
import { showErrorModal, showYesNoModal } from "./modal";

const dialog = remote.require("dialog");

export const INIT_PROJECT = "project.init";
export const OPEN_PROJECT = "project.open";
export const CLEAR_PROJECT = "project.clear";

export function initProject(path) {
  return {
    type: INIT_PROJECT,
    path
  }
}

export function askIfCreateNewProjectFile(path) {
  return (dispatch, getState) => {
    dispatch(showYesNoModal(
      "New  project",
      "Do you want to create new project? There is no project file",
      "create",
      "chancel",
      () => {

      },
      () => {
        //do nothing
      }
    ));

  };
}

export function findProjectFile(path) {
  return (dispatch, getState) => {
    dispatch(showLoader("checking media directory"));
    findFile(path, ".mymedia.json", (err, result) => {
      dispatch(hideLoader());
      if(err) {
        dispatch(showErrorModal(err));
      } else if(result){
        dispatch(initProject(path));
      } else {
        dispatch(askIfCreateNewProjectFile(path));
      }
    });
  };
}

export function selectProjectPath() {
  return (dispatch, getState) => {
    dispatch(showLoader("selecting media directory"));
    dialog.showOpenDialog({
      properties: [ "openDirectory"]
    }, (fileNames) => {
      dispatch(hideLoader());
      if(fileNames && fileNames.length > 0) {
        dispatch(findProjectFile(fileNames[0]));
      }
    });
  }
}
