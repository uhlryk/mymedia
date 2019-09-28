import { ipcRenderer } from "electron";

export default class IpcProvider {
    public async request(channel: string, ...args: any[]) {
        const responseChannel: string = channel + Math.floor(Math.random() * 1000);
        return new Promise(resolve => {
            ipcRenderer.once(responseChannel, (event, ...response: any[]) => {
                resolve(...response);
            });
            ipcRenderer.send(channel, responseChannel, ...args);
        });
    }
}
