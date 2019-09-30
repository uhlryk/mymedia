import { Component, Input, OnInit } from "@angular/core";
import ResourceModel from "../../../../models/resource.model";

@Component({
    selector: "[app-row]",
    templateUrl: "./row.component.html",
    styleUrls: ["./row.component.scss"]
})
export class RowComponent implements OnInit {
    @Input() resource: ResourceModel;
    constructor() {}

    ngOnInit() {}
}
