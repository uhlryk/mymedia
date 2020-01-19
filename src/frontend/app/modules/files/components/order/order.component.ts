import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../reducers";
import { setProjectInitialData, setResourceOrder } from "../../actions/index.action";

@Component({
    selector: "app-order",
    templateUrl: "./order.component.html",
    styleUrls: ["./order.component.scss"]
})
export class OrderComponent implements OnInit {
    selectedOption: string;
    // @Output() changeOrderMethod = new EventEmitter<string>();
    constructor(private store: Store<AppState>) {}

    ngOnInit() {
        this.selectedOption = "NAME_ASC";
    }

    startSorting() {
        console.log(this.selectedOption);
        this.store.dispatch(
            setResourceOrder({
                order: this.selectedOption
            })
        );
        // this.changeOrderMethod.emit(this.selectedOption);
        // this.resultManipulationService.setOrder(this.selectedOption);
    }
}
