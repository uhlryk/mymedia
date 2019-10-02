import { Injectable, NgZone } from "@angular/core";
import { Observable } from "rxjs";
import { Subscriber } from "rxjs/src/internal/Subscriber";
import ResourceModel from "../models/resource.model";

@Injectable()
export class ThumbnailService {
    private _isRunning: boolean = false;
    private _list: Array<ThumbnailRequest> = [];
    constructor(private _ngZone: NgZone) {}

    public getThumbnail(resource): Observable<string> {
        return Observable.create(async observable => {
            this._list.push({
                callback: thumbnail => {
                    this._ngZone.run(() => {
                        observable.next(thumbnail);
                        observable.complete();
                    });
                },
                resource
            });
            console.log("Add request to queue ", resource.getTitle());
            await this.run();
        });
    }

    private async run() {
        if (!this._isRunning) {
            this._isRunning = true;
            while (this._list[0]) {
                const request: ThumbnailRequest = this._list.shift();
                console.log("Start request for ", request.resource.getTitle());
                const thumbnail = await request.resource.getThumbnail();
                console.log("Finish request for ", request.resource.getTitle());
                request.callback(thumbnail);
            }
            this._isRunning = false;
        }
    }
}

interface ThumbnailRequest {
    callback: Function;
    resource: ResourceModel;
}
