import { Injectable } from "@angular/core";
import { Observable, Observer } from "rxjs";

@Injectable()
export class LoaderService {
    private _observer: Observer<ILoaderStatus>;
    private status: ILoaderStatus;
    constructor() {
        this.status = new LoaderStatus();
    }

    waitForStatus(): Observable<ILoaderStatus> {
        return new Observable(observer => {
            this._observer = observer;
        });
    }

    show() {
        this.status.showLoader = true;
        this._observer.next(this.status);
    }
    showMessage(message: string) {
        this.status.showLoader = true;
        this.status.showMessage = true;
        this.status.message = message;
        this._observer.next(this.status);
    }
    hide() {
        this.status = new LoaderStatus();
        this._observer.next(this.status);
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
