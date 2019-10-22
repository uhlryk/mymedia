import { Injectable } from "@angular/core";
import {Observable, Observer} from "rxjs";

@Injectable()
export class LoaderService {
    private _observer: Observer<boolean>;
    constructor() {}

    waitForStatus(): Observable<boolean> {
        return new Observable(observer => {
            this._observer = observer;
        });
    }

    show() {
        this._observer.next(true);
    }
    hide() {
        this._observer.next(false);
    }
}
