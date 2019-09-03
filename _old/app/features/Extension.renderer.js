import { ipcRenderer } from "electron";
import BaseExtension from "./Extension";

export default class Extension extends BaseExtension {

  requestMainProcess (command, ...requestData) {
    return new Promise(resolve => {
      ipcRenderer.send("requestMainProcess", this.getName(), command, ...requestData);
      ipcRenderer.once("responseMainProcess", (evt, responseData) => {
        resolve(responseData);
      })
    });
  }
}
