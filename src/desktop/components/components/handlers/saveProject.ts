import { Context } from "../../../core/Listener";
import Store from "../Store";
export default {
    execute(store: Store) {
        console.log("init Project.handler.saveProject");
        return async (context: Context) => {
            console.log("Execute Project.handler.saveProject");
            store.setResourceList(context.data.project.resourceList);
            store.setTagList(context.data.project.tagList);
        };
    }
};
