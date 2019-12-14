import { Component, OnInit, ViewChild } from "@angular/core";
import { ProjectContextService } from "../../../../services/projectContext.service";
import { ResultManipulationService } from "../../../../services/result-manipulation.service";
import { DetailsModalComponent } from "../../modules/details-modal/details-modal.component";
import { ThumbnailsModalComponent } from "../../modules/thumbnails-modal/thumbnails-modal.component";
import ResourceModel from "../../../../models/resource.model";
import { LoaderService } from "../../../../services/loader.service";
import { Router } from "@angular/router";
import { ThumbnailService } from "../../../../services/thumbnail.service";
import { TagsModalComponent } from "../../modules/tags-modal/tags-modal.component";

@Component({
    templateUrl: "files.component.html",
    styleUrls: ["./files.component.scss"]
})
export class FilesComponent implements OnInit {
    @ViewChild(DetailsModalComponent, { static: true })
    detailsModal: DetailsModalComponent;

    @ViewChild(ThumbnailsModalComponent, { static: true })
    thumbnailsModal: ThumbnailsModalComponent;

    @ViewChild(TagsModalComponent, { static: true })
    tagsModal: TagsModalComponent;

    resourceList: Array<ResourceModel>;

    private _isLeftMenuVisible: boolean;
    // visibleSidebar = false;
    constructor(
        private projectContextService: ProjectContextService,
        private thumbnailService: ThumbnailService,
        private resultManipulationService: ResultManipulationService,
        private loaderService: LoaderService,
        private router: Router
    ) {}
    ngOnInit() {
        this._isLeftMenuVisible = false;
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

        this.projectContextService.listenOpenTagsManager().subscribe(() => {
            this.tagsModal.show();
        });
    }

    openFile(resourceId) {
        this.projectContextService.openResource(resourceId);
    }

    showFileDetails(resourceId) {
        this.detailsModal.show(resourceId);
    }

}
