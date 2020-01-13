import * as fse from "fs-extra";
import * as path from "path";

export default async function removeFolder(folderToRemove: string): Promise<void> {
    return fse.remove(folderToRemove);
}
