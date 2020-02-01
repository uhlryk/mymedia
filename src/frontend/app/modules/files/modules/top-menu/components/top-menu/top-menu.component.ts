import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import {AppState} from "../../../../../../reducers";
import {Store} from "@ngrx/store";
import * as Actions from "../../../../store/actions/index.action";
@Component({
    selector: "app-top-menu",
    templateUrl: "./top-menu.component.html",
    styleUrls: ["./top-menu.component.scss"]
})
export class TopMenuComponent implements OnInit {
    items: MenuItem[];
    constructor(private store$: Store<AppState>) {}

    ngOnInit() {
        this.items = [
            {
                label: "Change Project",
                icon: "pi pi-fw pi-pencil",
                routerLink: ["/"]
            },
            {
                label: "Tags Manager",
                icon: "pi pi-fw pi-pencil",
                command: (event) => {
                    this.store$.dispatch(Actions.UI.showTagsManager({}));
                }
            }
        ];
    }
}
