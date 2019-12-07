import { Component, Input, OnChanges, OnInit } from "@angular/core";
import TagModel from "../../../../../../models/tag.model";

@Component({
    selector: "app-tag-list",
    templateUrl: "./tag-list.component.html",
    styleUrls: ["./tag-list.component.scss"]
})
export class TagListComponent implements OnInit, OnChanges {
    @Input() tags: Array<TagModel>;
    private _lineTagList: Array<TagModel>;
    constructor() {}

    ngOnInit() {}

    ngOnChanges() {
        this._lineTagList = this.tags.slice(0, 4);
    }
}
