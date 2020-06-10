import { Context } from "../../../core/Listener";
import Store from "../Store";
import removeFile from "../../../fs/removeFile";
export default {
    execute(store: Store, resourceFolderPath: string) {
        return async (context: Context) => {
            const resourceId = context.data.resourceId;
            const resource = store.getResourceById(resourceId);
            if (resource) {
                const resourcePath = resource.filePath;
                store.removeResource(resourceId);
                await removeFile(resourceFolderPath, resourcePath);
            }
        };
    }
};
