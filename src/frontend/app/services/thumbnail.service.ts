import {Injectable, NgZone} from "@angular/core";
import {Observable} from "rxjs";

@Injectable()
export class ThumbnailService {
    constructor(private _ngZone: NgZone) {}

    public getThumbnail(resource): Observable<string> {
        return Observable.create(async observable => {
            const thumbnail = await resource.getThumbnail();

            this._ngZone.run(() => {
                observable.next(thumbnail);
                observable.complete();
            });
        });
    }
}

