import { Context } from "../../core/Listener";
import {IProjectListElement} from "../../../shared/types/project-list.interface";
export default {
    execute(store) {
        return async (context: Context) => {
            const id: string = context.data.id;
            let projectList: Array<IProjectListElement> = store.get("projects.list");
            projectList = projectList.filter(project => project.id !== id);
            store.set("projects.list", projectList);
            context.reply.send();
        };
    }
};
