import * as fse from "fs-extra";
import * as path from "path";
import { spawn } from "child_process";
import * as ffprobe from "ffprobe-static-electron";

interface Metadata {
    width: string;
    height: string;
    duration: string;
}
export default async function getMetadata(sourceFilePath): Promise<Metadata> {
    const childProcess = spawn(ffprobe.path, [
        "-v",
        "error",
        "-show_entries",
        "stream=width,height,duration",
        "-of",
        "default=noprint_wrappers=1:nokey=1",
        sourceFilePath
    ]);
    return await new Promise((resolve, reject) => {
        const _metadata: Metadata = {
            width: "",
            height: "",
            duration: ""
        };
        childProcess.stdout.on("data", (data: string) => {
            const dataArray = data.toString().split(/[^0-9.]/g);
            _metadata.width = dataArray[0];
            _metadata.height = dataArray[1];
            _metadata.duration = dataArray[2];
        });

        childProcess.stderr.on("data", data => {
            // console.error(`stderr: ${data}`);
        });

        childProcess.on("close", code => {
            if (code === 0) {
                resolve(_metadata);
            } else {
                reject();
            }
        });
    });
}
