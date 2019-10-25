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
        // "-nostats",
        // "-loglevel",
        // "panic",
        "-i",
        sourceFilePath,
        "-ss",
        "00:00:00.000",
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
        return "file://" + thumbnailFilePath;
    } else {
        console.log("Thumbnail doesn't exist");
        return null;
    }
}
