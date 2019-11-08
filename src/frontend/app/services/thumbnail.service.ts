import { Injectable, NgZone } from "@angular/core";
import { Observable } from "rxjs";
import IpcProvider from "../providers/ipc.provider";
import IpcProviderResourceEnums from "../../../shared/IpcProviderResourceEnums";
import ThumbnailChangeEventInterface from "../../../shared/types/thumbnailChangeEvent.interface";

@Injectable()
export class ThumbnailService {
    constructor(private _ngZone: NgZone) {}

    public onThumbnailChange(): Observable<ThumbnailChangeEventInterface> {
        return Observable.create(async observable => {
            IpcProvider.trigger(IpcProviderResourceEnums.RUN_THUMBNAIL_CHANGE);
            IpcProvider.listen(IpcProviderResourceEnums.ON_THUMBNAIL_CHANGE, (response: ThumbnailChangeEventInterface) => {
                this._ngZone.run(() => {
                    observable.next(response);
                });
            });
        });
    }
}

