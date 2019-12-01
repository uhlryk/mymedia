import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
import TagModel from "../../../../../../models/tag.model";
import ResourceModel from "../../../../../../models/resource.model";

@Component({
    selector: "app-tags-list",
    templateUrl: "./tags-list.component.html",
    styleUrls: ["./tags-list.component.scss"]
})
export class TagsListComponent implements OnChanges {
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
            return !this.selectedTagList.find((selectedTag: TagModel) => selectedTag.getId() === allTag.getId());
        });
        console.log("_______________");
        console.log(this._availableTagList);
        this._selectedTagList = this.selectedTagList.slice();
    }

    addTag() {
        if (this._selectedTagId && this._selectedTagId !== "0") {
            // console.log(this._selectedTagId);
            const selectedTagIndex: number = this._availableTagList.findIndex(
                (tag: TagModel) => tag.getId() === this._selectedTagId
            );
            const selectedTag: TagModel = this._availableTagList.splice(
                selectedTagIndex,
                1
            )[0];

            this._selectedTagList.push(selectedTag);

            this.changeAddedTags.emit(this._selectedTagList);
        }
    }

    removeTag(tagId) {
        const selectedTagIndex: number = this._selectedTagList.findIndex(
            (tag: TagModel) => tag.getId() === tagId
        );
        const selectedTag: TagModel = this._selectedTagList.splice(selectedTagIndex, 1)[0];
        this._availableTagList.push(selectedTag);
        this.changeAddedTags.emit(this._selectedTagList);
    }
}
