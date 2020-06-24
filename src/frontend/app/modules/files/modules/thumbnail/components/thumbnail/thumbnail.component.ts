import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

@Component({
    selector: "app-thumbnail",
    templateUrl: "./thumbnail.component.html",
    styleUrls: ["./thumbnail.component.scss"]
})
export class ThumbnailComponent implements OnInit {
    @Input() thumbnailPath: string;
    constructor() {}

    ngOnInit() {}
}
