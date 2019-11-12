import * as path from "path";

export default class ThumbnailName {
    static PROJECT_THUMBNAIL_FILE_PART = "_.jpg";
    public static NUMBER_OF_THUMBNAILS = 4;
    static setName(thumbnailFolderPath: string, resourceId: string, videoIndex: number) {
        return path.resolve(
            thumbnailFolderPath,
            resourceId,
            videoIndex + ThumbnailName.PROJECT_THUMBNAIL_FILE_PART
        );
    }

    static getVideoPosition(index: number, duration: number): number {
        const newDuration = 0.9 * duration;
        const videoPosition: number = Math.round(
            0.1 * duration + (index * newDuration) / ThumbnailName.NUMBER_OF_THUMBNAILS
        );
        return videoPosition;
    }
}
