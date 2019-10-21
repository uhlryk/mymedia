import { Component, OnInit } from "@angular/core";
import { ProjectContextService } from "../../../../services/projectContext.service";
import ResourceModel from "../../../../models/resource.model";
import { ThumbnailService } from "../../../../services/thumbnail.service";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/api";
@Component({
    selector: "app-image-modal",
    templateUrl: "./image-modal.component.html",
    styleUrls: ["./image-modal.component.scss"],
    // providers: [DynamicDialogConfig, DynamicDialogRef]
})
export class ImageModalComponent implements OnInit {
    constructor(
        public config: DynamicDialogConfig,
        public ref: DynamicDialogRef,
        private thumbnailService: ThumbnailService,
        private projectContextService: ProjectContextService
    ) {}

    resource: ResourceModel;
    thumbnail: string;
    ngOnInit() {
        console.log(this.config);
        this.resource = this.projectContextService.getResourceModel(
            this.config.data.resourceId
        );
        // const config: ModalOptions = { class: "modal-lg" };
        // this.modalRef = this.modalService.show(this.elementView, config);
        this.thumbnailService.getThumbnail(this.resource).subscribe(thumbnail => {
            this.thumbnail = thumbnail;
        });
    }
}
