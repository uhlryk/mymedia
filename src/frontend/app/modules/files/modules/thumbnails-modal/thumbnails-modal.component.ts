import { Component } from "@angular/core";

import { ProjectContextService } from "../../../../services/projectContext.service";
import { DialogService } from "primeng/api";
import {ContentComponent} from "./components/content/content.component";

@Component({
    selector: "app-thumbnails-modal",
    template: "<div></div>",
    styleUrls: ["./thumbnails-modal.component.scss"]
})
export class ThumbnailsModalComponent {
    // @Output() showDetails = new EventEmitter<string>();
    constructor(
        private projectContextService: ProjectContextService,
        public dialogService: DialogService
    ) {}

    show(resourceId: string, thumbnailIndex: number = 0) {
        this.dialogService.open(ContentComponent, {
            data: {
                resourceId: resourceId,
                index: thumbnailIndex
            },
            header: this.projectContextService.getResourceModel(resourceId).title,
            width: "90%",
            dismissableMask: true,
            contentStyle: { "max-height": "90%", overflow: "auto" },
            autoZIndex: true,
            baseZIndex: 20000
        });
    }
}
