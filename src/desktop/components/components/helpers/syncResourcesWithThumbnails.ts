import Store from "../Store";
import IFile from "../types/file.interface";
import getProjectFileList from "./getProjectFileList";
import IResource from "../../../../shared/types/resource.interface";
import uuid from "uuidv4";
import getMetadata from "../../../fs/getMetadata";
import * as path from "path";
import ThumbnailManager from "../modules/thumbnails/ThumbnailManager";

export default async function syncResourcesWithThumbnails(
    resourceList: Array<IResource>,
    thumbnailManager: ThumbnailManager
) {
    console.log("syncResourcesWithThumbnails start");
    const thumbnailMap: Map<
        string,
        Array<string>
    > = await thumbnailManager.loadExistingThumbnails();
    console.log("syncResourcesWithThumbnails existing thumbnails are created");
    resourceList.map((resource: IResource) => {
        if (thumbnailMap.has(resource.id)) {
            const thumbnailList: Array<string> = thumbnailMap.get(resource.id);
            thumbnailManager.queueGenerateMissingThumbnails(resource, thumbnailList);
            resource.thumbnailList = thumbnailList;
        } else {
            thumbnailManager.queueGenerateAllThumbnails(resource);
        }
    });
    console.log("syncResourcesWithThumbnails missing thumbnails are created");
    return resourceList;
}
