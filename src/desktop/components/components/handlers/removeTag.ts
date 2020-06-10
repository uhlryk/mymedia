import { Context } from "../../../core/Listener";
import Store from "../Store";
export default {
    execute(store: Store) {
        console.log("init Project.handler.removeTag");
        return async (context: Context) => {
            console.log("Execute Project.handler.removeTag");
            store.removeTag(context.data.tagId);
        };
    }
};
