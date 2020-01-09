import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
import TagModel from "../../../../models/tag.model";
import ISearch from "../../types/search.interface";
import ITag from "../../../../../../shared/types/tag.interface";

@Component({
    selector: "app-search",
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit, OnChanges {
    @Input() projectTagList: Array<ITag>;
    @Output() changeSearch = new EventEmitter<ISearch>();
    _searchInput: string;
    _selectedTagList: Array<ITag>;
    constructor() {}

    ngOnInit() {
        this._selectedTagList = [];
        this._searchInput = "";
    }

    ngOnChanges() {}

    onChangeSearchText() {
        this.changeSearch.emit({
            tagList: this._selectedTagList,
            text: this._searchInput
        });
    }

    onChangeSearchTagList(selectedTagList: Array<TagModel>) {
        this._selectedTagList = selectedTagList;
        this.changeSearch.emit({
            tagList: this._selectedTagList,
            text: this._searchInput
        });
    }
}
