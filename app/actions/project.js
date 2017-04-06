import { remote} from "electron";
const dialog = remote.dialog;
import { push } from "react-router-redux";
import { PROJECT_FILE } from "../constants/general";
import fileFind from "../helpers/fileFind";
import fileList from "../helpers/fileList";
import fileLoad from "../helpers/fileLoad";

import { showLoader, hideLoader } from "./loader";
import { save } from "./index";
import * as STATUS from "../constants/status";
import { addFiles, loadFiles } from "./fileList";
import { loadElements } from "./attributes";

export const INIT_PROJECT = "project.init";
export const CLEAR_PROJECT = "project.clear";

export function initProject(data, status) {
  return {
    type: INIT_PROJECT,
    ...data,
    status
  }
}

function createProjectFile(newProjectData) {
  return (path, result, extensions) => {
    return (dispatch, getState) => {
      if (result) {
        //TODO: show error form that on this directory appear project file
      } else {
        dispatch(showLoader("finding files"));
        dispatch(initProject(newProjectData, STATUS.NEW));
        extensions.projects.getActive().createProject();
        fileList(path, (err, files) => {
          files = extensions.projects.getActive().collectProjectFiles(files);
          dispatch(addFiles(files));
          dispatch(hideLoader());
          dispatch(save());
          dispatch(push("project/media"));
        });
      }
    };
  };
}

function findCollectionFiles() {
  return (path, result, extensions) => {
    return (dispatch, getState) => {
      if (result) {
        dispatch(showLoader("load project"));
        fileLoad(path, PROJECT_FILE, (err, result) => {
          if (err) {
            //dispatch(showErrorModal(err));
            dispatch(hideLoader());
          } else if (result) {
            let projectData = {};
            try {
              projectData = JSON.parse(result);
            } catch (err) {
              //     dispatch(showErrorModal(err));
              dispatch(hideLoader());
            }
            dispatch(initProject(projectData.project, STATUS.STANDARD));
            dispatch(loadElements(projectData.attributes));
            dispatch(loadFiles(projectData.media));
            fileList(path, (err, files) => {
              files = extensions.projects.getActive().collectProjectFiles(files);
              dispatch(addFiles(files, true));
              dispatch(hideLoader());
              dispatch(save());
              dispatch(push("project/media"));
            });
          }
        });
      } else {
        dispatch(push("project/create/" + encodeURIComponent(path)));
      }
    };
  };
}

function findProjectFile(path, extensions, callback) {
  return (dispatch, getState) => {
    dispatch(showLoader("checking media directory"));
    fileFind(path, PROJECT_FILE, (err, result) => {
      dispatch(hideLoader());
      if(err) {
        //TODO: show error message in error popup
      } else {
        dispatch(callback(path, result, extensions));
      }
    });
  };
}

export function createProject(newProjectData, extensions) {
  return (dispatch, getState) => {
    dispatch(findProjectFile(newProjectData.path, extensions, createProjectFile(newProjectData)));
  }
}

export function openProject(extensions) {
  return (dispatch, getState) => {
    dispatch(showLoader("selecting media directory"));
    dialog.showOpenDialog({
      properties: [ "openDirectory"]
    }, (fileNames) => {
      dispatch(hideLoader());
      if(fileNames && fileNames.length > 0) {
        dispatch(findProjectFile(fileNames[0], extensions, findCollectionFiles()));
      }
    });
  }
}
