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
import ProjectModel from "../../../../models/project.model";

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
        this.projectContextService
            .projectChange()
            .subscribe((projectModel: ProjectModel) => {
                console.log("FilesComponent change in project");
                this.resultManipulationService
                    .manipulate(projectModel.getResourceCollectionModel().getList())
                    .subscribe(resourceList => {
                        this.resourceList = resourceList;
                    });
                this.resultManipulationService.compute();
            });
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

                this.loaderService.hide();
            }
        });

        this.projectContextService.listenOpenTagsManager().subscribe(() => {
            this.tagsModal.show();
        });
    }

    onClickThumbnail(resourceId) {
        this.projectContextService.openResource(resourceId);
    }

    onClickDetailsButton(resourceId) {
        this.detailsModal.show(resourceId);
    }

    getProjectTagList() {
        return this.projectContextService.getProjectTagList();
    }
}
