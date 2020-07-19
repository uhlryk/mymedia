import { Component, OnDestroy, OnInit } from "@angular/core";

import { DialogService } from "primeng/api";
import { ContentComponent } from "./components/content/content.component";
import { AppState } from "../../../../reducers";
import * as Selector from "../../store/selectors/index.selector";
import * as Actions from "../../store/actions/index.action";
import { select, Store } from "@ngrx/store";
import { Subject, Subscription } from "rxjs";

@Component({
    selector: "app-tags-modal",
    template: "<div></div>",
    styleUrls: ["./tags-modal.component.scss"]
})
export class TagsModalComponent implements OnInit, OnDestroy {
    private _isOpen: boolean = false;
    private manager: Subscription;
    private dialogRef;
    constructor(private store$: Store<AppState>, private dialogService: DialogService) {}

    ngOnInit() {
        this.manager = this.store$
            .pipe(select(Selector.UI.tagsManagerVisibleSelector))
            .subscribe((isVisible: boolean) => {
                if (isVisible) {
                    this.dialogRef = this.dialogService.open(ContentComponent, {
                        data: {},
                        header: "Tags Manager",
                        width: "90%",
                        height: "calc(100% - 50px)",
                        dismissableMask: true,
                        contentStyle: { height: "calc(100% - 50px)", overflow: "auto" },
                        autoZIndex: true,
                        baseZIndex: 120000
                    });
                    this.dialogRef.onClose.subscribe(() => {
                        this.store$.dispatch(Actions.UI.hideTagsManager({}));
                    });
                }
            });
    }

    ngOnDestroy(): void {
        this.manager.unsubscribe();
    }

    // show() {
    //     if (this._isOpen === true) {
    //         return;
    //     } else {
    //         const dialogRef = this.dialogService.open(ContentComponent, {
    //             data: {},
    //             header: "Tags Manager",
    //             width: "90%",
    //             height: "100%",
    //             dismissableMask: true,
    //             contentStyle: { height: "calc(100% - 50px)", overflow: "auto" },
    //             autoZIndex: true,
    //             baseZIndex: 20000
    //         });
    //         this._isOpen = true;
    //         const subscription = dialogRef.onClose.subscribe(() => {
    //             this._isOpen = false;
    //             subscription.unsubscribe();
    //         });
    //     }
    // }
}
