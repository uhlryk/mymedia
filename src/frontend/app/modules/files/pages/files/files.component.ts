import { Component, OnInit, ViewChild } from "@angular/core";
import { ProjectContextService } from "../../../../services/projectContext.service";
import { ResultManipulationService } from "../../../../services/result-manipulation.service";
import { DetailsModalComponent } from "../../modules/details-modal/details-modal.component";
import { ThumbnailsModalComponent } from "../../modules/thumbnails-modal/thumbnails-modal.component";
import { ContentComponent } from "../../modules/thumbnails-modal/components/content/content.component";
import ResourceModel from "../../../../models/resource.model";
import { DialogService } from "primeng/api";
import { LoaderService } from "../../../../services/loader.service";
import { Router } from "@angular/router";
import { ThumbnailService } from "../../../../services/thumbnail.service";

@Component({
    templateUrl: "files.component.html",
    styleUrls: ["./files.component.scss"]
})
export class FilesComponent implements OnInit {
    @ViewChild(DetailsModalComponent, { static: true })
    detailsModal: DetailsModalComponent;

    @ViewChild(ThumbnailsModalComponent, { static: true })
    thumbnailsModal: ThumbnailsModalComponent;

    resourceList: Array<ResourceModel>;
    // visibleSidebar = false;
    constructor(
        private projectContextService: ProjectContextService,
        private thumbnailService: ThumbnailService,
        private resultManipulationService: ResultManipulationService,
        private loaderService: LoaderService,
        private router: Router
    ) {}
    ngOnInit() {
        this.loaderService.show();
        this.projectContextService.loadProject().subscribe(isProjectExist => {
            if (!isProjectExist) {
                this.router.navigate(["/create-project"]);
            } else {
                this.thumbnailService.onThumbnailChange().subscribe(response => {
                    const resourceModer: ResourceModel = this.projectContextService.getResourceModel(
                        response.resourceId
                    );
                    resourceModer.setThumbnailPath(
                        response.resourceThumbnailPath,
                        response.videoIndex
                    );
                });
                this.resultManipulationService
                    .manipulate(
                        this.projectContextService.getResourceCollectionModel().getList()
                    )
                    .subscribe(resourceList => {
                        this.resourceList = resourceList;
                    });
                this.resultManipulationService.compute();
                this.loaderService.hide();
            }
        });
    }

    openFile(resourceId) {
        this.projectContextService.openResource(resourceId);
    }

    showFileDetails(resourceId) {
        this.detailsModal.show(resourceId);
    }

    openThumbnailModal({ resourceId, index = 0 }: { resourceId: string; index?: number }) {
        this.thumbnailsModal.show(resourceId, index);
    }
}
