import { Component, OnInit } from "@angular/core";
import { ProjectContextService } from "../../../../../../services/projectContext.service";
import TagModel from "../../../../../../models/tag.model";
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
                console.log(this.tagList);
            });
    }

    setValue() {
        if (!this.projectContextService.getProjectTagModelByName(this.tagName)) {
            this.projectContextService.createProjectTag(this.tagName);
        }
        this.tagName = "";
        this.projectContextService.saveProject().subscribe(() => {});
    }

    editTag(tagId, newName) {
        const tagModel = this.projectContextService.getProjectTagModelById(tagId);
        tagModel.setName(newName);
        this.projectContextService.saveProject().subscribe(() => {});
    }
    removeTag(tagId) {
        this.projectContextService.removeProjectTag(tagId);
        this.tagName = "";
        this.tagList = this.projectContextService.getProjectTagList();
        this.projectContextService.saveProject().subscribe(() => {});
    }
}
