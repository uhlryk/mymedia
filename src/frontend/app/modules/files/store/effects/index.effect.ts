import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AppState } from "../../../../reducers";
import * as actions from "../actions/index.action";
import { Action, select, Store } from "@ngrx/store";
import { filter, tap, withLatestFrom } from "rxjs/operators";
import IpcProvider from "../../../../providers/ipc.provider";
import IpcProviderResourceEnums from "../../../../../../shared/IpcProviderResourceEnums";
import IResource from "../../../../../../shared/types/resource.interface";
import ITag from "../../../../../../shared/types/tag.interface";
import { ProjectState } from "../reducers/index.reducer";
import { projectFeatureSelector } from "../selectors/index.selector";

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
                withLatestFrom(this.store$.pipe(select(projectFeatureSelector))),
                tap(([action, projectState]: [Action, ProjectState]) => {
                    IpcProvider.trigger(IpcProviderResourceEnums.SAVE_PROJECT, {
                        project: {
                            resourceList: projectState.resourceList,
                            tagList: projectState.tagList
                        }
                    });
                })
            ),
        { dispatch: false }
    );

    executeResource = createEffect(
        () =>
            this.actions$.pipe(
                ofType(actions.executeResource),
                withLatestFrom(this.store$.pipe(select(projectFeatureSelector))),
                tap(([action, projectState]: [{ resourceId: string}, ProjectState]) => {
                    const selectedResource: IResource = projectState.resourceList.find(
                        (resource: IResource) => resource.id === action.resourceId
                    );
                    IpcProvider.trigger(IpcProviderResourceEnums.EXECUTE_RESOURCE, {
                        filePath: selectedResource.filePath
                    });
                })
            ),
        { dispatch: false }
    );
    constructor(private actions$: Actions, private store$: Store<AppState>) {}
}
