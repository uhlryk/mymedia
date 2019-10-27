import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import ResourceModel from "../../../../models/resource.model";
import { ThumbnailService } from "../../../../services/thumbnail.service";

@Component({
    selector: "app-row",
    templateUrl: "./row.component.html",
    styleUrls: ["./row.component.scss"]
})
export class RowComponent implements OnInit {
    @Input() resource: ResourceModel;
    @Output() openThumbnailModal = new EventEmitter<string>();
    @Output() openDetailsModal = new EventEmitter<string>();
    @Output() executeMedia = new EventEmitter<string>();
    private thumbnail: string = "";
    constructor() // private thumbnailService: ThumbnailService
    {}

    ngOnInit() {
    }

    clickThumbanil() {
        this.openThumbnailModal.emit(this.resource.getId());
    }

    clickOpenDetails() {
        this.openDetailsModal.emit(this.resource.getId());
    }

    clickExecuteMedia() {
        this.executeMedia.emit(this.resource.getId());
    }
}
