import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output} from "@angular/core";
import TagModel from "../../../../../../models/tag.model";
@Component({
    selector: "app-card",
    templateUrl: "./card.component.html",
    styleUrls: ["./card.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnInit, OnChanges {
    @Input()
    private id: string;
    @Input()
    private ranking: number;
    @Input()
    private title: string;
    @Input()
    private thumbnailPath: string;
    @Input()
    private isNew: boolean;

    @Input() tagList: Array<TagModel>;

    // @Input() resource: ResourceModel;
    @Output() clickDetailsButton = new EventEmitter<string>();
    @Output() clickDeleteButton = new EventEmitter<string>();
    @Output() clickThumbnail = new EventEmitter<string>();
    _ranking: number;
    constructor() {}

    ngOnInit() {}
    ngOnChanges() {
        this._ranking = this.ranking;
        console.log("CardComponent.ngOnChanges");
    }
    onClickDetailsButton() {
        this.clickDetailsButton.emit(this.id);
    }

    onClickDeleteButton() {
        this.clickDeleteButton.emit(this.id);
    }

    onClickThumbnail() {
        this.clickThumbnail.emit(this.id);
    }

    log(val) {
        console.log(val);
    }
}
