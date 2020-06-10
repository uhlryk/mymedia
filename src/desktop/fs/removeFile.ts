import * as fse from "fs-extra";
import * as path from "path";

export default async function removeFile(
    folderPath: string,
    fileName: string
): Promise<boolean> {
    const filePath = path.resolve(folderPath, fileName);
    try {
        await fse.unlink(filePath);
    } catch (e) {
        // TODO: handle this and show message to end user
        console.log("Error during removing file");
    }
    return true;
}
