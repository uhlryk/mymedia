import { Component, Input, OnInit } from "@angular/core";
import { ResultManipulationService } from "../../../../services/result-manipulation.service";
import { ProjectContextService } from "../../../../services/projectContext.service";
import TagModel from "../../../../models/tag.model";

@Component({
    selector: "app-search",
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit {
    @Input() projectTagList: Array<TagModel>;
    searchInput;
    _selectedTagList: Array<TagModel>;
    constructor(
        // private projectContextService: ProjectContextService,
        private resultManipulationService: ResultManipulationService
    ) {}

    ngOnInit() {
        // this._allProjectTags = this.projectContextService.getProjectTagList().slice();
        this._selectedTagList = [];
    }

    startSearch() {
        console.log("A1");
        this.resultManipulationService.setSearch(this.searchInput);
    }

    changeAddedTags(selectedTagList: Array<TagModel>) {
        this._selectedTagList = selectedTagList;
    }

    getProjectTagList() {
        return this.projectTagList;
    }
}
