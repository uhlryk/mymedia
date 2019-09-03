import { Manager } from "extensioner";
import tasksExtension from "./tasks/backend/index";

export default () => {
    const extensionManager = new Manager();
    extensionManager.registerExtension("tasks", tasksExtension());
    return extensionManager;
};
