import { IpcMainEvent } from "electron";
import IpcProviderLoaderEnums from "../shared/IpcProviderLoaderEnums";
export default class Loader {
    private _event: IpcMainEvent;
    constructor(event: IpcMainEvent) {
        this._event = event;
    }

    public setMessage(message) {
        this._event.reply(
            IpcProviderLoaderEnums.SET_LOADER_MESSAGE,
            message
        );
    }

    public setProgress(value) {
        this._event.reply(
            IpcProviderLoaderEnums.SET_PROGRESS,
            value
        );
    }
}
