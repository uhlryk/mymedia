import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "app-file-size",
    template: "<span>{{_size}}</span>",
    styleUrls: ["./file-size.component.scss"]
})
export class FileSizeComponent implements OnInit {
    _size: string;

    static humanFileSize(bytes) {
        const thresh = 1000;
        if (Math.abs(bytes) < thresh) {
            return bytes + " B";
        }
        const units = ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
        let u = -1;
        do {
            bytes /= thresh;
            ++u;
        } while (Math.abs(bytes) >= thresh && u < units.length - 1);
        return bytes.toFixed(1) + " " + units[u];
    }

    @Input("size")
    set size(value) {
        if (Number.isInteger(value)) {
            this._size = FileSizeComponent.humanFileSize(value);
        } else {
            this._size = "xxx";
        }
    }

    constructor() {}

    ngOnInit() {}
}
