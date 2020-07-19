import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
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
        this._selectedTagId = "0";

        this._selectedTagList = this.allTagList.filter((allTag: ITag) => {
            return this.selectedTagIdList.find(
                (selectedTagId: string) => selectedTagId === allTag.id
            );
        });
        const selectedMainTagList = this._selectedTagList.filter(tag => !tag.parentId);
        this._availableTagList = this.allTagList.filter((allTag: ITag) => {
            return !this.selectedTagIdList.find(
                (selectedTagId: string) => selectedTagId === allTag.id
            );
        });
        this._availableTagList = this._availableTagList.filter(tag => {
            if (!tag.parentId) {
                return true;
            } else {
                return !selectedMainTagList.find(
                    parentTag => parentTag.id === tag.parentId
                );
            }
        });
    }
    addTag(selectedTagId) {
        const newSelectedTag = this.allTagList.find(tag => tag.id === selectedTagId);
        const selectedTagList = this._selectedTagList.concat(newSelectedTag);
        const mainTagList = selectedTagList.filter(tag => !tag.parentId);
        const tagListWithoutSubTagsIfMainTag = selectedTagList.filter(tag => {
            if (!tag.parentId) {
                return true;
            } else {
                return !mainTagList.find(parentTag => parentTag.id === tag.parentId);
            }
        });
        this.changeTagList.emit(
            tagListWithoutSubTagsIfMainTag.map((tag: ITag) => tag.id)
        );
    }

    onRemoveTag(tagId: string) {
        this.changeTagList.emit(
            this._selectedTagList
                .map((tag: ITag) => tag.id)
                .filter((selectedTagId: string) => selectedTagId !== tagId)
        );
    }
}
