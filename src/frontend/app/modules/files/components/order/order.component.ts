import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../reducers";
import { Order } from "../../store/actions/index.action";

@Component({
    selector: "app-order",
    templateUrl: "./order.component.html",
    styleUrls: ["./order.component.scss"]
})
export class OrderComponent implements OnInit {
    selectedOption: string;
    constructor(private store: Store<AppState>) {}

    ngOnInit() {
        this.selectedOption = "NAME_ASC";
    }

    startSorting() {
        console.log(this.selectedOption);
        this.store.dispatch(
            Order.setResourceOrder({
                order: this.selectedOption
            })
        );
    }
}
