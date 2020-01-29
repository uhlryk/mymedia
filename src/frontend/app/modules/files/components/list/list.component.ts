import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output
} from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { ProjectState } from "../../store/reducers/index.reducer";
import { listSelector } from "../../store/selectors/index.selector";
import {AppState} from "../../../../reducers";

@Component({
    selector: "app-list",
    templateUrl: "./list.component.html",
    styleUrls: ["./list.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit, OnChanges {
    resourceIdList$: Observable<Array<string>>;
    constructor(private store: Store<AppState>) {}

    ngOnInit() {
        this.resourceIdList$ = this.store.pipe(select(listSelector));
    }

    ngOnChanges() {}

    log(val) {
        console.log(val);
    }
}
