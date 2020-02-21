import { Context } from "../../core/Listener";
import Store from "../Store";
export default {
    execute(store: Store) {
        return async (context: Context) => {
            const id: string = context.data.id;
            store.removeProject(id);
            context.reply.send();
        };
    }
};
