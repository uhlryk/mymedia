import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AppState } from "../../../../reducers";
import * as ActionList from "../actions/index.action";
import { Store } from "@ngrx/store";
import { mergeMap, tap } from "rxjs/operators";
import IpcProvider from "../../../../providers/ipc.provider";
import IpcProviderResourceEnums from "../../../../../../shared/IpcProviderResourceEnums";

@Injectable()
export class ProjectListEffects {
    removeProject$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ActionList.Project.deleteProjectFromProjectList),
                mergeMap(action => {
                    return IpcProvider.request(
                        IpcProviderResourceEnums.REMOVE_PROJECT_FROM_LIST,
                        {
                            projectPath: action.projectPath
                        }
                    );
                })
            ),
        { dispatch: false }
    );

    constructor(private actions$: Actions, private store$: Store<AppState>) {}
}
