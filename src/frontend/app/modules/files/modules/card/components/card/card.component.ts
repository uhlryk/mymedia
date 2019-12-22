import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
import ResourceModel from "../../../../../../models/resource.model";
@Component({
    selector: "app-card",
    templateUrl: "./card.component.html",
    styleUrls: ["./card.component.scss"]
})
export class CardComponent implements OnInit, OnChanges {
    @Input("id")
    private _id: string;
    @Input("rating")
    private _rating: number;
    @Input("title")
    private _title: string;
    @Input("thumbnailPath")
    private _thumbnailPath: string;
    @Input("isNew")
    private _isNew: boolean;

    @Input("tagList") _tagList: Array<{
        id: string;
        name: string;
    }>;

    // @Input() resource: ResourceModel;
    @Output() clickDetailsButton = new EventEmitter<string>();
    @Output() clickThumbnail = new EventEmitter<string>();

    rating: number = 0;
    constructor() {}

    ngOnInit() {}
    ngOnChanges() {
        // this.rating = this._rating;
    }
    onClickDetailsButton() {
        this.clickDetailsButton.emit(this._id);
    }

    onClickThumbnail() {
        this.clickThumbnail.emit(this._id);
    }

    get tagList(): Array<{
        id: string;
        name: string;
    }> {
        return this._tagList;
    }

    // get rating(): number {
    //     console.log("AAAAAAAAAAAa");
    //     console.log(this._rating);
    //     return this._rating;
    // }

    // set rating(value: number) {
    //     // readonly should not be executed
    // }

    get title(): string {
        return this._title;
    }

    get thumbnailPath(): string {
        return this._thumbnailPath;
    }

    get isNew(): boolean {
        return this._isNew;
    }
}
