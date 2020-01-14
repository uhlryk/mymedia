import { Injectable, NgZone } from "@angular/core";
import { Observable } from "rxjs";
import IpcProvider from "../providers/ipc.provider";
import IpcProviderResourceEnums from "../../../shared/IpcProviderResourceEnums";

@Injectable({
    providedIn: "root"
})
export class AppMenuService {
    constructor(private _ngZone: NgZone) {}

    listenProjectButton(): Observable<void> {
        return Observable.create(async observable => {
            IpcProvider.listen(IpcProviderResourceEnums.TRIGGER_SET_PROJECT, () => {
                this._ngZone.run(() => {
                    observable.next();
                });
            });
        });
    }

    listenTagsManagerButton(): Observable<void> {
        return Observable.create(async observable => {
            IpcProvider.listen(IpcProviderResourceEnums.TRIGGER_TAGS_MANAGER, () => {
                this._ngZone.run(() => {
                    observable.next();
                });
            });
        });
    }
}
