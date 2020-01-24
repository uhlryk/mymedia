import { Component, OnDestroy, OnInit } from "@angular/core";

import { ProjectContextService } from "../../../../services/projectContext.service";
import IProject from "../../../../../../shared/types/project.interface";
import IResource from "../../../../../../shared/types/resource.interface";
import ITag from "../../../../../../shared/types/tag.interface";
import { Observable, Subscription } from "rxjs";
import { select, Store } from "@ngrx/store";
import { ProjectState } from "../../store/reducers";
import {
    setResourceDescription,
    setResourceRanking,
    setResourceTags,
    setResourceTitle
} from "../../store/actions/index.action";
import {resourceListSelector, tagListSelector} from "../../store/selectors/index.selector";

@Component({
    selector: "app-details-modal",
    templateUrl: "./details-modal.component.html",
    styleUrls: ["./details-modal.component.scss"]
})
export class DetailsModalComponent implements OnInit, OnDestroy {
    constructor(
        private projectContextService: ProjectContextService,
        private store: Store<{ project: ProjectState }>
    ) {}

    resourceList: Array<IResource>;
    tagList$: Observable<Array<ITag>>;
    resourceId: string;
    resource: IResource;
    thumbnailPath: string;
    visibleSidebar: boolean;
    _projectChange: Subscription;

    ngOnInit() {
        this._projectChange = this.store
            .pipe(select(resourceListSelector))
            .subscribe((resourceList: Array<IResource>) => {
                this.resourceList = resourceList;
                this.setResource();
            });
        this.tagList$ = this.store.pipe(select(tagListSelector));
    }
    private setResource() {
        if (this.resourceId) {
            this.resource = this.resourceList.find(
                (resource: IResource) => resource.id === this.resourceId
            );
            this.thumbnailPath = this.resource.thumbnailList[0];
        }
    }
    show(resourceId: string) {
        this.resourceId = resourceId;
        this.setResource();
        this.visibleSidebar = true;
    }

    onHide() {}
    clickOpenFile() {
        // this.projectContextService.openResource(this.resource.id);
    }
    setRanking(ranking) {
        this.store.dispatch(
            setResourceRanking({ resourceId: this.resource.id, ranking: ranking })
        );
    }
    onChangeAddedTags(selectedTagList: Array<string>) {
        console.log("AAA");
        console.log(selectedTagList);
        console.log(this.resource);
        this.store.dispatch(
            setResourceTags({ resourceId: this.resource.id, tags: selectedTagList })
        );
    }
    saveTitle(newTitle) {
        this.store.dispatch(
            setResourceTitle({ resourceId: this.resource.id, title: newTitle })
        );
    }
    saveDescription(text) {
        this.store.dispatch(
            setResourceDescription({ resourceId: this.resource.id, description: text })
        );
    }
    changeThumbnail(thumbnailPath) {
        this.thumbnailPath = thumbnailPath;
    }
    ngOnDestroy() {
        if (this._projectChange) {
            this._projectChange.unsubscribe();
        }
    }
}
