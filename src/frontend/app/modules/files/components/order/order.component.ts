import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ResultManipulationService } from "../../../../services/result-manipulation.service";

@Component({
    selector: "app-order",
    templateUrl: "./order.component.html",
    styleUrls: ["./order.component.scss"]
})
export class OrderComponent implements OnInit {
    selectedOption: string;
    @Output() changeOrderMethod = new EventEmitter<string>();
    constructor(private resultManipulationService: ResultManipulationService) {}

    ngOnInit() {
        this.selectedOption = "NAME_ASC";
    }

    startSorting() {
        console.log(this.selectedOption);
        this.changeOrderMethod.emit(this.selectedOption);
        // this.resultManipulationService.setOrder(this.selectedOption);
    }
}
