import { Context } from "../../core/Listener";
import Project from "../components/Project";
import Store from "../Store";

export default {
    execute(store: Store) {
        return async (context: Context) => {
            context.loader.setMessage("Waiting for project path");
            const id: string = context.data.id;
            const projectListElement = store.getProject(id);
            await Project.getNewProjectInstance(projectListElement.resourceFolderPath);
            context.reply.send();
        };
    }
};
