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
        // this._selectedTagList = this.selectedTagList.slice();
        // this._selectedTagId = "0";
    }

    // get selectedTagId() {
    //     return this._selectedTagId;
    // }
    // get availableTagList() {
    //     return this._availableTagList;
    // }

    // get selectedTags() {
    //     this._selectedTagList = this.selectedTagList.filter((selectedTag: TagModel) => {
    //         return !!this.allTagList.find((allTag: TagModel) => {
    //             return allTag.getId() === selectedTag.getId();
    //         });
    //     });
    //     return this._selectedTagList;
    // }
    addTag(selectedTagId) {
        console.log("TagSelectListComponent.addTag");
        const tag: TagModel = this.allTagList.find(
            (allTag: TagModel) => allTag.id === selectedTagId
        );
        this.changeTagList.emit(this.selectedTagList.concat([tag]));
        // this._selectedTagId = selectedTagId;
        // if (this._selectedTagId && this._selectedTagId !== "0") {
        //     const selectedTagIndex: number = this._availableTagList.findIndex(
        //         (tag: TagModel) => tag.getId() === this._selectedTagId
        //     );
        //     const selectedTag: TagModel = this._availableTagList.splice(
        //         selectedTagIndex,
        //         1
        //     )[0];
        //     this._selectedTagId = "0";
        //     this._selectedTagList.push(selectedTag);
        //
        //     this.changeAddedTags.emit(this._selectedTagList);
        // }
    }

    onRemoveTag(tagId: string) {
        this.changeTagList.emit(
            this.selectedTagList.filter((selectedTag: TagModel) => selectedTag.id !== tagId)
        );
        //
        //
        //
        // const selectedTagIndex: number = this._selectedTagList.findIndex(
        //     (tag: TagModel) => tag.getId() === tagId
        // );
        // const selectedTag: TagModel = this._selectedTagList.splice(
        //     selectedTagIndex,
        //     1
        // )[0];
        // this._availableTagList.push(selectedTag);
        // this.changeAddedTags.emit(this._selectedTagList);
    }
}
