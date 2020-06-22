import { Context } from "../../core/Listener";
import Project from "../components/Project";
import Store from "../Store";

export default {
    execute(store: Store) {
        console.log("init ProjectList.handler.setActiveProjectFromList");
        return async (context: Context) => {
            console.log("Execute ProjectList.handler.setActiveProjectFromList");
            const id: string = context.data.id;
            const projectListElement = store.getProject(id);
            await Project.getNewProjectInstance(projectListElement.resourceFolderPath);
            context.reply.send();
        };
    }
};
