import { Component, EventEmitter, Output } from "@angular/core";

import { ProjectContextService } from "../../../../services/projectContext.service";
import ResourceModel from "../../../../models/resource.model";
import TagModel from "../../../../models/tag.model";
// import ThumbnailName from "../../../../../../shared/ThumbnailName";

@Component({
    selector: "app-details-modal",
    templateUrl: "./details-modal.component.html",
    styleUrls: ["./details-modal.component.scss"]
})
export class DetailsModalComponent {
    constructor(private projectContextService: ProjectContextService) {}

    resource: ResourceModel;
    thumbnailPath: string;
    availableProjectTagModelList: Array<TagModel>;
    selectedTagId: string;
    visibleSidebar: boolean;
    show(resourceId: string) {
        this.resource = this.projectContextService.getResourceModel(resourceId);
        this.thumbnailPath = this.resource.thumbnailPath;
        this.availableProjectTagModelList = this.resource.getOtherProjectTagModelList();
        this.selectedTagId = "0";
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

    addTag() {
        if (this.selectedTagId && this.selectedTagId !== "0") {
            console.log(this.selectedTagId);
            this.projectContextService.addResourceTag(
                this.resource.getId(),
                this.selectedTagId
            );
            this.availableProjectTagModelList = this.resource.getOtherProjectTagModelList();
            this.selectedTagId = "0";
            this.projectContextService.saveProject().subscribe(() => {});
        }
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

    changeThumbnail(thumbnailPath) {
        this.thumbnailPath = thumbnailPath;
    }

    // clickThumbnail() {
    //     console.log("AAA");
    //     const index: number = ThumbnailName.getThumbnailIndex(this.thumbnailPath);
    //     console.log(this.thumbnailPath + "   " + index);
    //     this.openThumbnailModal.emit({ resourceId: this.resource.getId(), index: index });
    // }
}
