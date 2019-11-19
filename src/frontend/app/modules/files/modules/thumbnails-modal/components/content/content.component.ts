import { Component, OnInit } from "@angular/core";
import { ProjectContextService } from "../../../../../../services/projectContext.service";
import ResourceModel from "../../../../../../models/resource.model";
import { ThumbnailService } from "../../../../../../services/thumbnail.service";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/api";
@Component({
    selector: "app-content",
    templateUrl: "./content.component.html",
    styleUrls: ["./content.component.scss"]
    // providers: [DynamicDialogConfig, DynamicDialogRef]
})
export class ContentComponent implements OnInit {
    constructor(
        public config: DynamicDialogConfig,
        public ref: DynamicDialogRef,
        private projectContextService: ProjectContextService
    ) {}

    resource: ResourceModel;
    thumbnailPath: string;
    ngOnInit() {
        console.log(this.config);
        this.resource = this.projectContextService.getResourceModel(
            this.config.data.resourceId
        );
        const index: number = this.config.data.index;
        this.thumbnailPath = this.resource.thumbnailList[index];
    }
}