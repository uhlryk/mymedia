import { Component, OnInit, HostBinding, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "app-side-menu",
    templateUrl: "./side-menu.component.html",
    styleUrls: ["./side-menu.component.scss"]
})
export class SideMenuComponent implements OnInit {
    @HostBinding("style.width") width: string = "35px";
    @Output() openTagsModal = new EventEmitter<void>();
    constructor() {}
    private _isLeftMenuVisible: boolean;
    ngOnInit() {
        this._isLeftMenuVisible = false;
    }

    _toggleShowLeftBar() {
        this._isLeftMenuVisible = !this._isLeftMenuVisible;
        if (this._isLeftMenuVisible) {
            this.width = "220px";
        } else {
            this.width = "35px";
        }
    }

    _clickOpenTagsModal() {
        this.openTagsModal.emit();
    }
}
