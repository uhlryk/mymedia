import { Component, OnInit } from "@angular/core";
import { ResultManipulationService } from "../../../../services/result-manipulation.service";

@Component({
    selector: "app-search",
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit {
    searchInput;
    constructor(private resultManipulationService: ResultManipulationService) {}

    ngOnInit() {}

    startSearch() {
        console.log("A1");
        this.resultManipulationService.setSearch(this.searchInput);
    }
}
