import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
import Tag from "../../../../types/tag.type";

@Component({
    selector: "app-search",
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit, OnChanges {
    @Input() projectTagList: Array<Tag>;
    @Output() changeSearchText = new EventEmitter<string>();
    @Output() changeSearchTagList = new EventEmitter<Array<Tag>>();
    _searchInput: string;
    _selectedTagList: Array<Tag>;
    constructor() {}

    ngOnInit() {
        this._selectedTagList = [];
    }

    ngOnChanges() {}

    onChangeSearchText() {
        this.changeSearchText.emit(this._searchInput);
    }

    onChangeSearchTagList(selectedTagList: Array<Tag>) {
        this._selectedTagList = selectedTagList;
        this.changeSearchTagList.emit(selectedTagList);
    }
}
