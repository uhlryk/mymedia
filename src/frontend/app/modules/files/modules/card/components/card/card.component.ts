import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
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

    @Input() tagList: Array<{
        id: string;
        name: string;
    }>;

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

    // get tagList(): Array<{
    //     id: string;
    //     name: string;
    // }> {
    //     return this._tagList;
    // }

    // get rating(): number {
    //     console.log("AAAAAAAAAAAa");
    //     console.log(this._rating);
    //     return this._rating;
    // }

    // set rating(value: number) {
    //     // readonly should not be executed
    // }
    //
    // get title(): string {
    //     return this._title;
    // }
    //
    // get thumbnailPath(): string {
    //     return this._thumbnailPath;
    // }
    //
    // get isNew(): boolean {
    //     return this._isNew;
    // }
}
