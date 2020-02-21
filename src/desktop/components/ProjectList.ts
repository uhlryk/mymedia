import IpcProviderResourceEnums from "../../shared/IpcProviderResourceEnums";
import Listener from "../core/Listener";
import getProjectList from "./handlers/getProjectList";
import setActiveProjectFromFilepicker from "./handlers/setActiveProjectFromFilepicker";
import setActiveProjectFromList from "./handlers/setActiveProjectFromList";
import removeProjectFromList from "./handlers/removeProjectFromList";
const Store = require("electron-store");
export default class ProjectList {
    private store;
    constructor() {
        this.store = new Store({
            schema: {
                projects: {
                    list: []
                }
            }
        });
        this.registerListener();
    }

    private registerListener() {
        Listener.on(
            IpcProviderResourceEnums.GET_PROJECT_LIST,
            getProjectList.execute(this.store)
        );
        Listener.on(
            IpcProviderResourceEnums.SET_ACTIVE_PROJECT_FROM_FILEPICKER,
            setActiveProjectFromFilepicker.execute(this.store)
        );
        Listener.on(
            IpcProviderResourceEnums.SET_ACTIVE_PROJECT_FROM_LIST,
            setActiveProjectFromList.execute(this.store)
        );

        Listener.on(
            IpcProviderResourceEnums.REMOVE_PROJECT_FROM_LIST,
            removeProjectFromList.execute(this.store)
        );
    }
}
