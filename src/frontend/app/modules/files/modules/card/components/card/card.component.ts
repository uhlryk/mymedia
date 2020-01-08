import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output} from "@angular/core";
import TagModel from "../../../../../../models/tag.model";
import ITag from "../../../../../../../../shared/types/tag.interface";
import IResource from "../../../../../../../../shared/types/resource.interface";
@Component({
    selector: "app-card",
    templateUrl: "./card.component.html",
    styleUrls: ["./card.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnInit, OnChanges {
    @Input()
    private resource: IResource;
    // @Input()
    // private ranking: number;
    // @Input()
    // private title: string;
    // @Input()
    // private thumbnailPath: string;
    // @Input()
    // private isNew: boolean;

    @Input() tagList: Array<ITag>;

    // @Input() resource: ResourceModel;
    @Output() clickDetailsButton = new EventEmitter<string>();
    @Output() clickDeleteButton = new EventEmitter<string>();
    @Output() clickThumbnail = new EventEmitter<string>();
    _ranking: number;
    constructor() {}

    ngOnInit() {}
    ngOnChanges() {
        this._ranking = this.resource.ranking;
        console.log("CardComponent.ngOnChanges");
    }
    onClickDetailsButton() {
        this.clickDetailsButton.emit(this.resource.id);
    }

    onClickDeleteButton() {
        this.clickDeleteButton.emit(this.resource.id);
    }

    onClickThumbnail() {
        this.clickThumbnail.emit(this.resource.id);
    }

    log(val) {
        console.log(val);
    }
}
