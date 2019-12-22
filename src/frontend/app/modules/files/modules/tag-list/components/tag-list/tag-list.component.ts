import { Component, Input, OnChanges, OnInit } from "@angular/core";

@Component({
    selector: "app-tag-list",
    templateUrl: "./tag-list.component.html",
    styleUrls: ["./tag-list.component.scss"]
})
export class TagListComponent {
    @Input("tagList") _tagList: Array<{
        id: string;
        name: string;
    }>;
    constructor() {}

    get tagList(): Array<{
        id: string;
        name: string;
    }> {
        return this._tagList || [];
    }
}
