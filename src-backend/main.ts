// src-backend/main.ts
import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import { spawn } from "child_process";
import * as ffmpeg from "ffmpeg-static-electron";
import ChannelManager from "./ChannelManager";
console.log(ffmpeg.path);

const IS_HOT = process.env.IS_HOT;
console.log(IS_HOT);

let mainWindow: Electron.BrowserWindow;

app.on("ready", () => {
    new ChannelManager();
    mainWindow = new BrowserWindow({
        icon: path.join(__dirname, "../dist/assets/icon.png"),
        webPreferences: {
            nodeIntegration: true // Allows IPC and other APIs
        }
    });
    if (IS_HOT) {
        mainWindow.loadURL("http://localhost:4200/");
    } else {
        mainWindow.loadFile(path.join(__dirname, "../frontend/index.html"));
    }

    ipcMain.on("ping", event => {
        console.log("ping");
        let res = spawn(ffmpeg.path, [
            "-i",
            "path//to/video",
            "-ss",
            "00:00:01.000",
            "-vframes",
            "1",
            "output.png"
        ]);
        res.on("exit", statusCode => {
            if (statusCode === 0) {
                console.log("conversion successful");
            }
        });

        res.stderr.on("data", err => {
            console.log("err:", new String(err));
        });
    });
});

app.on("window-all-closed", () => {
    app.quit();
});
