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

    @Input() allTagList: Array<ITag>;
    @Input() selectedTagList: Array<ITag>;
    @Output() changeTagList = new EventEmitter<Array<ITag>>();
    constructor() {}

    ngOnChanges() {
        console.log("TagSelectListComponent.ngOnChanges");
        this._selectedTagId = "0";
        this._availableTagList = this.allTagList.filter((allTag: ITag) => {
            return !this.selectedTagList.find(
                (selectedTag: TagModel) => selectedTag.id === allTag.id
            );
        });
    }
    addTag(selectedTagId) {
        console.log("TagSelectListComponent.addTag");
        const tag: TagModel = this.allTagList.find(
            (allTag: TagModel) => allTag.id === selectedTagId
        );
        this.changeTagList.emit(this.selectedTagList.concat([tag]));
    }

    onRemoveTag(tagId: string) {
        this.changeTagList.emit(
            this.selectedTagList.filter((selectedTag: TagModel) => selectedTag.id !== tagId)
        );
    }
}
