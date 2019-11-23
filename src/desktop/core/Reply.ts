import { IpcMainEvent } from "electron";

export default class Reply {
    private _event: IpcMainEvent;
    private _responseChannel: string;
    constructor(_event: IpcMainEvent, responseChannel: string) {
        this._event = _event;
        this._responseChannel = responseChannel;
    }

    send(message?: any) {
        this._event.reply(this._responseChannel, message);
    }
}
