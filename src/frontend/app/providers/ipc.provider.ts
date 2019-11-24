const { ipcRenderer } = (<any>window).electron;
export default class IpcProvider {
    static async request(channel: string, params?: any): Promise<any> {
        const responseChannel: string = channel + Math.floor(Math.random() * 1000);
        return await new Promise(resolve => {
            ipcRenderer.once(responseChannel, (event, response: any) => {
                resolve(response);
            });
            ipcRenderer.send(channel, responseChannel, params);
        });
    }
    static trigger(channel: string, params?: any): void {
        ipcRenderer.send(channel, "", params);
    }

    static listen(channel: string, callback: (response: any) => void): RemoveListener {
        const listener = (event, mainProcessResponse) => {
            callback(mainProcessResponse);
        };
        ipcRenderer.on(channel, listener);
        return () => {
            ipcRenderer.removeListener(channel, listener);
        };
    }
}
export type RemoveListener = () => void;
