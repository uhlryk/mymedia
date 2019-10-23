import * as fse from "fs-extra";
import * as path from "path";
import { spawn } from "child_process";
import * as ffmpeg from "ffmpeg-static-electron";

export default async function generateThumbnail(
    sourceFilePath,
    thumbnailFolderPath,
    thumbnailFileName
) {
    const thumbnailFilePath = path.resolve(thumbnailFolderPath, thumbnailFileName);
    const isThumbnailFolderExist = await fse.pathExists(thumbnailFolderPath);
    if (!isThumbnailFolderExist) {
        await fse.mkdir(thumbnailFolderPath);
    }
    const childProcess = spawn(ffmpeg.path, [
        "-nostats",
        "-loglevel",
        "panic",
        "-i",
        sourceFilePath,
        "-ss",
        "00:00:05.000",
        "-vframes",
        "1",
        // "-q:v",
        // "2",
        // "-s",
        // "480x320",
        thumbnailFilePath
    ]);
    await new Promise((resolve, reject) => {
        childProcess.on("exit", statusCode => {
            if (statusCode === 0) {
                console.log("conversion successful");
                resolve();
            }
        });

        childProcess.stderr.on("data", err => {
            console.log("=============");
            console.log(String(err));
        });
    });

    console.log("Thumbnail should be ready");
    const isThumbnailFile = await fse.pathExists(thumbnailFilePath);
    if (isThumbnailFile) {
        console.log("Thumbnail exist");
        const fileBuffer: Buffer = await fse.readFile(thumbnailFilePath);
        return "data:image/jpg;base64," + fileBuffer.toString("base64");
    } else {
        console.log("Thumbnail doesn't exist");
        return null;
    }
}
