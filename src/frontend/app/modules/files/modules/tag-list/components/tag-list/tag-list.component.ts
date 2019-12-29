import { Component, Input, OnChanges, OnInit } from "@angular/core";
import TagModel from "../../../../../../models/tag.model";

@Component({
    selector: "app-tag-list",
    templateUrl: "./tag-list.component.html",
    styleUrls: ["./tag-list.component.scss"]
})
export class TagListComponent {
    @Input() tagList: Array<TagModel>;
    constructor() {}

}
