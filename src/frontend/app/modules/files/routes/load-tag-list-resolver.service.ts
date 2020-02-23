import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "../../../reducers";
import IpcProvider from "../../../providers/ipc.provider";
import IpcProviderResourceEnums from "../../../../../shared/IpcProviderResourceEnums";
import * as Actions from "../store/actions/index.action";
import { Injectable } from "@angular/core";
import ITag from "../../../../../shared/types/tag.interface";

@Injectable({
    providedIn: "root"
})
export class LoadTagListResolverService implements Resolve<Array<ITag>> {
    constructor(private store: Store<AppState>) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<Array<ITag>> {
        return IpcProvider.request(IpcProviderResourceEnums.GET_TAG_LIST).then(
            (tagList: Array<ITag>) => {
                this.store.dispatch(
                    Actions.Tag.setTagList({
                        tagList: tagList
                    })
                );
                return tagList;
            }
        );
    }
}
