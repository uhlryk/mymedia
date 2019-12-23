import { Component, Input, OnChanges, OnInit } from "@angular/core";

@Component({
    selector: "app-tag-list",
    templateUrl: "./tag-list.component.html",
    styleUrls: ["./tag-list.component.scss"]
})
export class TagListComponent {
    @Input("tagList") tagList: Array<{
        id: string;
        name: string;
    }>;
    constructor() {}

}
