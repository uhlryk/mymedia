import { Component } from "@angular/core";

import { ProjectContextService } from "../../../../services/projectContext.service";
import ResourceModel from "../../../../models/resource.model";
import TagModel from "../../../../models/tag.model";
import IProject from "../../../../../../shared/types/project.interface";
import IResource from "../../../../../../shared/types/resource.interface";
import ITag from "../../../../../../shared/types/tag.interface";

@Component({
    selector: "app-details-modal",
    templateUrl: "./details-modal.component.html",
    styleUrls: ["./details-modal.component.scss"]
})
export class DetailsModalComponent {
    constructor(private projectContextService: ProjectContextService) {}

    resource: IResource;
    thumbnailPath: string;
    _allProjectTagList: Array<ITag>;
    // _selectedTagList: Array<TagModel>;
    visibleSidebar: boolean;
    show(resourceId: string) {
        this.projectContextService.listenProjectChange().subscribe((project: IProject) => {
            this.resource = project.resourceList.find((resource: IResource) => resource.id === resourceId);

            this.thumbnailPath = this.resource.thumbnailList[0];
            this._allProjectTagList = project.tagList;
            this.visibleSidebar = true;
        });
    }

    clickOpenFile() {
        // this.projectContextService.getProjectModel().open(this.resource.getId());
    }
    cancelRating() {
        // this.resource.ranking = 0;
        // this.projectContextService.saveProject().subscribe(() => {});
    }
    setRanking(event) {
        // this.resource.ranking = event.value;
        // this.projectContextService.saveProject().subscribe(() => {});
    }
    onChangeAddedTags(selectedTagList: Array<string>) {
        // console.log("DetailsModalComponent.changeAddedTags");
        // this._selectedTagList = selectedTagList;
        // this.projectContextService.setResourceTagList(
        //     this.resource.getId(),
        //     selectedTagList
        // );
        // this.projectContextService.saveProject().subscribe(() => {});
    }

    saveTitle(newTitle) {
        // this.resource.setTitle(newTitle);
        // this.projectContextService.saveProject().subscribe(() => {});
    }

    saveDescription(text) {
        // this.resource.setDescription(text);
        // this.projectContextService.saveProject().subscribe(() => {});
    }

    changeThumbnail(thumbnailPath) {
        // this.thumbnailPath = thumbnailPath;
    }
}
