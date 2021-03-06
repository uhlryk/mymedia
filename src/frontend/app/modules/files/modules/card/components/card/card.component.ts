import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnChanges,
    OnInit
} from "@angular/core";
import ITag from "../../../../../../../../shared/types/tag.interface";
import IResource from "../../../../../../../../shared/types/resource.interface";
import { Store, select } from "@ngrx/store";
import { ProjectState } from "../../../../store/reducers/index.reducer";
import { Observable } from "rxjs";
import {
    UI, Resource
} from "../../../../store/actions/index.action";
@Component({
    selector: "app-card",
    templateUrl: "./card.component.html",
    styleUrls: ["./card.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnInit, OnChanges {
    @Input() resourceId: string;

    resource$: Observable<IResource>;
    tagList$: Observable<Array<ITag>>;
    constructor(private store: Store<{ project: ProjectState }>) {}

    ngOnInit() {}
    ngOnChanges() {
        this.resource$ = this.store.pipe(
            select(store =>
                store.project.resourceList.list.find(
                    (resource: IResource) => resource.id === this.resourceId
                )
            )
        );
        this.tagList$ = this.store.pipe(select(store => store.project.tagList.list));
    }

    onClickDetailsButton() {
        this.store.dispatch(
            UI.showRightMenu({
                resourceId: this.resourceId
            })
        );
    }

    onClickDeleteButton() {
        this.store.dispatch(
            UI.showDeleteResourceMenu({
                resourceId: this.resourceId
            })
        );
    }

    onClickThumbnail() {
        this.store.dispatch(
            Resource.executeResource({
                resourceId: this.resourceId
            })
        );
    }

    checkIfNew(resourceAddedTimestamp: number) {
        const addedDate = new Date(resourceAddedTimestamp);
        addedDate.setDate(addedDate.getDate() + 1);
        const currentDate = new Date();
        return addedDate.getTime() > currentDate.getTime();
    }
}
