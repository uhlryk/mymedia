import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "../../../reducers";
import IpcProvider from "../../../providers/ipc.provider";
import IpcProviderResourceEnums from "../../../../../shared/IpcProviderResourceEnums";
import * as Actions from "../store/actions/index.action";
import { Injectable } from "@angular/core";
import IResource from "../../../../../shared/types/resource.interface";

@Injectable({
    providedIn: "root"
})
export class LoadResourceListResolverService implements Resolve<Array<IResource>> {
    constructor(private store: Store<AppState>) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<Array<IResource>> {
        return IpcProvider.request(IpcProviderResourceEnums.GET_RESOURCE_LIST).then(
            (resourceList: Array<IResource>) => {
                this.store.dispatch(
                    Actions.Resource.setResourceList({
                        resourceList: resourceList
                    })
                );
                return resourceList;
            }
        );
    }
}
