import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AppState } from "../../../../reducers";
import * as ActionList from "../actions/index.action";
import { Action, select, Store } from "@ngrx/store";
import { tap, withLatestFrom } from "rxjs/operators";
import IpcProvider from "../../../../providers/ipc.provider";
import IpcProviderResourceEnums from "../../../../../../shared/IpcProviderResourceEnums";
import IResource from "../../../../../../shared/types/resource.interface";
import { ProjectState } from "../reducers/index.reducer";
import * as Selector  from "../selectors/index.selector";

@Injectable()
export class ProjectEffects {
    saveProject$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(
                    ActionList.Tag.removeTag,
                    ActionList.Tag.setTagName,
                    ActionList.Tag.createTag,
                    ActionList.Resource.setResourceTags,
                    ActionList.Resource.setResourceRanking,
                    ActionList.Resource.setResourceDescription,
                    ActionList.Resource.setResourceTitle,
                    ActionList.Resource.deleteResourceFromDeleteResourceMenu
                ),
                // tap((action: Action) => {})
                withLatestFrom(this.store$.pipe(select(Selector.Project.projectFeatureSelector))),
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
                ofType(ActionList.Resource.executeResource),
                withLatestFrom(this.store$.pipe(select(Selector.Project.projectFeatureSelector))),
                tap(([action, projectState]: [{ resourceId: string }, ProjectState]) => {
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
