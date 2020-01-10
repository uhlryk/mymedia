import { Component, OnInit } from "@angular/core";
import { ProjectContextService } from "../../../../../../services/projectContext.service";
import IProject from "../../../../../../../../shared/types/project.interface";
import ITag from "../../../../../../../../shared/types/tag.interface";

@Component({
    templateUrl: "./content.component.html",
    styleUrls: ["./content.component.scss"]
})
export class ContentComponent implements OnInit {
    tagName: string;
    tagList: Array<ITag>;

    constructor(private projectContextService: ProjectContextService) {}

    ngOnInit() {
        this.projectContextService
            .listenProjectChange()
            .subscribe((project: IProject) => {
                this.tagList = project.tagList;
            });
    }

    onNewTag() {
        this.projectContextService.createProjectTag({ name: this.tagName });
        this.tagName = "";
    }

    onEditTag(tagId, newName) {
        this.projectContextService.changeProjectTag(tagId, { name: newName });
        this.tagName = "";
    }
    onRemoveTag(tagId) {
        this.projectContextService.removeProjectTag(tagId);
        this.tagName = "";
    }
}
