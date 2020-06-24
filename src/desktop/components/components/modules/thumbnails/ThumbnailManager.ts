import * as path from "path";
import getThumbnailList from "./getThumbnailList";
import generateThumbnail from "./generateThumbnail";
import IResource from "../../../../../shared/types/resource.interface";
import ThumbnailName from "../../../../../shared/ThumbnailName";
import removeFolder from "../../../../fs/removeFolder";
import * as fse from "fs-extra";
import getMetadata from "../../../../fs/getMetadata";

export default class ThumbnailManager {
    static PROJECT_THUMBNAIL_FOLDER = "thumbnails";

    private _resourceFolderPath: string;
    private _projectFolderName: string;
    private _thumbnailMap: Map<string, Array<string>>;
    private _queue: Array<QueueElement>;
    private _thumbnailFolderName: string;
    private _isDestroyed: boolean = false;
    constructor(resourceFolderPath: string, projectFolderName: string) {
        this._resourceFolderPath = resourceFolderPath;
        this._projectFolderName = projectFolderName;
        this._thumbnailFolderName = path.resolve(
            resourceFolderPath,
            projectFolderName,
            ThumbnailManager.PROJECT_THUMBNAIL_FOLDER
        );
        this._queue = [];
    }
    public async init() {
        const isProjectFolderExist: boolean = await fse.pathExists(
            this._thumbnailFolderName
        );
        if (!isProjectFolderExist) {
            await fse.mkdir(this._thumbnailFolderName);
        }
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

    public async removeResourceThumbnails(resourceId: string) {
        return removeFolder(path.join(this._thumbnailFolderName, resourceId));
    }

    private queueGenerateThumbnail(resource: IResource, index: number, priority: number) {
        const queueElement: QueueElement = {
            resource: resource,

            index: index,

            priority: priority
        };
        this._queue.push(queueElement);
    }
    public async execute(
        listener: (
            resource: IResource,
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
            try {
                const resource = queueElement.resource;
                if (!resource.duration && !resource.width && !resource.height) {
                    const metadata = await getMetadata(
                        path.resolve(this._resourceFolderPath, resource.filePath)
                    );
                    resource.duration = parseInt(metadata.duration, 10);
                    resource.width = parseInt(metadata.width, 10);
                    resource.height = parseInt(metadata.height, 10);
                }
                const sourceVideoPath = path.resolve(this._resourceFolderPath, resource.filePath);
                const targetThumbnailPath = ThumbnailName.setName(
                    this._thumbnailFolderName,
                    resource.id,
                    queueElement.index
                );
                const videoTime = ThumbnailName.getVideoPosition(queueElement.index, resource.duration);
                const thumbnail = await getThumbnail(
                    sourceVideoPath,
                    targetThumbnailPath,
                    videoTime
                );
                queueElement.resource.thumbnailList[queueElement.index] = "file://" + targetThumbnailPath;
                if (this._isDestroyed === false) {
                    listener(
                        queueElement.resource
                    );
                }
            } catch (err) {
                console.log(err);
            }
        }
    }
}

interface QueueElement {
    resource: IResource;
    index: number;
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
