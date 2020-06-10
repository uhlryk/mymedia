import { Context } from "../../../core/Listener";
import Store from "../Store";
export default {
    execute(store: Store) {
        console.log("init Project.handler.getResourceList");
        return async (context: Context) => {
            console.log("Execute Project.handler.getResourceList");
            const resourceList = store.getResourceList();
            context.reply.send(resourceList);
        };
    }
};
