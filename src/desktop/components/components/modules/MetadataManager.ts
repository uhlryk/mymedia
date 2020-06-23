import IResource from "../../../../shared/types/resource.interface";
import getMetadata from "../../../fs/getMetadata";
import * as path from "path";

export default class MetadataManager {
    private _isDestroyed: boolean = false;
    private _resourceFolderPath: string;
    private _resourceList: Array<IResource>;
    constructor() {
        this._isDestroyed = false;
    }
    public destroy() {
        this._isDestroyed = true;
    }
    public init(resourceFolderPath, resourceList: Array<IResource>) {
        this._resourceList = resourceList;
        this._resourceFolderPath = resourceFolderPath;
    }
    public async execute(
        listener: (
            resource: IResource
        ) => void
    ) {
        for (const resource of this._resourceList) {
            if (this._isDestroyed) {
                break;
            }
            if (!resource.duration && !resource.width && !resource.height) {
                const metadata = await getMetadata(
                    path.resolve(this._resourceFolderPath, resource.filePath)
                );
                resource.duration = parseInt(metadata.duration, 10);
                resource.width = parseInt(metadata.width, 10);
                resource.height = parseInt(metadata.height, 10);
                listener(resource);
            }
        }
    }
}
