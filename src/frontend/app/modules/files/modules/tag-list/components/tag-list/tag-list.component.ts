import { Component, Input, OnChanges, OnInit } from "@angular/core";

@Component({
    selector: "app-tag-list",
    templateUrl: "./tag-list.component.html",
    styleUrls: ["./tag-list.component.scss"]
})
export class TagListComponent {
    @Input("tag-list") _tagList: Array<TagModel>;
    constructor() {}

    get tagList(): Array<TagModel> {
        return this._tagList;
    }
}

export interface TagModel {
    id: string;
    name: string;
}
