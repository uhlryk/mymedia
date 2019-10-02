import { Component, Input, OnInit } from "@angular/core";
import ResourceModel from "../../../../models/resource.model";
import { ThumbnailService } from "../../../../services/thumbnail.service";

@Component({
    selector: "[app-row]",
    templateUrl: "./row.component.html",
    styleUrls: ["./row.component.scss"]
})
export class RowComponent implements OnInit {
    @Input() resource: ResourceModel;
    private thumbnail: string = "";
    constructor(
        private thumbnailService: ThumbnailService
    ) {}

    ngOnInit() {
        this.thumbnailService.getThumbnail(this.resource).subscribe(thumbnail => {
            this.thumbnail = thumbnail;
        });
    }
}
