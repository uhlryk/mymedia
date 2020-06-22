import { Context } from "../../../core/Listener";
import Store from "../Store";
export default {
    execute(store: Store) {
        console.log("init Project.handler.getTagList");
        return async (context: Context) => {
            console.log("Execute Project.handler.getTagList");
            const tagList = store.getTagList();
            context.reply.send(tagList);
        };
    }
};
