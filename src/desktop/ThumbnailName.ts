import * as path from "path";

export default class ThumbnailName {
    static PROJECT_THUMBNAIL_FILE_PART = "_.jpg";
    static setName(
        thumbnailFolderPath: string,
        resourceId: string,
        videoPercentage: number
    ) {
        return path.resolve(
            thumbnailFolderPath,
            resourceId,
            videoPercentage + ThumbnailName.PROJECT_THUMBNAIL_FILE_PART
        );
    }
}
