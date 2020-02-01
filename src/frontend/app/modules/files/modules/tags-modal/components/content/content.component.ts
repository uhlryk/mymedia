import { Component, OnInit } from "@angular/core";
import ITag from "../../../../../../../../shared/types/tag.interface";
import { AppState } from "../../../../../../reducers";
import { select, Store } from "@ngrx/store";
import * as Selector from "../../../../store/selectors/index.selector";
import { Observable } from "rxjs";
import { Tag } from "../../../../store/actions/index.action";

@Component({
    templateUrl: "./content.component.html",
    styleUrls: ["./content.component.scss"]
})
export class ContentComponent implements OnInit {
    tagName: string;
    tagList$: Observable<Array<ITag>>;

    constructor(private store: Store<AppState>) {}

    ngOnInit() {
        this.tagList$ = this.store.pipe(select(Selector.Tag.listSelector));
    }

    onNewTag() {
        this.store.dispatch(Tag.createTag({ name: this.tagName }));
        this.tagName = "";
    }

    onEditTag(tagId, newName) {
        this.store.dispatch(Tag.setTagName({ tagId: tagId, name: newName }));
        this.tagName = "";
    }
    onRemoveTag(tagId) {
        this.store.dispatch(Tag.removeTag({ tagId: tagId }));
        this.tagName = "";
    }
}
