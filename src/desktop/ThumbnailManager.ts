import * as path from "path";
import generateThumbnail from "./fs/generateThumbnail";

export default class ThumbnailManager {
    static PROJECT_THUMBNAIL_FOLDER = "thumbnails";
    static PROJECT_THUMBNAIL_FILE = "thum.jpg";

    private _projectPath: string;
    private _projectFolderName: string;
    private _queue: Array<QueueElement>;
    private _isRunning: boolean;
    constructor(
        projectPath: string,
        projectFolderName: string,
        listener: (resourceId: string, resourceThumbnailPath: string) => void
    ) {
        this._projectPath = projectPath;
        this._projectFolderName = projectFolderName;
        this._queue = [];
        this._isRunning = false;
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

    public async run() {
        if (!this._isRunning) {
            this._isRunning = true;
            while (this._queue[0]) {
                const queueElement: QueueElement = this._queue.shift();
                console.log("Start generating thumbnail for ", queueElement.sourceVideoPath);
                try {
                    await getThumbnail(queueElement.sourceVideoPath, queueElement.targetThumbnailPath);
                } catch(err) {
                    console.log("WWWW");
                    console.log(err);
                }
            }
            this._isRunning = false;
        }
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
