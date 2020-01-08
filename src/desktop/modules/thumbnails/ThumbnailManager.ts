import * as path from "path";
import generateThumbnail from "./generateThumbnail";
import getThumbnailList from "./getThumbnailList";
import IResource from "../../../shared/types/resource.interface";
import ThumbnailName from "../../../shared/ThumbnailName";

export default class ThumbnailManager {
    static PROJECT_THUMBNAIL_FOLDER = "thumbnails";

    private _projectPath: string;
    private _projectFolderName: string;
    private _thumbnailMap: Map<string, Array<string>>;
    private _queue: Array<QueueElement>;
    private _isRunning: boolean;
    private _thumbnailFolderName: string;
    private _isDestroyed: boolean = false;
    constructor(projectPath: string, projectFolderName: string) {
        this._projectPath = projectPath;
        this._projectFolderName = projectFolderName;
        this._thumbnailFolderName = path.resolve(
            projectPath,
            projectFolderName,
            ThumbnailManager.PROJECT_THUMBNAIL_FOLDER
        );
        this._queue = [];
        this._isRunning = false;
    }

    public destroy() {
        this._isDestroyed = true;
    }
    public async loadExistingThumbnails(): Promise<Map<string, Array<string>>> {
        this._thumbnailMap = await getThumbnailList(this._thumbnailFolderName);
        return this._thumbnailMap;
    }

    public queueGenerateAllThumbnails(resource: IResource) {
        if (!resource.duration) {
            this.queueGenerateThumbnail(resource, 0, 0);
        } else {
            for (let i = 0; i < ThumbnailName.NUMBER_OF_THUMBNAILS; i++) {
                this.queueGenerateThumbnail(resource, i, i === 0 ? 1 : 0);
            }
        }
    }
    public queueGenerateMissingThumbnails(
        resource: IResource,
        thumbnailList: Array<string>
    ) {
        const indexedThumbnailArray = new Array(ThumbnailName.NUMBER_OF_THUMBNAILS);
        for (const thumbnail of thumbnailList) {
            const index: number = ThumbnailName.getThumbnailIndex(thumbnail);
            indexedThumbnailArray[index] = thumbnail;
        }
        if (!resource.duration) {
            if (!indexedThumbnailArray[0]) {
                this.queueGenerateThumbnail(resource, 0, 0);
            }
        } else {
            for (let i = 0; i < ThumbnailName.NUMBER_OF_THUMBNAILS; i++) {
                if (!indexedThumbnailArray[i]) {
                    this.queueGenerateThumbnail(resource, i, 0);
                }
            }
        }
    }
    private queueGenerateThumbnail(
        resource: IResource,
        index: number,
        priority: number
    ) {
        const queueElement: QueueElement = {
            resourceId: resource.id,
            sourceVideoPath: path.resolve(this._projectPath, resource.filePath),
            targetThumbnailPath: ThumbnailName.setName(
                this._thumbnailFolderName,
                resource.id,
                index
            ),
            index: index,
            videoTime: ThumbnailName.getVideoPosition(index, resource.duration),
            priority: priority
        };
        this._queue.push(queueElement);
    }
    public async execute(
        listener: (
            resourceId: string,
            resourceThumbnailPath: string,
            index: number
        ) => void
    ) {
        const priorityOrderedArray: Array<QueueElement> = this._queue.sort(
            (elementA: QueueElement, elementB: QueueElement) => {
                return elementB.priority - elementA.priority;
            }
        );
        for (const queueElement of priorityOrderedArray) {
            if (this._isDestroyed) {
                break;
            }
            console.log(
                "Start generating thumbnail for ",
                queueElement.sourceVideoPath + " index:" + queueElement.index
            );
            try {
                await getThumbnail(
                    queueElement.sourceVideoPath,
                    queueElement.targetThumbnailPath,
                    queueElement.videoTime
                );
                listener(
                    queueElement.resourceId,
                    "file://" + queueElement.targetThumbnailPath,
                    queueElement.index
                );
            } catch (err) {
                console.log(err);
            }
        }
    }
    // public async run(
    //     listener: (
    //         resourceId: string,
    //         resourceThumbnailPath: string,
    //         index: number
    //     ) => void
    // ) {
    //     console.log("Run thumbnail service");
    //     if (!this._isRunning) {
    //         this._isRunning = true;
    //         while (this._queue[0]) {
    //             const queueElement: QueueElement = this._queue.shift();
    //             console.log(
    //                 "Start generating thumbnail for ",
    //                 queueElement.sourceVideoPath
    //             );
    //             try {
    //                 await getThumbnail(
    //                     queueElement.sourceVideoPath,
    //                     queueElement.targetThumbnailPath,
    //                     queueElement.videoTime
    //                 );
    //                 listener(
    //                     queueElement.resourceId,
    //                     "file://" + queueElement.targetThumbnailPath,
    //                     queueElement.index
    //                 );
    //             } catch (err) {
    //                 console.log(err);
    //             }
    //         }
    //         this._isRunning = false;
    //     }
    // }
}

interface QueueElement {
    targetThumbnailPath: string;
    sourceVideoPath: string;
    resourceId: string;
    index: number;
    videoTime: number;
    priority: number;
}

async function getThumbnail(
    sourceVideoPath: string,
    targetThumbnailPath: string,
    videoTime: number
) {
    const newThumbnail: string = await generateThumbnail(
        sourceVideoPath,
        targetThumbnailPath,
        videoTime
    );
    if (newThumbnail) {
        return newThumbnail;
    } else {
        return null;
    }
}
