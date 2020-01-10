import { Component } from "@angular/core";

import { ProjectContextService } from "../../../../services/projectContext.service";
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
    visibleSidebar: boolean;
    show(resourceId: string) {
        this.projectContextService.listenProjectChange().subscribe((project: IProject) => {
            this.resource = project.resourceList.find((resource: IResource) => resource.id === resourceId);
            this.thumbnailPath = this.resource.thumbnailList[0];
            this._allProjectTagList = project.tagList;

        });
        this.visibleSidebar = true;
    }

    clickOpenFile() {
        this.projectContextService.openResource(this.resource.id);
    }
    setRanking(ranking) {
        this.projectContextService.changeProjectResource(this.resource.id, { ranking: ranking});
    }
    onChangeAddedTags(selectedTagList: Array<string>) {
        this.projectContextService.changeProjectResource(this.resource.id, { tags: [].concat(selectedTagList)});
    }

    saveTitle(newTitle) {
        this.projectContextService.changeProjectResource(this.resource.id, { title: newTitle});
    }

    saveDescription(text) {
        this.projectContextService.changeProjectResource(this.resource.id, { description: text});
    }

    changeThumbnail(thumbnailPath) {
        this.thumbnailPath = thumbnailPath;
    }
}
