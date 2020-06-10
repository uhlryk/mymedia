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
import * as Selector from "../selectors/index.selector";

@Injectable()
export class ProjectEffects {
    updateResource$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(
                    ActionList.Resource.setResourceTagList,
                    ActionList.Resource.setResourceRanking,
                    ActionList.Resource.setResourceDescription,
                    ActionList.Resource.setResourceTitle
                ),
                // tap((action: Action) => {})
                withLatestFrom(
                    this.store$.pipe(select(Selector.Project.projectFeatureSelector))
                ),
                tap(([action, projectState]: [{ resourceId }, ProjectState]) => {
                    const changedResource: IResource = projectState.resourceList.list.find(
                        (resource: IResource) => action.resourceId === resource.id
                    );
                    IpcProvider.trigger(IpcProviderResourceEnums.UPDATE_RESOURCE, {
                        resource: changedResource
                    });
                })
            ),
        { dispatch: false }
    );
    removeResource$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ActionList.Resource.deleteResourceFromDeleteResourceMenu),
                // tap((action: Action) => {})
                withLatestFrom(
                    this.store$.pipe(select(Selector.Project.projectFeatureSelector))
                ),
                tap(([action, projectState]: [{ resourceId }, ProjectState]) => {
                    IpcProvider.trigger(IpcProviderResourceEnums.REMOVE_RESOURCE, {
                        resourceId: action.resourceId
                    });
                })
            ),
        { dispatch: false }
    );
    saveTagList$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ActionList.Tag.setTagName, ActionList.Tag.createTag),
                // tap((action: Action) => {})
                withLatestFrom(
                    this.store$.pipe(select(Selector.Project.projectFeatureSelector))
                ),
                tap(([action, projectState]: [Action, ProjectState]) => {
                    IpcProvider.trigger(IpcProviderResourceEnums.SAVE_TAG_LIST, {
                        tagList: projectState.tagList.list
                    });
                })
            ),
        { dispatch: false }
    );
    removeTag$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ActionList.Tag.removeTag),
                // tap((action: Action) => {})
                withLatestFrom(
                    this.store$.pipe(select(Selector.Project.projectFeatureSelector))
                ),
                tap(([action, projectState]: [{ tagId }, ProjectState]) => {
                    IpcProvider.trigger(IpcProviderResourceEnums.REMOVE_TAG, {
                        tagId: action.tagId
                    });
                })
            ),
        { dispatch: false }
    );
    executeResource = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ActionList.Resource.executeResource),
                withLatestFrom(
                    this.store$.pipe(select(Selector.Project.projectFeatureSelector))
                ),
                tap(([action, projectState]: [{ resourceId: string }, ProjectState]) => {
                    const selectedResource: IResource = projectState.resourceList.list.find(
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
