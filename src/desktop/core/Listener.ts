import { ipcMain, IpcMainEvent } from "electron";
import Reply from "./Reply";
import Loader from "./Loader";

export default class Listener {
    public static on(channel: string, listener: ListenerCallback) {
        ipcMain.on(
            channel,
            async (event: IpcMainEvent, responseChannel: string, ...args: any[]) => {
                const reply = new Reply(event, responseChannel);
                listener({
                    reply: reply,
                    data: args,
                    loader: new Loader(event)
                });
            }
        );
    }
    public static removeAllListeners(channel: string) {
        ipcMain.removeAllListeners(channel);
    }
}

type ListenerCallback = (context: Context) => void;

interface Context {
    reply: Reply;
    loader: Loader;
    data: any[];
}
