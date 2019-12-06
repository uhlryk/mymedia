import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import TagModel from "../../../../../../models/tag.model";

@Component({
    selector: "app-tag",
    templateUrl: "./tag.component.html",
    styleUrls: ["./tag.component.scss"]
})
export class TagComponent implements OnInit {
    @Input() tagModel: TagModel;
    @Output() clickTag = new EventEmitter<string>();

    constructor() {}

    ngOnInit() {}

    clickButton(tagId: string) {
        this.clickTag.emit(tagId);
    }
}
