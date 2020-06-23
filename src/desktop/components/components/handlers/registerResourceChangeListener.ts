import { Context } from "../../../core/Listener";
import Store from "../Store";
import IpcProviderResourceEnums from "../../../../shared/IpcProviderResourceEnums";
import ThumbnailManager from "../modules/thumbnails/ThumbnailManager";
import MetadataManager from "../modules/MetadataManager";
export default {
    execute(store: Store, thumbnailManager: ThumbnailManager, metadataManager: MetadataManager) {
        console.log("init Project.handler.registerResourceChangeListener");
        return async (context: Context) => {
            console.log("start listening for thumbnails");
            await metadataManager.execute((resource => {
                context.reply
                    .getEvent()
                    .reply(
                        IpcProviderResourceEnums.ON_RESOURCE_CHANGE,
                        resource
                    );
            }));
            await thumbnailManager.execute((resourceId: string, resourceThumbnailPath: string, index: number) => {
                console.log(resourceId, resourceThumbnailPath);
                const resource = store.getResourceById(resourceId);
                resource.thumbnailList[index] = resourceThumbnailPath;
                store.updateResource(resource);
                context.reply
                    .getEvent()
                    .reply(
                        IpcProviderResourceEnums.ON_RESOURCE_CHANGE,
                        resource
                    );
            });
        };
    }
};
