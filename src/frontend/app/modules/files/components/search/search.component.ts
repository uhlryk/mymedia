import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
import ISearch from "../../types/search.interface";
import ITag from "../../../../../../shared/types/tag.interface";
import { AppState } from "../../../../reducers";
import { Observable } from "rxjs";
import { select, Store } from "@ngrx/store";
import {
    tagListSelector,
    tagsSearchSelector,
    textSearchSelector
} from "../../store/selectors/index.selector";
import {setSearchTags, setSearchText} from "../../store/actions/index.action";

@Component({
    selector: "app-search",
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit, OnChanges {
    searchTagIdList$: Observable<Array<string>>;
    projectTagIdList$: Observable<Array<ITag>>;
    searchText$: Observable<string>;
    constructor(private store: Store<AppState>) {}

    ngOnInit() {
        this.searchTagIdList$ = this.store.pipe(select(tagsSearchSelector));
        this.projectTagIdList$ = this.store.pipe(select(tagListSelector));
        this.searchText$ = this.store.pipe(select(textSearchSelector));
    }

    ngOnChanges() {
        // this._selectedTagList = this;
        // this._searchInput = "";
    }

    onChangeSearchText(inputText) {
        this.store.dispatch(
            setSearchText({
                text: inputText
            })
        );
    }

    onChangeSearchTagList(selectedTagList: Array<string>) {
        this.store.dispatch(
            setSearchTags({
                tagIdList: selectedTagList
            })
        );
    }
}
