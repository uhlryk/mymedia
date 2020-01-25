import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AppState } from "../../../../reducers";
import * as actions from "../actions/index.action";
import { Action, Store } from "@ngrx/store";
import { filter, tap, withLatestFrom } from "rxjs/operators";

@Injectable()
export class ProjectEffects {
    saveProject$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(
                    actions.removeTag,
                    actions.setTagName,
                    actions.createTag,
                    actions.setResourceTags,
                    actions.setResourceRanking,
                    actions.setResourceDescription,
                    actions.setResourceTitle
                ),
                // tap((action: Action) => {})
                withLatestFrom(this.store$),
                tap(([action, store]: [Action, AppState]) => {})
            ),
        { dispatch: false }
    );
    constructor(private actions$: Actions, private store$: Store<AppState>) {}
}
