import { dialog } from "electron";
import { IProjectListElement } from "../../../shared/types/project-list.interface";
import uuidv4 from "uuidv4";
import * as path from "path";
import { Context } from "../../core/Listener";
import Project from "../components/Project";
import Store from "../Store";

export default {
    execute(store: Store) {
        return async (context: Context) => {
            context.loader.setMessage("Waiting for project path");
            dialog.showOpenDialog(
                {
                    properties: ["openDirectory"]
                },
                async fileNames => {
                    const resourceFolderPath = fileNames[0];
                    context.loader.setMessage("Checking if project exist");
                    const project: IProjectListElement = {
                        id: uuidv4(),
                        name: path.parse(resourceFolderPath).name,
                        resourceFolderPath: resourceFolderPath
                    };
                    store.addProject(project);
                    await Project.getNewProjectInstance(resourceFolderPath);
                    context.reply.send();
                }
            );
        };
    }
};
