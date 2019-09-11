import { Component, OnInit } from "@angular/core";
import {ProjectContextService} from "../../services/projectContext.service";

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
    constructor(
        private projectContextService: ProjectContextService
    ) {}

    ngOnInit() {
        this.buttonName = TagsComponent.CREATE_NAME;
    }

    setValue() {
        console.log("===");
        console.log(this.tagName);
        this.projectContextService.addTag(this.tagName);
        this.tagId = null;
        this.tagName = "";
        this.buttonName = TagsComponent.CREATE_NAME;
    }
}
