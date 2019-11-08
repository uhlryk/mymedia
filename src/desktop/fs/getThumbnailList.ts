import * as fse from "fs-extra";
import * as path from "path";

export default async function getThumbnailList(dir): Promise<Map<string, Array<string>>> {
    const map: Map<string, Array<string>> = new Map();
    const fileDirectoryList = await fse.readdir(dir);
    for (const fileDirectoryId of fileDirectoryList) {
        const fileDirectoryPath = path.resolve(dir, fileDirectoryId);
        let thumbnailList: Array<string> = await fse.readdir(fileDirectoryPath);
        thumbnailList = thumbnailList.map(thumbnail => {
            return "file://" + path.resolve(fileDirectoryPath, thumbnail);
        });
        map.set(fileDirectoryId, thumbnailList);
    }
    return map;
}
