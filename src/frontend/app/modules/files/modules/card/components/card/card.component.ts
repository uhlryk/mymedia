import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output
} from "@angular/core";
import ITag from "../../../../../../../../shared/types/tag.interface";
import IResource from "../../../../../../../../shared/types/resource.interface";
import { Store, select } from "@ngrx/store";
import { ProjectState } from "../../../../store/reducers/index.reducer";
import {Observable} from "rxjs";
import {executeResource, hideRightMenu, showRightMenu} from "../../../../store/actions/index.action";
@Component({
    selector: "app-card",
    templateUrl: "./card.component.html",
    styleUrls: ["./card.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnInit, OnChanges {
    @Input()
    private resource: IResource;
    @Input() tagList: Array<ITag>;
    @Input() resourceId: string;

    resource$: Observable<IResource>;
    tagList$;
    // @Output() clickDetailsButton = new EventEmitter<string>();
    // @Output() clickDeleteButton = new EventEmitter<string>();
    // @Output() clickThumbnail = new EventEmitter<string>();
    constructor(private store: Store<{ project: ProjectState }>) {}

    ngOnInit() {}
    ngOnChanges() {
        this.resource$ = this.store.pipe(
            select(store =>
                store.project.resourceList.find(
                    (resource: IResource) => resource.id === this.resourceId
                )
            )
        );
        this.tagList$ = this.store.pipe(select(store => store.project.tagList));
    }

    onClickDetailsButton() {
        this.store.dispatch(showRightMenu({
            resourceId: this.resourceId
        }));
        // this.clickDetailsButton.emit(this.resourceId);
    }

    onClickDeleteButton() {
        // this.clickDeleteButton.emit(this.resourceId);
    }

    onClickThumbnail() {
        this.store.dispatch(executeResource({
            resourceId: this.resourceId
        }));
    }

    log(val) {
        console.log(val);
    }
}
