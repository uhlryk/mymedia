import { Context } from "../../../core/Listener";
import Store from "../Store";
import IpcProviderResourceEnums from "../../../../shared/IpcProviderResourceEnums";
import ThumbnailManager from "../modules/thumbnails/ThumbnailManager";
import IResource from "../../../../shared/types/resource.interface";
export default {
    execute(store: Store, thumbnailManager: ThumbnailManager) {
        console.log("init Project.handler.registerResourceChangeListener");
        return async (context: Context) => {
            console.log("start listening for thumbnails");
            await thumbnailManager.execute((resource: IResource) => {
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
