import { Component, OnInit } from "@angular/core";
import { ProjectContextService } from "../../../../../../services/projectContext.service";
import IProject from "../../../../../../../../shared/types/project.interface";
import ITag from "../../../../../../../../shared/types/tag.interface";
import { AppState } from "../../../../../../reducers";
import { select, Store } from "@ngrx/store";
import { tagListSelector } from "../../../../store/selectors/index.selector";
import { Observable } from "rxjs";
import { createTag, removeTag, setTagName } from "../../../../store/actions/index.action";

@Component({
    templateUrl: "./content.component.html",
    styleUrls: ["./content.component.scss"]
})
export class ContentComponent implements OnInit {
    tagName: string;
    tagList$: Observable<Array<ITag>>;

    constructor(private store: Store<AppState>) {}

    ngOnInit() {
        this.tagList$ = this.store.pipe(select(tagListSelector));
    }

    onNewTag() {
        this.store.dispatch(createTag({ name: this.tagName }));
        this.tagName = "";
    }

    onEditTag(tagId, newName) {
        this.store.dispatch(setTagName({ tagId: tagId, name: newName }));
        this.tagName = "";
    }
    onRemoveTag(tagId) {
        this.store.dispatch(removeTag({ tagId: tagId }));
        this.tagName = "";
    }
}
