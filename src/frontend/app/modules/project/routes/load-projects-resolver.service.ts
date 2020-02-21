import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "../../../reducers";
import IpcProvider from "../../../providers/ipc.provider";
import IpcProviderResourceEnums from "../../../../../shared/IpcProviderResourceEnums";
import * as Actions from "../store/actions/index.action";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class LoadProjectsResolverService implements Resolve<void> {
    constructor(private store: Store<AppState>) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
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
