import { Context } from "../../../core/Listener";
import Store from "../Store";
export default {
    execute(store: Store) {
        console.log("init Project.handler.saveTagList");
        return async (context: Context) => {
            console.log("Execute Project.handler.saveTagList");
            store.setTagList(context.data.tagList);
        };
    }
};
