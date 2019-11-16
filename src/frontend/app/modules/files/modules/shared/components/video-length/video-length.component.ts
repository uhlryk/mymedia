import { Component, Input, OnInit } from "@angular/core";
import secondsToTime from "../../../../../../../../shared/helpers/secondsToTime";
@Component({
    selector: "app-video-length",
    template: "<span>{{_timeLength}}</span>",
    styleUrls: ["./video-length.component.scss"]
})
export class VideoLengthComponent implements OnInit {
    constructor() {}
    private _timeLength: string;
    @Input("length")
    set length(value) {
        if (Number.isInteger(value)) {
            this._timeLength = secondsToTime(value);
        } else {
            this._timeLength = "xxx";
        }
    }

    ngOnInit() {}
}
