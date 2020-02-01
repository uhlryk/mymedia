import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
import ITag from "../../../../../../shared/types/tag.interface";
import { AppState } from "../../../../reducers";
import { Observable } from "rxjs";
import { select, Store } from "@ngrx/store";
import * as Selector from "../../store/selectors/index.selector";
import {Search} from "../../store/actions/index.action";

@Component({
    selector: "app-search",
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit {
    searchTagIdList$: Observable<Array<string>>;
    projectTagIdList$: Observable<Array<ITag>>;
    searchText$: Observable<string>;
    constructor(private store: Store<AppState>) {}

    ngOnInit() {
        this.searchTagIdList$ = this.store.pipe(select(Selector.Search.tagsSearchSelector));
        this.projectTagIdList$ = this.store.pipe(select(Selector.Tag.listSelector));
        this.searchText$ = this.store.pipe(select(Selector.Search.textSearchSelector));
    }

    onChangeSearchText(inputText) {
        this.store.dispatch(
            Search.setSearchText({
                text: inputText
            })
        );
    }

    onChangeSearchTagList(selectedTagList: Array<string>) {
        this.store.dispatch(
            Search.setSearchTags({
                tagIdList: selectedTagList
            })
        );
    }
}
