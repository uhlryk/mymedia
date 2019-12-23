import { Component, Input, OnChanges, OnInit } from "@angular/core";
import Tag from "../../../../../../types/tag.type";

@Component({
    selector: "app-tag-list",
    templateUrl: "./tag-list.component.html",
    styleUrls: ["./tag-list.component.scss"]
})
export class TagListComponent {
    @Input("tagList") tagList: Array<Tag>;
    constructor() {}

}
