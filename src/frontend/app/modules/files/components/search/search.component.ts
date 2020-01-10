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
            tagList: this.searchCriteria.tagList,
            text: inputText
        });
    }

    onChangeSearchTagList(selectedTagList: Array<TagModel>) {
        this.changeSearch.emit({
            tagList: selectedTagList,
            text: this.searchCriteria.text
        });
    }
}
