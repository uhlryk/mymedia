import Store from "../Store";
import IFile from "../types/file.interface";
import getProjectFileList from "./getProjectFileList";
import IResource from "../../../../shared/types/resource.interface";
import uuid from "uuidv4";

export default async function syncDbWithFs(resourceFolderPath: string, store: Store) {
    const fileList: Array<IFile> = await getProjectFileList(this.resourceFolderPath);
    const resourceList: Array<IResource> = this.store.getResourceList();
    const resourceListFilteredByFs = resourceList.filter(resource =>
        fileList.find(file => file.filePath === resource.filePath)
    );
    const newResourceList: Array<IResource> = fileList.map(file => {
        const resourceByFile = resourceListFilteredByFs.find(
            resource => resource.filePath === file.filePath
        );
        if (!resourceByFile) {
            const id = uuid();
            return {
                filePath: file.filePath,
                fileName: file.fileName,
                title: file.name,
                size: file.size,
                ranking: 0,
                description: "",
                id: id,
                tags: [],
                isNew: true
            };
        } else {
            return resourceByFile;
        }
    });
    this.store.setResourceList(newResourceList);
}