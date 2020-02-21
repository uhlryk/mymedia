import { Context } from "../../core/Listener";
import {IProjectListElement} from "../../../shared/types/project-list.interface";
import Project from "../components/Project";

export default {
    execute(store) {
        return async (context: Context) => {
            context.loader.setMessage("Waiting for project path");
            const id: string = context.data.id;
            const projectList: Array<IProjectListElement> = store.get(
                "projects.list"
            );
            const projectListElement = projectList.find(project => project.id === id);
            await Project.getNewProjectInstance(
                projectListElement.resourceFolderPath
            );
            context.reply.send();
        };
    }
};
