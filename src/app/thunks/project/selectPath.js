import remote from "remote";
const dialog = remote.require("dialog");
import findProjectFile from "../../helpers/findFile";
import { initProject } from "../../actions/project";

export default function selectPath(path) {
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
