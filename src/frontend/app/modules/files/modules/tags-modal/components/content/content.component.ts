import { Component, OnInit } from "@angular/core";
import { ProjectContextService } from "../../../../../../services/projectContext.service";
import TagModel from "../../../../../../models/tag.model";
import { LoaderService } from "../../../../../../services/loader.service";

@Component({
    templateUrl: "./content.component.html",
    styleUrls: ["./content.component.scss"]
})
export class ContentComponent implements OnInit {
    // private static CREATE_NAME = "create";
    // private static UPDATE_NAME = "change";
    tagName: string;
    // tagId: string;
    // buttonName: string;
    tagList: Array<TagModel>;

    constructor(private projectContextService: ProjectContextService) {}

    ngOnInit() {
        // this.buttonName = ContentComponent.CREATE_NAME;
        this.tagList = this.projectContextService.getProjectTagList();
    }

    setValue() {
        // if (this.tagId) {
        //     const tagModel = this.projectContextService.getProjectTagModelById(
        //         this.tagId
        //     );
        //     tagModel.setName(this.tagName);
        // } else {
        if (!this.projectContextService.getProjectTagModelByName(this.tagName)) {
            this.projectContextService.createProjectTag(this.tagName);
        }
        // }
        // this.tagId = null;
        this.tagName = "";
        // this.buttonName = ContentComponent.CREATE_NAME;
        this.projectContextService.saveProject().subscribe(() => {});
    }

    editTag(tagId) {
        // this.tagId = tagId;
        // const tagModel: TagModel = this.projectContextService.getProjectTagModelById(
        //     tagId
        // );
        // this.tagName = tagModel.getName();
        // this.buttonName = ContentComponent.UPDATE_NAME;
    }
    removeTag(tagId) {
        this.projectContextService.removeProjectTag(tagId);
        // this.tagId = null;
        this.tagName = "";
        this.tagList = this.projectContextService.getProjectTagList();
        this.projectContextService.saveProject().subscribe(() => {});
    }
}
