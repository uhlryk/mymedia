import {Component, OnInit, ViewChild} from "@angular/core";
import { ProjectContextService } from "../../../../services/projectContext.service";
import { Router } from "@angular/router";
import {DetailsModalComponent} from "../../components/detailsModal/detailsModal.component";
import ResourceModel from "../../../../models/resource.model";

@Component({
    templateUrl: "files.component.html",
    styleUrls: ["./files.component.scss"]
})
export class FilesComponent implements OnInit {
    @ViewChild(DetailsModalComponent, {static: true}) detailsModal: DetailsModalComponent;

    resourceList: Array<ResourceModel>;
    searchInput;
    constructor(
        private projectContextService: ProjectContextService,
        private router: Router
    ) {}
    ngOnInit() {
        this.resourceList = this.projectContextService.getResourceCollectionModel().getList();
    }

    openFile(resourceId) {
        this.projectContextService.openResource(resourceId);
    }

    showFileDetails(resourceId) {
        console.log("ZZZ");
        console.log(resourceId);
        this.detailsModal.show(resourceId);
    }

    startSearch() {
        this.resourceList = this.projectContextService.getResourceCollectionModel().getList().filter(resource => {
            if (resource.getTitle().toLowerCase().includes(this.searchInput.toLowerCase())) {
                return true;
            }
            const matchedFileTags = resource.getResourceTagModelList().filter(tagModel =>
                tagModel.getName().toLowerCase().includes(this.searchInput.toLowerCase())
            );
            if (
                matchedFileTags.length > 0
            ) {
                return true;
            }
        });

    }
}
