import * as path from "path";

export default class ThumbnailName {
    static PROJECT_THUMBNAIL_FILE_PART = "_.jpg";
    public static NUMBER_OF_THUMBNAILS = 6;
    static setName(
        thumbnailFolderPath: string,
        resourceId: string,
        videoIndex: number
    ) {
        return path.resolve(
            thumbnailFolderPath,
            resourceId,
            videoIndex + ThumbnailName.PROJECT_THUMBNAIL_FILE_PART
        );
    }

    static getVideoPosition(index: number, duration: number): number {
        const videoPosition: number = Math.round(
            (index * duration) /
            (ThumbnailName.NUMBER_OF_THUMBNAILS > 1
                ? ThumbnailName.NUMBER_OF_THUMBNAILS - 1
                : 1)
        );
        return videoPosition;
    }
}
