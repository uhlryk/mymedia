import * as fse from "fs-extra";
import * as path from "path";
import { spawn } from "child_process";
import * as ffprobe from "ffprobe-static-electron";

export default async function getVideoLength(sourceFilePath) {
    const childProcess = spawn(ffprobe.path, [
        "-v",
        "error",
        "-show_entries",
        "format=duration",
        "-of",
        "default=noprint_wrappers=1:nokey=1",
        sourceFilePath
    ]);
    const length = await new Promise((resolve, reject) => {
        let length;
        childProcess.stdout.on("data", data => {
            console.log(`MMM stdout: ${data}`);
            length = data;
        });

        childProcess.stderr.on("data", data => {
            // console.error(`stderr: ${data}`);
        });

        childProcess.on("close", code => {
            if (code === 0) {
                // console.log("conversion successful");
                resolve(length);
            } else {
                reject();
            }
        });
    });
    return length.toString();
}
