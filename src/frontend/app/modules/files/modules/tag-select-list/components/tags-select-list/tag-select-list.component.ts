import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
import TagModel from "../../../../../../models/tag.model";

@Component({
    selector: "app-tag-select-list",
    templateUrl: "./tag-select-list.component.html",
    styleUrls: ["./tag-select-list.component.scss"]
})
export class TagSelectListComponent implements OnChanges {
    _selectedTagId: string;
    _availableTagList: Array<TagModel>;

    @Input() allTagList: Array<TagModel>;
    @Input() selectedTagList: Array<TagModel>;
    @Output() changeTagList = new EventEmitter<Array<TagModel>>();
    constructor() {}

    ngOnChanges() {
        console.log("TagSelectListComponent.ngOnChanges");
        this._selectedTagId = "0";
        this._availableTagList = this.allTagList.filter((allTag: TagModel) => {
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
