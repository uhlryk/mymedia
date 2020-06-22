import { Context } from "../../core/Listener";
import Store from "../Store";
import Project from "../components/Project";
export default {
    execute(store: Store) {
        return async (context: Context) => {
            Project.destroyInstance();
            context.reply.send(store.getProjectList());
        };
    }
};
