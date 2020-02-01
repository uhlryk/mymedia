import {
    Component,
    Input,
    OnInit,
    OnChanges,
    ChangeDetectionStrategy,
    OnDestroy
} from "@angular/core";
import { select, Store } from "@ngrx/store";
import { ProjectState } from "../../../../store/reducers/index.reducer";
import {
    resourceListSelector,
    tagListSelector
} from "../../../../store/selectors/index.selector";
import IResource from "../../../../../../../../shared/types/resource.interface";
import { Observable, Subscription } from "rxjs";
import ITag from "../../../../../../../../shared/types/tag.interface";
import {
    Resource
} from "../../../../store/actions/index.action";

@Component({
    selector: "app-details",
    templateUrl: "./details.component.html",
    styleUrls: ["./details.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsComponent implements OnInit, OnChanges, OnDestroy {
    @Input() resourceId: string;
    resourceListChange: Subscription;
    resourceList: Array<IResource>;
    tagList$: Observable<Array<ITag>>;
    resource: IResource;
    thumbnailPath: string;
    constructor(private store: Store<{ project: ProjectState }>) {}

    ngOnInit() {
        this.tagList$ = this.store.pipe(select(tagListSelector));
        this.resourceListChange = this.store
            .pipe(select(resourceListSelector))
            .subscribe((resourceList: Array<IResource>) => {
                this.resourceList = resourceList;
                this.changeResource();
            });
    }

    private changeResource() {
        if (this.resourceId) {
            this.resource = this.resourceList.find(
                (resource: IResource) => resource.id === this.resourceId
            );
            this.thumbnailPath = this.resource.thumbnailList[0];
        }
    }
    ngOnChanges() {
        this.changeResource();
    }

    clickOpenFile() {
        this.store.dispatch(Resource.executeResource({
            resourceId: this.resourceId
        }));
    }
    setRanking(ranking) {
        this.store.dispatch(
            Resource.setResourceRanking({ resourceId: this.resource.id, ranking: ranking })
        );
    }
    onChangeAddedTags(selectedTagList: Array<string>) {
        this.store.dispatch(
            Resource.setResourceTags({ resourceId: this.resource.id, tags: selectedTagList })
        );
    }
    saveTitle(newTitle) {
        this.store.dispatch(
            Resource.setResourceTitle({ resourceId: this.resource.id, title: newTitle })
        );
    }
    saveDescription(text) {
        this.store.dispatch(
            Resource.setResourceDescription({ resourceId: this.resource.id, description: text })
        );
    }
    changeThumbnail(thumbnailPath) {
        this.thumbnailPath = thumbnailPath;
    }

    ngOnDestroy() {
        if (this.resourceListChange) {
            this.resourceListChange.unsubscribe();
        }
    }
}
