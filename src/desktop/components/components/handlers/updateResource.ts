import { Context } from "../../../core/Listener";
import Store from "../Store";
export default {
    execute(store: Store) {
        console.log("init Project.handler.updateResource");
        return async (context: Context) => {
            console.log("Execute Project.handler.updateResource");
            store.updateResource(context.data.resource);
        };
    }
};
