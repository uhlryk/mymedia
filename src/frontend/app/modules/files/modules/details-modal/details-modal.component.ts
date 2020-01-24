import { Component, OnInit } from "@angular/core";
import { AppState } from "../../../../reducers";
import { select, Store } from "@ngrx/store";
import {
    rightMenuResourceIdSelector,
    rightMenuVisibleSelector
} from "../../store/selectors/index.selector";
import { Observable } from "rxjs";
import { hideRightMenu } from "../../store/actions/index.action";
import { map } from "rxjs/operators";

@Component({
    selector: "app-details-modal",
    templateUrl: "./details-modal.component.html",
    styleUrls: ["./details-modal.component.scss"]
})
export class DetailsModalComponent implements OnInit {
    constructor(private store: Store<AppState>) {}

    resourceId: string;
    resourceId$: Observable<string>;
    visible$: Observable<boolean>;

    ngOnInit(): void {
        // this.store.subscribe(store => {
        //     console.log("AAAAAAAAA");
        //     console.log(store);
        // });
        this.resourceId$ = this.store.pipe(select(rightMenuResourceIdSelector));
        this.visible$ = this.store.pipe(select(rightMenuVisibleSelector));
    }

    onHide() {
        this.store.dispatch(hideRightMenu({}));
    }
}
