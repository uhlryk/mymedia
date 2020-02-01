import { Component, OnInit } from "@angular/core";
import { AppState } from "../../../../reducers";
import { select, Store } from "@ngrx/store";
import * as Selector from "../../store/selectors/index.selector";
import { Observable } from "rxjs";
import { UI } from "../../store/actions/index.action";

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
        this.resourceId$ = this.store.pipe(select(Selector.Menu.rightMenuResourceIdSelector));
        this.visible$ = this.store.pipe(select(Selector.Menu.rightMenuVisibleSelector));
    }

    onHide() {
        this.store.dispatch(UI.hideRightMenu({}));
    }
}
