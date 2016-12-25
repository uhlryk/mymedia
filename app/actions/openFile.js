import path from "path";
import { ipcRenderer } from "electron";

export function openFile(filePath) {
  return (dispatch, getState) => {
    const videoPath = path.join(getState().project.path, filePath);
    ipcRenderer.send("open", videoPath);
  }
}
