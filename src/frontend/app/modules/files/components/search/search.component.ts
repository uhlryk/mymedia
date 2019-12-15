import { Component, OnInit } from "@angular/core";
import { ResultManipulationService } from "../../../../services/result-manipulation.service";
import { ProjectContextService } from "../../../../services/projectContext.service";
import TagModel from "../../../../models/tag.model";

@Component({
    selector: "app-search",
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit {
    searchInput;
    private _allProjectTags: Array<TagModel>;
    private _selectedTagList: Array<TagModel>;
    constructor(
        private projectContextService: ProjectContextService,
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
        // this.projectContextService.setResourceTagList(
        //     this.resource.getId(),
        //     selectedTagList
        // );
        // this.projectContextService.saveProject().subscribe(() => {});
    }
}
