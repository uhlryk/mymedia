import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output
} from "@angular/core";
import ResourceModel from "../../../../models/resource.model";
import TagModel from "../../../../models/tag.model";
import IResource from "../../../../../../shared/types/resource.interface";
import ITag from "../../../../../../shared/types/tag.interface";
import ISearch from "../../types/search.interface";

@Component({
    selector: "app-list",
    templateUrl: "./list.component.html",
    styleUrls: ["./list.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit, OnChanges {
    @Input() resourceList: Array<IResource>;
    @Input() tagList: Array<ITag>;
    @Input() search: ISearch;
    @Input() orderMethod: string;
    @Output() clickThumbnail = new EventEmitter<string>();
    @Output() clickDetailsButton = new EventEmitter<string>();

    _managedResourceList: Array<IResource>;
    constructor() {}

    ngOnInit() {}

    ngOnChanges() {
        console.log("ListComponent.ngOnChanges");
        this._managedResourceList = this.resourceList
            .filter((resource: IResource) => {
                if (this.search) {
                    if (
                        resource.title
                            .toLowerCase()
                            .includes(this.search.text.toLowerCase())
                    ) {
                        if (this.search.tagIdList && this.search.tagIdList.length) {
                            return this.search.tagIdList.every(
                                (searchTagId: string) =>
                                    !!resource.tags.includes(searchTagId)
                            );
                        }
                        return true;
                    }
                } else {
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

    log(val) {
        console.log(val);
    }

    trackByList(index, resource: IResource) {
        if (resource) {
            return resource.id;
        }
        return null;
    }
}
