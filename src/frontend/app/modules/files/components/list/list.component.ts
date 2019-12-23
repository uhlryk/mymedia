import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
import ResourceModel from "../../../../models/resource.model";
import Tag from "../../../../types/tag.type";

@Component({
    selector: "app-list",
    templateUrl: "./list.component.html",
    styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit, OnChanges {
    @Input() resourceList: Array<ResourceModel>;
    @Output() clickThumbnail = new EventEmitter<string>();
    @Output() clickDetailsButton = new EventEmitter<string>();

    _resourceList: Array<CardResource>;
    constructor() {}

    ngOnInit() {
    }

    ngOnChanges() {
        console.log("ListComponent.ngOnChanges");
        this._resourceList = this.resourceList.map((resource: ResourceModel) => ({
            id: resource.getId(),
            ranking: resource.ranking,
            title: resource.getTitle(),
            thumbnailPath: resource.thumbnailPath,
            isNew: resource.isNew(),
            tagList: resource.getResourceTagModelList().map(tagModel => ({
                id: tagModel.getId(),
                name: tagModel.getName()
            }))
        }));
    }

    onClickThumbnail(resourceId: string) {
        this.clickThumbnail.emit(resourceId);
    }
    onClickDetailsButton(resourceId: string) {
        this.clickDetailsButton.emit(resourceId);
    }
}

interface CardResource {
    id: string;
    ranking: number;
    title: string;
    thumbnailPath: string;
    isNew: boolean;
    tagList: Array<Tag>;
}
