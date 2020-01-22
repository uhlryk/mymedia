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
import { ProjectState } from "../../../../store/reducers";
import {Observable} from "rxjs";
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
        // this.clickDetailsButton.emit(this.resourceId);
    }

    onClickDeleteButton() {
        // this.clickDeleteButton.emit(this.resourceId);
    }

    onClickThumbnail() {
        // this.clickThumbnail.emit(this.resourceId);
    }

    log(val) {
        console.log(val);
    }
}
