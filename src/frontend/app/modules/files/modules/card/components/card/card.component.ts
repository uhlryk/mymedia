import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import ResourceModel from "../../../../../../models/resource.model";
import TagModel from "../../../../../../models/tag.model";

@Component({
    selector: "app-card",
    templateUrl: "./card.component.html",
    styleUrls: ["./card.component.scss"]
})
export class CardComponent implements OnInit {
    @Input() resource: ResourceModel;
    @Output() openDetailsModal = new EventEmitter<string>();
    @Output() executeMedia = new EventEmitter<string>();
    _tagList: Array<TagModel>;
    constructor() {}

    ngOnInit() {
        this._tagList = this.resource.getResourceTagModelList();
    }

    clickOpenDetails() {
        this.openDetailsModal.emit(this.resource.getId());
    }

    clickExecuteMedia() {
        this.executeMedia.emit(this.resource.getId());
    }
}
