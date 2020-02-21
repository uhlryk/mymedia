import { Context } from "../../core/Listener";
export default {
    execute(store) {
        return async (context: Context) => {
            context.reply.send(store.get("projects.list"));
        };
    }
};
