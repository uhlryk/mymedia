import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "../../../reducers";
import IpcProvider from "../../../providers/ipc.provider";
import IpcProviderResourceEnums from "../../../../../shared/IpcProviderResourceEnums";
import * as Actions from "../store/actions/index.action";
import { Injectable } from "@angular/core";
import { IProjectListElement } from "../../../../../shared/types/project-list.interface";

@Injectable({
    providedIn: "root"
})
export class LoadProjectsResolverService implements Resolve<Array<IProjectListElement>> {
    constructor(private store: Store<AppState>) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<Array<IProjectListElement>> {
        return IpcProvider.request(IpcProviderResourceEnums.GET_PROJECT_LIST).then(
            projectList => {
                this.store.dispatch(
                    Actions.Project.setProjectList({
                        list: projectList
                    })
                );
                return projectList;
            }
        );
    }
}
