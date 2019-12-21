import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
import ResourceModel from "../../../../../../models/resource.model";
import TagModel from "../../../../../../models/tag.model";
import { TagModel as TagComponentModel } from "../../../tag-list/components/tag-list/tag-list.component";
@Component({
    selector: "app-card",
    templateUrl: "./card.component.html",
    styleUrls: ["./card.component.scss"]
})
export class CardComponent implements OnInit {
    @Input("rating")
    private _rating: number;
    @Input("title")
    private _title: string;
    @Input() resource: ResourceModel;
    @Output() clickDetailsButton = new EventEmitter<string>();
    @Output() clickThumbnail = new EventEmitter<string>();
    constructor() {}

    ngOnInit() {}
    onClickDetailsButton() {
        this.clickDetailsButton.emit(this.resource.getId());
    }

    onClickThumbnail() {
        this.clickThumbnail.emit(this.resource.getId());
    }

    get tagList(): Array<TagComponentModel> {
        return this.resource.getResourceTagModelList().map((tagModel: TagModel) => ({
            id: tagModel.getId(),
            name: tagModel.getName()
        }));
    }

    get rating(): number {
        return this._rating;
    }

    set rating(value: number) {
        // readonly should not be executed
    }

    get title(): string {
        return this._title;
    }
}
