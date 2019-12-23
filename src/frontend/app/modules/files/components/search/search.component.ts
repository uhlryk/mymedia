import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
import { ResultManipulationService } from "../../../../services/result-manipulation.service";
import { ProjectContextService } from "../../../../services/projectContext.service";
import TagModel from "../../../../models/tag.model";
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
    constructor(
        // private projectContextService: ProjectContextService,
        private resultManipulationService: ResultManipulationService
    ) {}

    ngOnInit() {
        // this._allProjectTags = this.projectContextService.getProjectTagList().slice();
        this._selectedTagList = [];
    }

    ngOnChanges() {}

    onChangeSearchText() {
        this.changeSearchText.emit(this._searchInput)
        // this.resultManipulationService.setSearch(this._searchInput);
    }

    onChangeSearchTagList(selectedTagList: Array<Tag>) {
        this._selectedTagList = selectedTagList;
        this.changeSearchTagList.emit(selectedTagList);
        // this.resultManipulationService.setSearchTags(
        //     this._selectedTagList.map((tag: TagModel) => tag.getId())
        // );
    }

    // get projectTags() {
    //     return this.projectTagList;
    // }
    //
    // get selectedTagList() {
    //     return this._selectedTagList;
    // }
}
