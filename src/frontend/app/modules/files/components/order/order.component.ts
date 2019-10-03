import { Component, OnInit } from "@angular/core";
import {ResultManipulationService} from "../../../../services/result-manipulation.service";

@Component({
    selector: "app-order",
    templateUrl: "./order.component.html",
    styleUrls: ["./order.component.scss"]
})
export class OrderComponent implements OnInit {
    selectedOption: string;
    constructor(private resultManipulationService: ResultManipulationService) {}

    ngOnInit() {}

    startSorting() {
        this.resultManipulationService.setOrder(this.selectedOption);
    }
}
