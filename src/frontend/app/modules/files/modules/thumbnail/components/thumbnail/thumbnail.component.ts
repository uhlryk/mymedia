import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "app-thumbnail",
    templateUrl: "./thumbnail.component.html",
    styleUrls: ["./thumbnail.component.scss"]
})
export class ThumbnailComponent implements OnInit {
    @Input() thumbnailPath: string;
    constructor() {}

    ngOnInit() {
        if (Math.random() < 0.5) {
            this.thumbnailPath = null;
        }
    }
}
