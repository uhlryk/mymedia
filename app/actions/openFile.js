import { ipcRenderer } from "electron";

export function openFile(filePath) {
  return (dispatch, getState) => {
    ipcRenderer.send("open", filePath);
  }
}
