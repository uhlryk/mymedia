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
    _allProjectTagList: Array<TagModel>;
    _selectedTagList: Array<TagModel>;
    visibleSidebar: boolean;
    show(resourceId: string) {
        console.log("=====");
        console.log(resourceId);
        this.resource = this.projectContextService.getResourceModel(resourceId);
        console.log(this.resource);
        this.thumbnailPath = this.resource.thumbnailPath;
        this._allProjectTagList = this.projectContextService
            .getProjectTagList();
        this._selectedTagList = this.resource
            .getTagList();
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
    onChangeAddedTags(selectedTagList: Array<TagModel>) {
        console.log("DetailsModalComponent.changeAddedTags");
        this._selectedTagList = selectedTagList;
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
