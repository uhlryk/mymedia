import Promise from "bluebird";
import { remote} from "electron";
const dialog = remote.dialog;
import { push } from "react-router-redux";
import { PROJECT_FILE } from "../constants/general";
import loadFile from "../helpers/loadFile";
import getFileList from "../helpers/getFileList";

import { showLoader, hideLoader } from "./loader";
import { save } from "./index";
import * as STATUS from "../constants/status";
import { addFiles, loadResources } from "./resources";
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

async function createProjectFile(newProjectData) {
  return async (dispatch, getState, extensionManager) => {
    dispatch(showLoader("finding files"));
    dispatch(initProject(newProjectData, STATUS.NEW));
    extensionManager.projects.getActive().createProject();
    // let files = await getFileList(newProjectData.path);
    // files = extensionManager.projects.getActive().collectProjectFiles(files);
    // files = await extensionManager.projects.getActive().mapFilesProperties(files);
    // dispatch(addFiles(files));
    dispatch(await save());
    dispatch(await saveProjects(newProjectData));
    dispatch(hideLoader());
    dispatch(push("project/media"));
  };
}

async function findProjectFile(dispatch, path) {
  dispatch(showLoader("checking media directory"));
  let result = await loadFile(path, PROJECT_FILE);
  dispatch(hideLoader());
  return result;
}

async function findCollectionFiles(projectPath) {
  return async (dispatch, getState, extensionManager) => {
    let projectFile = await findProjectFile(dispatch, projectPath);
    if (projectFile) {
      dispatch(showLoader("loading resources"));
      let projectData = {};
      try {
        projectData = JSON.parse(projectFile);
      } catch (err) {
        //     dispatch(showErrorModal(err));
        dispatch(hideLoader());
      }
      dispatch(initProject(projectData.project, STATUS.STANDARD));
      dispatch(loadAttributes(projectData.attributes));
      dispatch(loadResources(projectData.resources));
      // let files = await getFileList(projectPath);
      // files = extensionManager.projects.getActive().collectProjectFiles(files);
      // files = await extensionManager.projects.getActive().mapFilesProperties(files);
      // dispatch(addFiles(files, true));
      dispatch(hideLoader());
      dispatch(await save());
      dispatch(await saveProjects(projectData.project));
      dispatch(push("project/media"));
    } else {
      dispatch(push("project/create/" + encodeURIComponent(projectPath)));
    }
  };
}

function openDialog() {
  return new Promise((resolve, reject) => {
    dialog.showOpenDialog({
      properties: ["openDirectory"]
    }, (fileNames) => {
      resolve(fileNames);
    })
  });
}

export function createProject(newProjectData) {
  return async (dispatch) => {
    let projectFile = await findProjectFile(dispatch, newProjectData.path);
    if (projectFile) {
      //show error because in new project path there is other project file
    } else {
      dispatch(await createProjectFile(newProjectData));
    }
  }
}

export function openProject() {
  return async (dispatch) => {
    dispatch(showLoader("selecting media directory"));
    let fileNames = await openDialog();
    dispatch(hideLoader());
    if (fileNames && fileNames.length > 0) {
      let projectPath = fileNames[0];
      dispatch(await findCollectionFiles(projectPath));
    }
  }
}

export function openProjectByPath (projectPath) {
  return async (dispatch) => {
    dispatch(await findCollectionFiles(projectPath));
  };
}
