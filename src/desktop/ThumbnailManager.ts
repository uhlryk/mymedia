import * as path from "path";
import generateThumbnail from "./fs/generateThumbnail";

export default class ThumbnailManager {
    static PROJECT_THUMBNAIL_FOLDER = "thumbnails";
    static PROJECT_THUMBNAIL_FILE = "thum.jpg";

    private _projectPath: string;
    private _projectFolderName: string;
    private _queue: Array<QueueElement>;

    constructor(
        projectPath: string,
        projectFolderName: string,
        listener: (resourceId: string, resourceThumbnailPath: string) => void
    ) {
        this._projectPath = projectPath;
        this._projectFolderName = projectFolderName;
        this._queue = [];
    }

    public queueGenerateThumbnail(resourceFilePath: string, resourceId: string) {
        const targetThumbnailPath: string = path.resolve(
            this._projectPath,
            this._projectFolderName,
            ThumbnailManager.PROJECT_THUMBNAIL_FOLDER,
            resourceId,
            ThumbnailManager.PROJECT_THUMBNAIL_FILE
        );
        const videoPath: string = path.resolve(this._projectPath, resourceFilePath);

        const queueElement: QueueElement = {
            resourceId: resourceId,
            sourceVideoPath: videoPath,
            targetThumbnailPath: targetThumbnailPath
        };
        this._queue.push(queueElement);
    }
}

interface QueueElement {
    targetThumbnailPath: string;
    sourceVideoPath: string;
    resourceId: string;
}

async function getThumbnail(sourceVideoPath: string, targetThumbnailPath: string) {
    const newThumbnail: string = await generateThumbnail(
        sourceVideoPath,
        targetThumbnailPath
    );
    if (newThumbnail) {
        return newThumbnail;
    } else {
        return null;
    }
}
