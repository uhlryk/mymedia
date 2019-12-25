import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
import ResourceModel from "../../../../models/resource.model";
import Tag from "../../../../types/tag.type";
import TagModel from "../../../../models/tag.model";
import Card from "../../../../types/card.type";

@Component({
    selector: "app-list",
    templateUrl: "./list.component.html",
    styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit, OnChanges {
    @Input() cardList: Array<Card>;
    @Input() searchText: string;
    @Input() searchTagList: Array<Tag>;
    @Output() clickThumbnail = new EventEmitter<string>();
    @Output() clickDetailsButton = new EventEmitter<string>();

    _managedCardList: Array<Card>;
    constructor() {}

    ngOnInit() {}

    ngOnChanges() {
        console.log("ListComponent.ngOnChanges");
        this._managedCardList = this.cardList.filter(card => {
            if (card.title.toLowerCase().includes(this.searchText.toLowerCase())) {
                if (this.searchTagList.length) {
                    return this.searchTagList.every(
                        (searchTag: Tag) =>
                            !!card.tagList.find((tag: Tag) => tag.id === searchTag.id)
                    );
                }
                return true;
            }
        });
    }

    onClickThumbnail(cardId: string) {
        this.clickThumbnail.emit(cardId);
    }
    onClickDetailsButton(cardId: string) {
        this.clickDetailsButton.emit(cardId);
    }
}
