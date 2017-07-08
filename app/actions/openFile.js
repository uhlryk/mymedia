import { ipcRenderer } from "electron";
import path from "path";

export function openFile(filePath) {
  return (dispatch, getState) => {
    const project = getState().project;
    const projectPath = project.path;
    ipcRenderer.send("open", path.join(projectPath, filePath));
  }
}
