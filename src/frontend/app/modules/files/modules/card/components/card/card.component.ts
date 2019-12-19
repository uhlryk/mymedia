import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import ResourceModel from "../../../../../../models/resource.model";
import TagModel from "../../../../../../models/tag.model";
import { TagModel as TagComponentModel } from "../../../tag-list/components/tag-list/tag-list.component";
@Component({
    selector: "app-card",
    templateUrl: "./card.component.html",
    styleUrls: ["./card.component.scss"]
})
export class CardComponent implements OnInit {
    @Input() resource: ResourceModel;
    @Output() openDetailsModal = new EventEmitter<string>();
    @Output() executeMedia = new EventEmitter<string>();
    constructor() {}

    ngOnInit() {
    }

    clickOpenDetails() {
        this.openDetailsModal.emit(this.resource.getId());
    }

    clickExecuteMedia() {
        this.executeMedia.emit(this.resource.getId());
    }

    get tagList(): Array<TagComponentModel> {
        return this.resource.getResourceTagModelList().map((tagModel: TagModel) => ({
            id: tagModel.getId(),
            name: tagModel.getName()
        }));
    }
}
