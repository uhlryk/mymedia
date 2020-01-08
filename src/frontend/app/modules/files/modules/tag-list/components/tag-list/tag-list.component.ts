import { Component, Input, OnChanges, OnInit } from "@angular/core";
import TagModel from "../../../../../../models/tag.model";
import ITag from "../../../../../../../../shared/types/tag.interface";

@Component({
    selector: "app-tag-list",
    templateUrl: "./tag-list.component.html",
    styleUrls: ["./tag-list.component.scss"]
})
export class TagListComponent implements OnChanges {
    @Input() projectTagList: Array<ITag>;
    @Input() resourceTagIdList: Array<string>;

    _resourceTagList: Array<ITag> = [];
    constructor() {}

    ngOnChanges() {
        this._resourceTagList = (this.projectTagList || []).filter((tag: ITag) =>
            this.resourceTagIdList.includes(tag.id)
        )
    }
}
