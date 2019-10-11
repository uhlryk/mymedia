// src-backend/main.ts
import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import ChannelManager from "./ChannelManager";

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
});

app.on("window-all-closed", () => {
    app.quit();
});
