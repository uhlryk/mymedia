import { Context } from "../../../core/Listener";
import Store from "../Store";
import removeFile from "../../../fs/removeFile";
import ThumbnailManager from "../modules/thumbnails/ThumbnailManager";

export default {
    execute(store: Store, resourceFolderPath: string, thumbnailManager: ThumbnailManager) {
        return async (context: Context) => {
            const resourceId = context.data.resourceId;
            const resource = store.getResourceById(resourceId);
            if (resource) {
                const resourcePath = resource.filePath;
                await thumbnailManager.removeResourceThumbnails(resourceId);
                store.removeResource(resourceId);
                await removeFile(resourceFolderPath, resourcePath);

            }
        };
    }
};
