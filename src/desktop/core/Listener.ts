import { ipcMain, IpcMainEvent } from "electron";
import Reply from "./Reply";
import Loader from "./Loader";
import IpcDataInterface from "../../shared/IpcData.interface";

export default class Listener {
    public static on(channel: string, listener: ListenerCallback) {
        ipcMain.on(channel, async (event: IpcMainEvent, data: IpcDataInterface) => {
            const reply = new Reply(event, data.responseChannel);
            listener({
                reply: reply,
                data: data.payload,
                loader: new Loader(event)
            });
        });
    }
    public static removeAllListeners(channel: string) {
        ipcMain.removeAllListeners(channel);
    }
}

type ListenerCallback = (context: Context) => void;

export interface Context {
    reply: Reply;
    loader: Loader;
    data: {
        [key: string]: any;
    };
}
