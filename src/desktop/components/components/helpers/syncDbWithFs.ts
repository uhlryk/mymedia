import Store from "../Store";
import IFile from "../types/file.interface";
import getProjectFileList from "./getProjectFileList";
import IResource from "../../../../shared/types/resource.interface";
import uuid from "uuidv4";
import getMetadata from "../../../fs/getMetadata";
import * as path from "path";

export default async function syncDbWithFs(resourceFolderPath: string, resourceList: Array<IResource>) {
    console.log("syncDbWithFs", resourceFolderPath);
    const fileList: Array<IFile> = await getProjectFileList(resourceFolderPath);
    const resourceListFilteredByFs = resourceList.filter(resource =>
        fileList.find(file => file.filePath === resource.filePath)
    );
    const currentDate = new Date();
    const currentTimestamp = currentDate.getTime();
    const newResourceList: Array<IResource> = [];
    for (const file of fileList) {
        const resourceByFile = resourceListFilteredByFs.find(
            resource => resource.filePath === file.filePath
        );
        if (!resourceByFile) {
            const id = uuid();
            const metadata = await getMetadata(path.resolve(resourceFolderPath, file.filePath));
            newResourceList.push({
                filePath: file.filePath,
                fileName: file.fileName,
                title: file.name,
                size: file.size,
                ranking: 0,
                duration: parseInt(metadata.duration, 10),
                width: parseInt(metadata.width, 10),
                height: parseInt(metadata.height, 10),
                description: "",
                id: id,
                tagIdList: [],
                thumbnailList: [],
                added: currentTimestamp
            });
        } else {
            newResourceList.push(resourceByFile);
        }
    }
    console.log("syncDbWithFs.newResourceList");
    return newResourceList;
}
