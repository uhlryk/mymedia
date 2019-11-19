import { Component, OnInit } from "@angular/core";
import { ProjectContextService } from "../../../../../../services/projectContext.service";
import TagModel from "../../../../../../models/tag.model";

@Component({
    templateUrl: "./content.component.html",
    styleUrls: ["./content.component.scss"]
})
export class ContentComponent implements OnInit {
    tagName: string;
    tagList: Array<TagModel>;

    constructor(private projectContextService: ProjectContextService) {}

    ngOnInit() {
        this.tagList = this.projectContextService.getProjectTagList();
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
