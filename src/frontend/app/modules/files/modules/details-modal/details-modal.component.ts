import { Component } from "@angular/core";

import { ProjectContextService } from "../../../../services/projectContext.service";
import ResourceModel from "../../../../models/resource.model";
import TagModel from "../../../../models/tag.model";

@Component({
    selector: "app-details-modal",
    templateUrl: "./details-modal.component.html",
    styleUrls: ["./details-modal.component.scss"]
})
export class DetailsModalComponent {
    constructor(private projectContextService: ProjectContextService) {}

    resource: ResourceModel;
    thumbnailPath: string;
    private _allProjectTags: Array<TagModel>;
    visibleSidebar: boolean;
    show(resourceId: string) {
        this.resource = this.projectContextService.getResourceModel(resourceId);
        this.thumbnailPath = this.resource.thumbnailPath;
        this._allProjectTags = this.projectContextService.getProjectTagList().slice();
        this.visibleSidebar = true;
    }

    clickOpenFile() {
        this.projectContextService.getProjectModel().open(this.resource.getId());
    }
    cancelRating() {
        this.resource.ranking = 0;
        this.projectContextService.saveProject().subscribe(() => {});
    }
    setRanking(event) {
        this.resource.ranking = event.value;
        this.projectContextService.saveProject().subscribe(() => {});
    }
    changeAddedTags(selectedTagList: Array<TagModel>) {
        this.projectContextService.setResourceTagList(
            this.resource.getId(),
            selectedTagList
        );
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

    changeThumbnail(thumbnailPath) {
        this.thumbnailPath = thumbnailPath;
    }
}
