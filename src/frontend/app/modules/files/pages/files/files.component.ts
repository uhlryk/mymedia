import { Component, OnInit, ViewChild } from "@angular/core";
import { ProjectContextService } from "../../../../services/projectContext.service";
import { ResultManipulationService } from "../../../../services/result-manipulation.service";
import { DetailsModalComponent } from "../../components/detailsModal/detailsModal.component";
import { ImageModalComponent } from "../../components/image-modal/image-modal.component";
import ResourceModel from "../../../../models/resource.model";
import { DialogService } from "primeng/api";
import {LoaderService} from "../../../../services/loader.service";
import {Router} from "@angular/router";

@Component({
    templateUrl: "files.component.html",
    styleUrls: ["./files.component.scss"]
})
export class FilesComponent implements OnInit {
    @ViewChild(DetailsModalComponent, { static: true })
    detailsModal: DetailsModalComponent;

    resourceList: Array<ResourceModel>;
    // visibleSidebar = false;
    constructor(
        private projectContextService: ProjectContextService,
        private resultManipulationService: ResultManipulationService,
        public dialogService: DialogService,
        private loaderService: LoaderService,
        private router: Router,
    ) {}
    ngOnInit() {
        this.projectContextService.isProjectExist().subscribe(isProjectExist => {
            if(isProjectExist) {
                this.projectContextService.loadProject().subscribe(() => {
                    this.resultManipulationService
                        .manipulate(
                            this.projectContextService.getResourceCollectionModel().getList()
                        )
                        .subscribe(resourceList => {
                            this.resourceList = resourceList;
                        });
                    this.resultManipulationService.compute();
                    this.loaderService.hide();
                });
            } else {
                this.router.navigate(["/create-project"]);
            }
        });
    }

    openFile(resourceId) {
        this.projectContextService.openResource(resourceId);
    }

    showFileDetails(resourceId) {
        this.detailsModal.show(resourceId);
    }

    openThumbnailModal(resourceId) {
        this.dialogService.open(ImageModalComponent, {
            data: {
                resourceId: resourceId
            },
            header: this.projectContextService.getResourceModel(resourceId).getTitle(),
            width: "90%",
            contentStyle: { "max-height": "90%", overflow: "auto" }
        });
    }
}
