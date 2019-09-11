import { Component, OnInit } from "@angular/core";
import { ProjectContextService } from "../../services/projectContext.service";
import Tag from "../../types/Tag";

@Component({
    templateUrl: "./tags.component.html",
    styleUrls: ["./tags.component.scss"]
})
export class TagsComponent implements OnInit {
    private static CREATE_NAME = "create";
    private static UPDATE_NAME = "change";
    tagName: string;
    tagId: string;
    buttonName: string;
    tagList: Array<Tag>;

    constructor(private projectContextService: ProjectContextService) {}

    ngOnInit() {
        this.buttonName = TagsComponent.CREATE_NAME;
        this.tagList = this.projectContextService.getTags();
    }

    setValue() {
        if (this.tagId) {
            const tag = this.projectContextService.getTag(this.tagId);
            tag.name = this.tagName;
        } else {
            if(!this.projectContextService.findTagByName(this.tagName)) {
                this.projectContextService.addTag(this.tagName);
            }
        }
        this.tagId = null;
        this.tagName = "";
        this.buttonName = TagsComponent.CREATE_NAME;
        this.projectContextService.saveProject().subscribe(() => {});
    }

    editTag(tagId) {
        this.tagId = tagId;
        const tag = this.projectContextService.getTag(tagId);
        this.tagName = tag.name;
        this.buttonName = TagsComponent.UPDATE_NAME;
    }
}
