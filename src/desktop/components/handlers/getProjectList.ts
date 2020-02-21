import { Context } from "../../core/Listener";
import Store from "../Store";
export default {
    execute(store: Store) {
        return async (context: Context) => {
            context.reply.send(store.getProjectList());
        };
    }
};
