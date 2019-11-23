// src-backend/main.ts
import { app, BrowserWindow, ipcMain, Menu } from "electron";
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
    const appManager = new AppManager(mainWindow);
    if (IS_HOT) {
        mainWindow.loadURL("http://localhost:4200/");
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile(path.join(__dirname, "../frontend/index.html"));
    }

    const menu = Menu.buildFromTemplate([
        {
            label: "Project",
            submenu: [
                { label: "Create",
                    click() {
                        appManager.triggetCreateProject();
                    }
                },
                { label: "Open" },
                {
                    label: "Exit",
                    click() {
                        app.quit();
                    }
                }
            ]
        },
        {
            label: "Files",
            submenu: [{ label: "Reload" }]
        }
    ]);
    Menu.setApplicationMenu(menu);
});

app.on("window-all-closed", () => {
    app.quit();
});
