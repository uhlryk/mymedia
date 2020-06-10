import Store from "../Store";
import IFile from "../types/file.interface";
import getProjectFileList from "./getProjectFileList";
import IResource from "../../../../shared/types/resource.interface";
import uuid from "uuidv4";

export default async function syncDbWithFs(resourceFolderPath: string, store: Store) {
    console.log("syncDbWithFs", resourceFolderPath);
    const fileList: Array<IFile> = await getProjectFileList(resourceFolderPath);
    const resourceList: Array<IResource> = store.getResourceList();
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
    console.log("syncDbWithFs.newResourceList");
    console.log(newResourceList);
    store.setResourceList(newResourceList);
}
