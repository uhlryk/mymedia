import { ipcRenderer } from "electron";

export default class IpcProvider {
    static async request(channel: string, ...args: any[]) {
        const responseChannel: string = channel + Math.floor(Math.random() * 1000);
        return await new Promise(resolve => {
            ipcRenderer.once(responseChannel, (event, ...response: any[]) => {
                resolve(...response);
            });
            ipcRenderer.send(channel, responseChannel, ...args);
        });
    }
}