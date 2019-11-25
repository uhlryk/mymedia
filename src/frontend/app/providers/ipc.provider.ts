import IpcDataInterface from "../../../shared/IpcData.interface";

const { ipcRenderer } = (<any>window).electron;
export default class IpcProvider {
    static async request(
        channel: string,
        payload: { [key: string]: any } = null
    ): Promise<any> {
        const responseChannel: string = channel + Math.floor(Math.random() * 1000);
        return await new Promise(resolve => {
            ipcRenderer.once(responseChannel, (event, response: any) => {
                resolve(response);
            });
            const data: IpcDataInterface = {
                payload: payload,
                responseChannel: responseChannel
            };
            ipcRenderer.send(channel, data);
        });
    }
    static trigger(channel: string, payload: { [key: string]: any } = null): void {
        const data: IpcDataInterface = {
            payload: payload,
            responseChannel: null
        };
        ipcRenderer.send(channel, data);
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
