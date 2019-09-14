import { Component, Input, OnInit } from "@angular/core";
import File from "../../../../types/File";

@Component({
    selector: "[app-row]",
    templateUrl: "./row.component.html",
    styleUrls: ["./row.component.scss"]
})
export class RowComponent implements OnInit {
    @Input() file: File;
    constructor() {}

    ngOnInit() {}
}
