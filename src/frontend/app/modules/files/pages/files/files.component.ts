import { Component, OnInit, ViewChild } from "@angular/core";
import { ProjectContextService } from "../../../../services/projectContext.service";
import { ResultManipulationService } from "../../../../services/result-manipulation.service";
import { DetailsModalComponent } from "../../components/detailsModal/detailsModal.component";
import ResourceModel from "../../../../models/resource.model";

// TODO: move this to separate service and run with each video file path
// import { ipcRenderer } from "electron";
// ipcRenderer.send("ping");

@Component({
    templateUrl: "files.component.html",
    styleUrls: ["./files.component.scss"]
})
export class FilesComponent implements OnInit {
    @ViewChild(DetailsModalComponent, { static: true })
    detailsModal: DetailsModalComponent;

    resourceList: Array<ResourceModel>;
    searchInput;
    constructor(
        private projectContextService: ProjectContextService,
        private resultManipulationService: ResultManipulationService
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
        console.log(resourceId);
        this.detailsModal.show(resourceId);
    }

    startSearch() {
        console.log("A1");
        this.resultManipulationService.setSearch(this.searchInput);
    }
}
