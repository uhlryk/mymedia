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
    @Input() searchCriteria: ISearch;
    @Output() changeSearch = new EventEmitter<ISearch>();
    constructor() {}

    ngOnInit() {
    }

    ngOnChanges() {
        // this._selectedTagList = this;
        // this._searchInput = "";
    }

    onChangeSearchText(inputText) {
        this.changeSearch.emit({
            tagIdList: this.searchCriteria.tagIdList,
            text: inputText
        });
    }

    onChangeSearchTagList(selectedTagList: Array<string>) {
        this.changeSearch.emit({
            tagIdList: selectedTagList,
            text: this.searchCriteria.text
        });
    }
}
