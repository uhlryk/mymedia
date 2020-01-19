import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output
} from "@angular/core";
import IResource from "../../../../../../shared/types/resource.interface";
import ITag from "../../../../../../shared/types/tag.interface";
import ISearch from "../../types/search.interface";
import { AppState } from "../../../../reducers";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {ProjectState} from "../../reducers";

@Component({
    selector: "app-list",
    templateUrl: "./list.component.html",
    styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit, OnChanges {
    tagList$: Observable<Array<ITag>>;
    resourceList$: Observable<Array<IResource>>;
    @Output() clickThumbnail = new EventEmitter<string>();
    @Output() clickDetailsButton = new EventEmitter<string>();
    @Output() clickDeleteButton = new EventEmitter<string>();
    constructor(private store: Store<{ project: ProjectState}>) {}

    ngOnInit() {
        this.resourceList$ = this.store.pipe(
            map(state => {
                return state.project.resourceList
                    .filter((resource: IResource) => {
                        if (
                            resource.title
                                .toLowerCase()
                                .includes(state.project.search.text.toLowerCase())
                        ) {
                            if (state.project.search.tagIdList.length) {
                                return state.project.search.tagIdList.every(
                                    (searchTagId: string) =>
                                        !!resource.tags.includes(searchTagId)
                                );
                            }
                            return true;
                        }
                    })
                    .sort((prev, next) => {
                        switch (state.project.order) {
                            case "NAME_DESC":
                                return prev.title > next.title ? -1 : 1;
                            case "RATING_ASC":
                                return prev.ranking - next.ranking;
                            case "RATING_DESC":
                                return next.ranking - prev.ranking;
                            case "SIZE_ASC":
                                return prev.size - next.size;
                            case "SIZE_DESC":
                                return next.size - prev.size;
                            case "":
                            case "NAME_ASC":
                            default:
                                return prev.title < next.title ? -1 : 1;
                        }
                    });
            })
        );
        this.tagList$ = this.store.pipe(map(state => state.project.tagList));
    }

    ngOnChanges() {
        // console.log("ListComponent.ngOnChanges");
        // this._managedResourceList = this.resourceList
        //     .filter((resource: IResource) => {
        //         if (this.search) {
        //             if (
        //                 resource.title
        //                     .toLowerCase()
        //                     .includes(this.search.text.toLowerCase())
        //             ) {
        //                 if (this.search.tagIdList && this.search.tagIdList.length) {
        //                     return this.search.tagIdList.every(
        //                         (searchTagId: string) =>
        //                             !!resource.tags.includes(searchTagId)
        //                     );
        //                 }
        //                 return true;
        //             }
        //         } else {
        //             return true;
        //         }
        //     })
        //     .sort((prev, next) => {
        //         switch (this.orderMethod) {
        //             case "NAME_DESC":
        //                 return prev.title > next.title ? -1 : 1;
        //             case "RATING_ASC":
        //                 return prev.ranking - next.ranking;
        //             case "RATING_DESC":
        //                 return next.ranking - prev.ranking;
        //             case "SIZE_ASC":
        //                 return prev.size - next.size;
        //             case "SIZE_DESC":
        //                 return next.size - prev.size;
        //             case "":
        //             case "NAME_ASC":
        //             default:
        //                 return prev.title < next.title ? -1 : 1;
        //         }
        //     });
    }

    onClickThumbnail(resourceId: string) {
        this.clickThumbnail.emit(resourceId);
    }
    onClickDetailsButton(resourceId: string) {
        this.clickDetailsButton.emit(resourceId);
    }

    onClickDeleteButton(resourceId: string) {
        this.clickDeleteButton.emit(resourceId);
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
