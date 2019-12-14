import { Component } from "@angular/core";

import { DialogService } from "primeng/api";
import { ContentComponent } from "./components/content/content.component";

@Component({
    selector: "app-tags-modal",
    template: "<div></div>",
    styleUrls: ["./tags-modal.component.scss"]
})
export class TagsModalComponent {
    private _isOpen: boolean = false;
    constructor(
        public dialogService: DialogService
    ) {}

    show() {
        if(this._isOpen === true) {
            return;
        } else {
            const dialogRef = this.dialogService.open(ContentComponent, {
                data: {},
                header: "Tags Manager",
                width: "90%",
                height: "100%",
                dismissableMask: true,
                contentStyle: {height: "calc(100% - 50px)", overflow: "auto"},
                autoZIndex: true,
                baseZIndex: 20000
            });
            this._isOpen = true;
            const subscription = dialogRef.onClose.subscribe(() => {
                this._isOpen = false;
                subscription.unsubscribe();
            });
        }
    }
}
