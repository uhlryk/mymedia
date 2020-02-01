import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { AppState } from "../../../../reducers";
import { ConfirmationService } from "primeng/api";
import {
    Resource,
    UI
} from "../../store/actions/index.action";
import * as Selectors from "../../store/selectors/index.selector";

@Component({
    selector: "app-delete-resource-menu",
    templateUrl: "./delete-resource-menu.component.html",
    styleUrls: ["./delete-resource-menu.component.scss"]
})
export class DeleteResourceMenuComponent implements OnInit {
    constructor(
        private store: Store<AppState>,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit() {
        this.store.pipe(select(Selectors.UI.deleteResourceMenuSelector)).subscribe(menu => {
            if (menu.visible) {
                this.confirmationService.confirm({
                    message: "Are you sure that you want to delete resource?",
                    accept: () => {
                        this.store.dispatch(
                            Resource.deleteResourceFromDeleteResourceMenu({
                                resourceId: menu.resourceId
                            })
                        );
                    },
                    reject: () => {
                        this.store.dispatch(UI.hideDeleteResourceMenu({}));
                    }
                });
            }
        });
    }
}
