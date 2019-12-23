import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
import Tag from "../../../../../../types/tag.type";
@Component({
    selector: "app-card",
    templateUrl: "./card.component.html",
    styleUrls: ["./card.component.scss"]
})
export class CardComponent implements OnInit, OnChanges {
    @Input()
    private id: string;
    @Input()
    private rating: number;
    @Input()
    private title: string;
    @Input()
    private thumbnailPath: string;
    @Input()
    private isNew: boolean;

    @Input() tagList: Array<Tag>;

    // @Input() resource: ResourceModel;
    @Output() clickDetailsButton = new EventEmitter<string>();
    @Output() clickThumbnail = new EventEmitter<string>();
    _rating: number;
    constructor() {}

    ngOnInit() {}
    ngOnChanges() {
        this._rating = this.rating;
        console.log("CardComponent.ngOnChanges");
    }
    onClickDetailsButton() {
        this.clickDetailsButton.emit(this.id);
    }

    onClickThumbnail() {
        this.clickThumbnail.emit(this.id);
    }

}
