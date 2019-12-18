import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
import TagModel from "../../../../../../models/tag.model";

@Component({
    selector: "app-tag-select-list",
    templateUrl: "./tag-select-list.component.html",
    styleUrls: ["./tag-select-list.component.scss"]
})
export class TagSelectListComponent implements OnChanges {
    private _selectedTagId: string;
    private _availableTagList: Array<TagModel>;
    private _selectedTagList: Array<TagModel>;

    @Input() allTagList: Array<TagModel>;
    @Input() selectedTagList: Array<TagModel>;
    /**
     * Returns list of added Tags
     */
    @Output() changeAddedTags = new EventEmitter<Array<TagModel>>();
    constructor() {}

    ngOnChanges() {
        this._selectedTagId = "0";
        this._availableTagList = this.allTagList.filter((allTag: TagModel) => {
            return !this.selectedTagList.find(
                (selectedTag: TagModel) => selectedTag.getId() === allTag.getId()
            );
        });
        this._selectedTagList = this.selectedTagList.slice();
        this._selectedTagId = "0";
    }

    get selectedTagId() {
        return this._selectedTagId;
    }
    get availableTagList() {
        return this._availableTagList;
    }

    get selectedTags() {
        console.log("QQQQQQQ");
        console.log(this.selectedTagList);
        this._selectedTagList = this.selectedTagList.filter((selectedTag: TagModel) => {
            return !!this.allTagList.find((allTag: TagModel) => {
                return allTag.getId() === selectedTag.getId();
            });
        });
        return this._selectedTagList;
    }
    addTag(selectedTagId) {
        this._selectedTagId = selectedTagId;
        if (this._selectedTagId && this._selectedTagId !== "0") {
            const selectedTagIndex: number = this._availableTagList.findIndex(
                (tag: TagModel) => tag.getId() === this._selectedTagId
            );
            const selectedTag: TagModel = this._availableTagList.splice(
                selectedTagIndex,
                1
            )[0];
            this._selectedTagId = "0";
            this._selectedTagList.push(selectedTag);

            this.changeAddedTags.emit(this._selectedTagList);
        }
    }

    removeTag(tagId: string) {
        const selectedTagIndex: number = this._selectedTagList.findIndex(
            (tag: TagModel) => tag.getId() === tagId
        );
        const selectedTag: TagModel = this._selectedTagList.splice(
            selectedTagIndex,
            1
        )[0];
        this._availableTagList.push(selectedTag);
        this.changeAddedTags.emit(this._selectedTagList);
    }
}
