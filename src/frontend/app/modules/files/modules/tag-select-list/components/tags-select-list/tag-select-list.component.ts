import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
import TagModel from "../../../../../../models/tag.model";
import ITag from "../../../../../../../../shared/types/tag.interface";

@Component({
    selector: "app-tag-select-list",
    templateUrl: "./tag-select-list.component.html",
    styleUrls: ["./tag-select-list.component.scss"]
})
export class TagSelectListComponent implements OnChanges {
    _selectedTagId: string;
    _availableTagList: Array<ITag>;
    _selectedTagList: Array<ITag>;

    @Input() allTagList: Array<ITag>;
    @Input() selectedTagIdList: Array<string>;
    @Output() changeTagList = new EventEmitter<Array<string>>();
    constructor() {}

    ngOnChanges() {
        console.log("TagSelectListComponent.ngOnChanges");
        this._selectedTagId = "0";
        this._availableTagList = this.allTagList.filter((allTag: ITag) => {
            return !this.selectedTagIdList.find(
                (selectedTagId: string) => selectedTagId === allTag.id
            );
        });
        this._selectedTagList = this.allTagList.filter((allTag: ITag) => {
            return this.selectedTagIdList.find(
                (selectedTagId: string) => selectedTagId === allTag.id
            );
        });
    }
    addTag(selectedTagId) {
        this.changeTagList.emit(this._selectedTagList.map((tag: ITag)  => tag.id).concat(selectedTagId));
    }

    onRemoveTag(tagId: string) {
        this.changeTagList.emit(
            this._selectedTagList.map((tag: ITag)  => tag.id).filter((selectedTagId: string) => selectedTagId !== tagId)
        );
    }
}
