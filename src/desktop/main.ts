// src-backend/main.ts
import { app, BrowserWindow, ipcMain, Menu } from "electron";

import installExtension, { REDUX_DEVTOOLS } from "electron-devtools-installer";



import * as path from "path";
import AppManager from "./AppManager";
const contextMenu = require("electron-context-menu");
contextMenu({
    showInspectElement: true
});
const IS_HOT = process.env.IS_HOT;

let mainWindow: Electron.BrowserWindow;

app.on("ready", () => {
    mainWindow = new BrowserWindow({
        icon: path.join(__dirname, "../dist/assets/icon.png"),
        webPreferences: {
            webSecurity: false,
            nodeIntegration: true // Allows IPC and other APIs
        }
    });
    mainWindow.setMenuBarVisibility(false);
    Menu.setApplicationMenu(null);
    installExtension(REDUX_DEVTOOLS)
        .then(name => console.log(`Added Extension:  ${name}`))
        .catch(err => console.log("An error occurred: ", err));
    const appManager = new AppManager();
    if (IS_HOT) {
        mainWindow.loadURL("http://localhost:4200/");
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile(path.join(__dirname, "../frontend/index.html"));
    }
});

app.on("window-all-closed", () => {
    app.quit();
});
