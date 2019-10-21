import { Component, OnInit, ViewChild } from "@angular/core";
import { ProjectContextService } from "../../../../services/projectContext.service";
import { ResultManipulationService } from "../../../../services/result-manipulation.service";
import { DetailsModalComponent } from "../../components/detailsModal/detailsModal.component";
import { ImageModalComponent } from "../../components/image-modal/image-modal.component";
import ResourceModel from "../../../../models/resource.model";
import { DialogService } from "primeng/api";

@Component({
    templateUrl: "files.component.html",
    styleUrls: ["./files.component.scss"]
})
export class FilesComponent implements OnInit {
    @ViewChild(DetailsModalComponent, { static: true })
    detailsModal: DetailsModalComponent;

    resourceList: Array<ResourceModel>;
    constructor(
        private projectContextService: ProjectContextService,
        private resultManipulationService: ResultManipulationService,
        public dialogService: DialogService
    ) {}
    ngOnInit() {
        this.projectContextService.ensureInitialized().subscribe(() => {
            this.resultManipulationService
                .manipulate(
                    this.projectContextService.getResourceCollectionModel().getList()
                )
                .subscribe(resourceList => {
                    this.resourceList = resourceList;
                });
            this.resultManipulationService.compute();
        });
    }

    openFile(resourceId) {
        this.projectContextService.openResource(resourceId);
    }

    showFileDetails(resourceId) {
        console.log("AAAA");
        console.log(resourceId);
        this.detailsModal.show(resourceId);
    }

    openThumbnailModal(resourceId) {
        this.dialogService.open(ImageModalComponent, {
            data: {
                resourceId: resourceId
            },
            header: this.projectContextService.getResourceModel(resourceId).getTitle(),
            width: "70%",
            contentStyle: { "max-height": "450px", overflow: "auto" }
        });
    }
}
