import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { AppState } from "../../../../reducers";
import { ConfirmationService } from "primeng/api";
import {
    Tag,
    UI
} from "../../store/actions/index.action";
import * as Selectors from "../../store/selectors/index.selector";

@Component({
    selector: "app-delete-tag-menu",
    templateUrl: "./delete-tag-menu.component.html",
    styleUrls: ["./delete-tag-menu.component.scss"]
})
export class DeleteTagMenuComponent implements OnInit {
    constructor(
        private store: Store<AppState>,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit() {
        this.store.pipe(select(Selectors.UI.deleteTagMenuSelector)).subscribe(menu => {
            if (menu.visible) {
                this.confirmationService.confirm({
                    message: "Are you sure that you want to delete tag?",
                    accept: () => {
                        this.store.dispatch(
                            Tag.removeTag({
                                tagId: menu.tagId
                            })
                        );
                    },
                    reject: () => {
                        this.store.dispatch(UI.hideDeleteTagMenu({}));
                    },
                });
            }
        });
    }
}
