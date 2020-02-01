import { Component, OnDestroy, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import { AppState } from "../../../../../../reducers";
import { select, Store } from "@ngrx/store";
import * as Actions from "../../../../store/actions/index.action";
import * as Selectors from "../../../../store/selectors/index.selector";
import { Observable, Subscribable, Subscription } from "rxjs";
import {map, tap} from "rxjs/operators";
@Component({
    selector: "app-top-menu",
    templateUrl: "./top-menu.component.html",
    styleUrls: ["./top-menu.component.scss"]
})
export class TopMenuComponent implements OnInit, OnDestroy {
    items$: Observable<MenuItem[]>;
    constructor(private store$: Store<AppState>) {}

    ngOnInit() {
        this.items$ = this.store$.pipe(
            select(Selectors.UI.tagsManagerVisibleSelector),
            map((isVisible: boolean) => {
                return [
                    {
                        label: "Change Project",
                        icon: "pi pi-fw pi-pencil",
                        routerLink: ["/"]
                    },
                    {
                        label: "Tags Manager",
                        icon: "pi pi-fw pi-pencil",
                        disabled: isVisible,
                        command: event => {
                            this.store$.dispatch(Actions.UI.showTagsManager({}));
                        }
                    }
                ];
            })
        );

        // this.items = [
        //     {
        //         label: "Change Project",
        //         icon: "pi pi-fw pi-pencil",
        //         routerLink: ["/"]
        //     },
        //     {
        //         label: "Tags Manager",
        //         icon: "pi pi-fw pi-pencil",
        //         command: event => {
        //             this.store$.dispatch(Actions.UI.showTagsManager({}));
        //         }
        //     }
        // ];
    }

    ngOnDestroy(): void {}
}
