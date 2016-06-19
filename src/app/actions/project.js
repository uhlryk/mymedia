import remote from "remote";
import { push } from "react-router-redux";
import { PROJECT_FILE } from "../constants/general";
import fileFind from "../helpers/fileFind";
import fileList from "../helpers/fileList";
import fileLoad from "../helpers/fileLoad";

import { showLoader, hideLoader } from "./loader";
import { showErrorModal, showYesNoModal } from "./modal";
import { save } from "./index";
import { addNewFiles, setProjectFiles } from "./fileList";

const dialog = remote.require("dialog");

export const INIT_PROJECT = "project.init";
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
        dispatch(showLoader("finding files"));
        dispatch(initProject(path));
        fileList(path, (err, files) => {
          dispatch(addNewFiles(files));
          dispatch(hideLoader());
          dispatch(save());
          dispatch(push("project/media/list"));
        });
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
    fileFind(path, PROJECT_FILE, (err, result) => {
      dispatch(hideLoader());
      if(err) {
        dispatch(showErrorModal(err));
      } else if(result){
        dispatch(showLoader("load project"));
        fileLoad(path, PROJECT_FILE, (err, result) => {
          if(err) {
            dispatch(showErrorModal(err));
            dispatch(hideLoader());
          } else if(result){
            let projectData = {};
            try {
              projectData = JSON.parse(result);
            } catch(err) {
              dispatch(showErrorModal(err));
              dispatch(hideLoader());
            }
            console.log(projectData);
            dispatch(initProject(path));
            dispatch(setProjectFiles(projectData.media));
            fileList(path, (err, files) => {
              dispatch(addNewFiles(files));
              dispatch(hideLoader());
              console.log(getState().media);
              dispatch(push("project/media/list"));
            });
          }
        });
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
