import IpcProviderResourceEnums from "../../shared/IpcProviderResourceEnums";
import Listener from "../core/Listener";
import getProjectList from "./handlers/getProjectList";
import setActiveProjectFromFilepicker from "./handlers/setActiveProjectFromFilepicker";
import setActiveProjectFromList from "./handlers/setActiveProjectFromList";
import removeProjectFromList from "./handlers/removeProjectFromList";
import Store from "./Store";
export default class ProjectList {
    private store: Store;

    public init() {
        console.log("Init ProjectList component");
        this.store = new Store();
        this.registerHandlers();
    }
    private registerHandlers() {
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
