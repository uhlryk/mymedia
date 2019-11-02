import { Component, EventEmitter, Output } from "@angular/core";

import { ProjectContextService } from "../../../../services/projectContext.service";
import ResourceModel from "../../../../models/resource.model";
import TagModel from "../../../../models/tag.model";

@Component({
    selector: "app-details-modal",
    templateUrl: "./details-modal.component.html",
    styleUrls: ["./details-modal.component.scss"]
})
export class DetailsModalComponent {
    @Output() showDetails = new EventEmitter<string>();
    constructor(private projectContextService: ProjectContextService) {}

    resource: ResourceModel;
    availableProjectTagModelList: Array<TagModel>;
    selectedTagId: string;
    visibleSidebar: boolean;
    show(resourceId: string) {
        this.resource = this.projectContextService.getResourceModel(resourceId);
        this.availableProjectTagModelList = this.resource.getOtherProjectTagModelList();
        this.selectedTagId = "";
        this.visibleSidebar = true;
    }

    clickOpenFile() {
        this.projectContextService.getProjectModel().open(this.resource.getId());
    }

    clickChangeRanking(value) {
        this.resource.setRanking(value);
        this.projectContextService.saveProject().subscribe(() => {});
    }

    addTag() {
        console.log(this.selectedTagId);
        this.projectContextService.addResourceTag(
            this.resource.getId(),
            this.selectedTagId
        );
        this.availableProjectTagModelList = this.resource.getOtherProjectTagModelList();
        this.selectedTagId = "";
        this.projectContextService.saveProject().subscribe(() => {});
    }

    removeTag(tagId) {
        this.projectContextService.removeResourceTag(this.resource.getId(), tagId);
        this.availableProjectTagModelList = this.resource.getOtherProjectTagModelList();
        this.selectedTagId = "";
        this.projectContextService.saveProject().subscribe(() => {});
    }

    saveTitle(newTitle) {
        this.resource.setTitle(newTitle);
        this.projectContextService.saveProject().subscribe(() => {});
    }

    saveDescription(text) {
        this.resource.setDescription(text);
        this.projectContextService.saveProject().subscribe(() => {});
    }
}
