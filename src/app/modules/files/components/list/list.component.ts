import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import ResourceModel from "../../../../models/resource.model";

@Component({
    selector: "app-list",
    templateUrl: "./list.component.html",
    styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit {
    @Input() resourceList: Array<ResourceModel>;
    @Output() openFile = new EventEmitter<string>();
    @Output() showDetails = new EventEmitter<string>();

    constructor() {}

    ngOnInit() {
        console.log("BBBB");
        console.log(this.resourceList);
    }

    clickOpenFile(resourceId: string) {
        this.openFile.emit(resourceId);
    }
    clickShowDetails(resourceId: string) {
        this.showDetails.emit(resourceId);
    }
}
