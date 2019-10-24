import * as fse from "fs-extra";

export default async function getThumbnail(thumbnailFilePath: string): Promise<string> {
    const isThumbnailFilePathExist = await fse.pathExists(thumbnailFilePath);
    if (isThumbnailFilePathExist) {
        console.log("Thumbnail file exist", thumbnailFilePath);
        return "file://" + thumbnailFilePath;
    }
    console.log("Thumbnail doesn't file exist", thumbnailFilePath);
    return null;
}
