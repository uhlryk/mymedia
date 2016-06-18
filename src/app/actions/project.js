import remote from "remote";
import findProjectFile from "../helpers/findFile";

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

export function selectProjectPath(path) {
  return (dispatch, getState) => {
    dialog.showOpenDialog({
      properties: [ "openDirectory"]
    }, (fileNames) => {
      if(fileNames && fileNames.length > 0) {
        findProjectFile(fileNames[0], ".mymedia.json", (err, result) => {
          if(err) {

          } else if(result){

            dispatch(initProject(fileNames[0]));
          } else {

          }
        });
      }
    });
  }
}
