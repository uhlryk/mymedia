import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
import ResourceModel from "../../../../models/resource.model";
import TagModel from "../../../../models/tag.model";

@Component({
    selector: "app-row",
    templateUrl: "./row.component.html",
    styleUrls: ["./row.component.scss"]
})
export class RowComponent implements OnInit, OnChanges {
    @Input() resource: ResourceModel;
    @Output() openDetailsModal = new EventEmitter<string>();
    @Output() executeMedia = new EventEmitter<string>();
    private _tagList: Array<TagModel>;
    constructor() {}

    ngOnInit() {}

    ngOnChanges() {
        this._tagList = this.resource.getResourceTagModelList().slice(0, 4);
    }
    clickOpenDetails() {
        this.openDetailsModal.emit(this.resource.getId());
    }

    clickExecuteMedia() {
        this.executeMedia.emit(this.resource.getId());
    }
}
