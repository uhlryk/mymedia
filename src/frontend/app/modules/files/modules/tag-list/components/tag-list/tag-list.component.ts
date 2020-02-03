import { Component, Input, OnChanges, OnInit } from "@angular/core";
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
        this._resourceTagList = (this.resourceTagIdList || []).map((tagId: string) =>
            this.projectTagList.find((tag: ITag) => tag.id === tagId)
        ).filter((tag: ITag) => tag);
    }
}
