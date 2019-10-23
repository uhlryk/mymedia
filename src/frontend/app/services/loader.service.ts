import { Injectable } from "@angular/core";
import { Observable, Observer } from "rxjs";

@Injectable()
export class LoaderService {
    private _observer: Observer<ILoaderStatus>;
    private status: ILoaderStatus;
    constructor() {
        this.status = new LoaderStatus();
    }

    public waitForStatus(): Observable<ILoaderStatus> {
        return new Observable(observer => {
            this._observer = observer;
        });
    }

    public show() {
        this.status.showLoader = true;
        this._observer.next(this.status);
    }
    public showMessage(message: string) {
        this.status.showLoader = true;
        this.status.showMessage = true;
        this.status.message = message;
        this._observer.next(this.status);
    }
    public hide() {
        this.status = new LoaderStatus();
        this._observer.next(this.status);
    }

    private listenForBackendChanges() {

    }

}

class LoaderStatus implements ILoaderStatus {
    message: "";
    progressValue: 0;
    showLoader: false;
    showMessage: false;
    showProgressBar: false;
}

export interface ILoaderStatus {
    showLoader: boolean;
    showMessage: boolean;
    message: string;
    showProgressBar: boolean;
    progressValue: number;
}
