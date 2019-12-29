import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
import ResourceModel from "../../../../models/resource.model";
import TagModel from "../../../../models/tag.model";

@Component({
    selector: "app-list",
    templateUrl: "./list.component.html",
    styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit, OnChanges {
    @Input() cardList: Array<ResourceModel>;
    @Input() searchText: string;
    @Input() searchTagList: Array<TagModel>;
    @Input() orderMethod: string;
    @Output() clickThumbnail = new EventEmitter<string>();
    @Output() clickDetailsButton = new EventEmitter<string>();

    _managedCardList: Array<ResourceModel>;
    constructor() {}

    ngOnInit() {}

    ngOnChanges() {
        console.log("ListComponent.ngOnChanges");
        this._managedCardList = this.cardList
            .filter(resource => {
                if (resource.title.toLowerCase().includes(this.searchText.toLowerCase())) {
                    if (this.searchTagList.length) {
                        return this.searchTagList.every(
                            (searchTag: TagModel) =>
                                !!resource.findTagModel(searchTag.id)
                        );
                    }
                    return true;
                }
            })
            .sort((prev, next) => {
                switch (this.orderMethod) {
                    case "NAME_DESC":
                        return prev.title > next.title ? -1 : 1;
                    case "RATING_ASC":
                        return prev.ranking - next.ranking;
                    case "RATING_DESC":
                        return next.ranking - prev.ranking;

                    case "":
                    case "NAME_ASC":
                    default:
                        return prev.title < next.title ? -1 : 1;
                }
            });
    }

    onClickThumbnail(resourceId: string) {
        this.clickThumbnail.emit(resourceId);
    }
    onClickDetailsButton(resourceId: string) {
        this.clickDetailsButton.emit(resourceId);
    }
}
