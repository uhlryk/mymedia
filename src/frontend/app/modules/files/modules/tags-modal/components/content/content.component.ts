import { Component, OnInit } from "@angular/core";
import ITag from "../../../../../../../../shared/types/tag.interface";
import { AppState } from "../../../../../../reducers";
import { select, Store } from "@ngrx/store";
import * as Selector from "../../../../store/selectors/index.selector";
import { Observable } from "rxjs";
import { Tag, UI } from "../../../../store/actions/index.action";

@Component({
    templateUrl: "./content.component.html",
    styleUrls: ["./content.component.scss"]
})
export class ContentComponent implements OnInit {
    tagList$: Observable<Array<ITag>>;

    constructor(private store$: Store<AppState>) {}

    ngOnInit() {
        this.tagList$ = this.store$.pipe(select(Selector.Tag.treeOrderedListSelector));
    }

    onNewTag() {
        this.store$.dispatch(Tag.createTag());
    }

    onEditTag(tagId, newName) {
        this.store$.dispatch(Tag.setTagName({ tagId: tagId, name: newName }));
    }
    onRemoveTag(tagId) {
        this.store$.dispatch(UI.showDeleteTagMenu({ tagId: tagId }));
    }
    onCreateSubTag(tagId) {
        this.store$.dispatch(Tag.createSubTag({ parentId: tagId }));
    }
}
