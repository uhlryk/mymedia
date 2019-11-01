import { Injectable } from "@angular/core";
import { Observable, Observer } from "rxjs";
import IpcProvider from "../providers/ipc.provider";
import IpcProviderLoaderEnums from "../../../shared/IpcProviderLoaderEnums";
import { NgZone } from "@angular/core";
@Injectable()
export class LoaderService {
    private _observer: Observer<ILoaderStatus>;
    private status: ILoaderStatus;
    private cachedTime = 0;
    constructor(private _ngZone: NgZone) {
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
        this.cachedTime = 0;
        this.status.showLoader = true;
        this._observer.next(this.status);
    }
    public showMessage(message: string) {
        this.status.showLoader = true;
        this.status.showMessage = true;
        this.status.message = message;
        this._observer.next(this.status);
    }
    public showSpinner() {
        this.status.showLoader = true;
        this.status.showProgressBar = false;
        this.status.progressValue = 0;
        this._observer.next(this.status);
    }
    public showProgress(value) {
        console.log("AAAA2");
        if (value === 0 || value === 100 || this.cachedTime + 3000 <= Date.now()) {
            this.status.showLoader = true;
            this.status.showProgressBar = true;
            this.status.progressValue = value;
            this.cachedTime = Date.now();
            this._observer.next(this.status);
        }
    }
    public hide() {
        console.log("AAAA1");
        this.cachedTime = 0;
        this.status = new LoaderStatus();
        this._observer.next(this.status);
    }

    private listenForBackendChanges() {
        IpcProvider.listen(IpcProviderLoaderEnums.SET_LOADER_MESSAGE, message => {
            this._ngZone.run(() => {
                this.showMessage(message);
            });
        });
        IpcProvider.listen(IpcProviderLoaderEnums.SET_PROGRESS, value => {
            this._ngZone.run(() => {
                this.showProgress(value);
            });
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
