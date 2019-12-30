import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
import TagModel from "../../../../models/tag.model";

@Component({
    selector: "app-search",
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit, OnChanges {
    @Input() projectTagList: Array<TagModel>;
    @Output() changeSearchText = new EventEmitter<string>();
    @Output() changeSearchTagList = new EventEmitter<Array<TagModel>>();
    _searchInput: string;
    _selectedTagList: Array<TagModel>;
    constructor() {}

    ngOnInit() {
        this._selectedTagList = [];
    }

    ngOnChanges() {}

    onChangeSearchText() {
        this.changeSearchText.emit(this._searchInput);
    }

    onChangeSearchTagList(selectedTagList: Array<TagModel>) {
        this._selectedTagList = selectedTagList;
        this.changeSearchTagList.emit(selectedTagList);
    }
}
