import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
import ResourceModel from "../../../../models/resource.model";
import Tag from "../../../../types/tag.type";
import TagModel from "../../../../models/tag.model";

@Component({
    selector: "app-list",
    templateUrl: "./list.component.html",
    styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit, OnChanges {
    @Input() resourceList: Array<ResourceModel>;
    @Input() searchText: string;
    @Input() searchTagList: Array<Tag>;
    @Output() clickThumbnail = new EventEmitter<string>();
    @Output() clickDetailsButton = new EventEmitter<string>();

    _resourceList: Array<CardResource>;
    constructor() {}

    ngOnInit() {}

    ngOnChanges() {
        console.log("ListComponent.ngOnChanges");
        this._resourceList = this.resourceList
            .filter(resource => {
                if (
                    resource
                        .getTitle()
                        .toLowerCase()
                        .includes(this.searchText.toLowerCase())
                ) {
                    if (this.searchTagList.length) {
                        const modelTagList: Array<
                            TagModel
                        > = resource.getResourceTagModelList();
                        return this.searchTagList.every(
                            (searchTag: Tag) =>
                                !!modelTagList.find(
                                    (modelTag: TagModel) =>
                                        modelTag.getId() === searchTag.id
                                )
                        );
                    }
                    return true;
                }
            })
            .map((resource: ResourceModel) => ({
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
