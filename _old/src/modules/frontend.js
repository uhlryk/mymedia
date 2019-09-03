import { Manager } from "extensioner";
import notificationExtension from "./notifications/frontend/index";
import languageSwitcherExtension from "./languageSwitcher/frontend/index";
// import tasksExtension from "./tasks/frontend";
import projectsExtension from "./projects/frontend/index";

export default () => {
    const extensionManager = new Manager();
    // extensionManager.registerExtension("tasks", tasksExtension());
    extensionManager.registerExtension("languageSwitcher", languageSwitcherExtension());
    extensionManager.registerExtension("notifications", notificationExtension());
    extensionManager.registerExtension("projects", projectsExtension());

    return extensionManager;
};
