import { Injectable } from "@angular/core";
import { Observable, Observer } from "rxjs";
import IpcProvider from "../providers/ipc.provider";
import IpcProviderResourceEnums from "../../../shared/IpcProviderResourceEnums";
@Injectable()
export class LoaderService {
    private _observer: Observer<ILoaderStatus>;
    private status: ILoaderStatus;
    constructor() {
        this.status = new LoaderStatus();
        this.listenForBackendChanges();
    }

    public waitForStatus(): Observable<ILoaderStatus> {
        return new Observable(observer => {
            this._observer = observer;
        });
    }

    public show() {
        this.status = new LoaderStatus();
        this.status.showLoader = true;
        this._observer.next(this.status);
    }
    public showMessage(message: string) {
        console.log("showMessage 1", message);
        this.status.showLoader = true;
        this.status.showMessage = true;
        this.status.message = message;
        console.log("showMessage 2", message);
        this._observer.next(this.status);
    }
    public showSpinner() {
        this.status.showProgressBar = false;
        this.status.progressValue = 0;
        this._observer.next(this.status);
    }
    public showProgress(value) {
        this.status.showProgressBar = true;
        this.status.progressValue = value;
        this._observer.next(this.status);
    }
    public hide() {
        this.status = new LoaderStatus();
        this._observer.next(this.status);
    }

    private listenForBackendChanges() {
        IpcProvider.listen(IpcProviderResourceEnums.SET_LOADER_MESSAGE, message => {
            this.showMessage(message);
        });
    }
}

class LoaderStatus implements ILoaderStatus {
    message: "";
    showLoader: false;
    showMessage: false;
    showProgressBar: false;
    progressValue: 0;
}

export interface ILoaderStatus {
    showLoader: boolean;
    showMessage: boolean;
    message: string;
    showProgressBar: boolean;
    progressValue: number;
}
