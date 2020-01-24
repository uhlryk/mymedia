import { Component } from "@angular/core";

@Component({
    selector: "app-details-modal",
    templateUrl: "./details-modal.component.html",
    styleUrls: ["./details-modal.component.scss"]
})
export class DetailsModalComponent {
    constructor(
    ) {}

    resourceId: string;
    visibleSidebar: boolean;

    show(resourceId: string) {
        this.resourceId = resourceId;
        this.visibleSidebar = true;
    }

    onHide() {}
}
