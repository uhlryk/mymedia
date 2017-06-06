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

async function createProjectFile(dispatch, extensions, newProjectData) {
  dispatch(showLoader("finding files"));
  dispatch(initProject(newProjectData, STATUS.NEW));
  extensions.projects.getActive().createProject();
  let files = await getFileList(newProjectData.path);
  files = extensions.projects.getActive().collectProjectFiles(files);
  files = await extensions.projects.getActive().mapFilesProperties(files);
  dispatch(addFiles(files));
  dispatch(hideLoader());
  dispatch(save());
  dispatch(saveProjects(newProjectData));
  dispatch(push("project/media"));
}

async function findProjectFile(dispatch, path) {
  dispatch(showLoader("checking media directory"));
  let result = await loadFile(path, PROJECT_FILE);
  dispatch(hideLoader());
  return result;
}

async function findCollectionFiles(dispatch, extensions, projectPath) {
  let projectFile = await findProjectFile(dispatch, projectPath);
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
    let files = await getFileList(projectPath);
    files = extensions.projects.getActive().collectProjectFiles(files);
    files = await extensions.projects.getActive().mapFilesProperties(files);
    dispatch(addFiles(files, true));
    dispatch(hideLoader());
    dispatch(save());
    dispatch(saveProjects(projectData.project));
    dispatch(push("project/media"));
  } else {
    dispatch(push("project/create/" + encodeURIComponent(projectPath)));
  }
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

export function createProject(newProjectData, extensions) {
  return async (dispatch, getState) => {
    try {
      let projectFile = await findProjectFile(dispatch, newProjectData.path);
      if (projectFile) {
        //show error because in new project path there is other project file
      } else {
        await createProjectFile(dispatch, extensions, newProjectData);
      }
    } catch (err) {
      console.error(err);
      dispatch(hideLoader());
    }
  }
}

export function openProject(extensions) {
  return async (dispatch, getState) => {
    try {
      dispatch(showLoader("selecting media directory"));
      let fileNames = await openDialog();
      dispatch(hideLoader());
      if (fileNames && fileNames.length > 0) {
        let projectPath = fileNames[0];
        await findCollectionFiles(dispatch, extensions, projectPath);
      }
    } catch (err) {
      console.log(err);
      dispatch(hideLoader());
    }
  }
}

export function openProjectByPath (extensions, projectPath) {
  return async (dispatch, getState) => {
    try {
      await findCollectionFiles(dispatch, extensions, projectPath);
    } catch (err) {
      console.log(err);
      dispatch(hideLoader());
    }
  };
}
