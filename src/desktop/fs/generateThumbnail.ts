import * as fse from "fs-extra";
import { spawn } from "child_process";
import * as ffmpeg from "ffmpeg-static-electron";

export default async function generateThumbnail(sourceFilePath, targetThumbnailPath) {
    // const thumbnailFilePath = path.resolve(thumbnailFolderPath, thumbnailFileName);
    // const isThumbnailFolderExist = await fse.pathExists(thumbnailFolderPath);
    // if (!isThumbnailFolderExist) {
    //     await fse.mkdir(thumbnailFolderPath);
    // }
    const childProcess = spawn(ffmpeg.path, [
        // "-nostats",
        // "-loglevel",
        // "panic",
        "-i",
        sourceFilePath,
        "-ss",
        "00:00:00.000",
        // 5,
        "-vframes",
        "1",
        // "-q:v",
        // "2",
        // "-s",
        // "480x320",
        targetThumbnailPath
    ]);
    await new Promise((resolve, reject) => {
        // childProcess.on("exit", statusCode => {
        //     console.log("exit", statusCode);
        // });
        // childProcess.stderr.on("data", err => {
        //     console.log("STERR DATA", String(err));
        // });
        // childProcess.stdout.on("data", data => {
        //     console.log("STOUT DATA", data);
        // });

        childProcess.on("close", code => {
            console.log("CLOSE", code);
            if (code === 0) {
                // console.log("conversion successful");
                resolve();
            } else {
                reject();
            }
        });
    });

    console.log("Thumbnail should be ready");
    const isThumbnailFile = await fse.pathExists(targetThumbnailPath);
    if (isThumbnailFile) {
        return "file://" + targetThumbnailPath;
    } else {
        console.log("Thumbnail doesn't exist");
        return null;
    }
}
