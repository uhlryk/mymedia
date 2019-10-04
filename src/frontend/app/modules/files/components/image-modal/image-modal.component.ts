import { Component, TemplateRef, OnInit, ViewChild } from "@angular/core";
import { BsModalService, BsModalRef, ModalOptions } from "ngx-bootstrap/modal";
import { ProjectContextService } from "../../../../services/projectContext.service";
import ResourceModel from "../../../../models/resource.model";
import { ThumbnailService } from "../../../../services/thumbnail.service";

@Component({
    selector: "app-image-modal",
    templateUrl: "./image-modal.component.html",
    styleUrls: ["./image-modal.component.scss"]
})
export class ImageModalComponent implements OnInit {
    modalRef: BsModalRef;
    constructor(
        private modalService: BsModalService,
        private thumbnailService: ThumbnailService,
        private projectContextService: ProjectContextService
    ) {}

    resource: ResourceModel;
    thumbnail: string;
    @ViewChild("imageTemplate", { static: false }) elementView: TemplateRef<any>;

    show(resourceId: string) {
        this.resource = this.projectContextService.getResourceModel(resourceId);
        const config: ModalOptions = { class: "modal-lg" };
        this.modalRef = this.modalService.show(this.elementView, config);
        this.thumbnailService.getThumbnail(this.resource).subscribe(thumbnail => {
            this.thumbnail = thumbnail;
        });
    }

    ngOnInit() {}
}
