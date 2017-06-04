import "babel-polyfill";
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
import { saveProjects } from "./projects";
import { loadAttributes } from "./attributes";

export const INIT_PROJECT = "project.init";
export const CLEAR_PROJECT = "project.clear";

export function initProject(data, status) {
  return {
    type: INIT_PROJECT,
    payload: {
      ...data,
      status
    }

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
          extensions.projects.getActive().mapFilesProperties(files)
            .then(files => {
              dispatch(addFiles(files));
              dispatch(hideLoader());
              dispatch(save());
              dispatch(saveProjects(newProjectData));
              dispatch(push("project/media"));
            });
        });
      }
    };
  };
}

async function findCollectionFiles(dispatch, path, projectFile, extensions) {
  if (projectFile) {
    let projectData = {};
    try {
      projectData = JSON.parse(projectFile);
    } catch (err) {
      //     dispatch(showErrorModal(err));
      dispatch(hideLoader());
    }
    dispatch(initProject(projectData.project, STATUS.STANDARD));
    dispatch(loadAttributes(projectData.attributes));
    dispatch(loadFiles(projectData.media));
    fileList(path, (err, files) => {
      files = extensions.projects.getActive().collectProjectFiles(files);
      extensions.projects.getActive().mapFilesProperties(files)
        .then(files => {
          dispatch(addFiles(files, true));
          dispatch(hideLoader());
          dispatch(save());
          dispatch(saveProjects(projectData.project));
          dispatch(push("project/media"));
        });
    });
  } else {
    dispatch(push("project/create/" + encodeURIComponent(path)));
  }
}

async function findProjectFile(dispatch, path) {
  dispatch(showLoader("checking media directory"));
  let result = await fileFind(path, PROJECT_FILE);
  dispatch(hideLoader());
  return result;
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

export function openProjectByPath (extensions, path) {
  return async (dispatch, getState) => {
    try {
      let projectFile = await findProjectFile(dispatch, path);
      await findCollectionFiles(dispatch, path, projectFile, extensions);
    } catch (err) {
      //handle errors
    }
  };
}
