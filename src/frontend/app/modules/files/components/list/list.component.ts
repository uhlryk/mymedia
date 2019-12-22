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
        console.log("AAAAAAAA1");
        console.log(this.resourceList);
    }

    get _resourceList() {
        return this.resourceList.map((resource: ResourceModel) => ({
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
        this.openFile.emit(resourceId);
    }
    onClickDetailsButton(resourceId: string) {
        this.showDetails.emit(resourceId);
    }
}
