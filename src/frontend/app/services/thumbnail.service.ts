import { Injectable, NgZone } from "@angular/core";
import { Observable } from "rxjs";
import IpcProvider from "../providers/ipc.provider";
import IpcProviderResourceEnums from "../../../shared/IpcProviderResourceEnums";
import IThumbnailChangeEvent from "../../../shared/types/thumbnailChangeEvent.interface";

@Injectable()
export class ThumbnailService {
    constructor(private _ngZone: NgZone) {}

    public onThumbnailChange(): Observable<IThumbnailChangeEvent> {
        return Observable.create(async observable => {
            IpcProvider.listen(IpcProviderResourceEnums.ON_THUMBNAIL_CHANGE, (response: IThumbnailChangeEvent) => {
                this._ngZone.run(() => {
                    observable.next(response);
                });
            });
            IpcProvider.trigger(IpcProviderResourceEnums.RUN_THUMBNAIL_CHANGE);
        });
    }
}

