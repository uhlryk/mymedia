import { ipcRenderer } from "electron";

export default function asyncIpcMessage (eventName, ...attrs) {
  return new Promise(resolve => {
    ipcRenderer.send(eventName, ...attrs);
    ipcRenderer.once(eventName + "-reply", () => {
      resolve();
    })
  });
}
