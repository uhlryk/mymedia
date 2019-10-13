import { Injectable } from "@angular/core";
import ResourceModel from "../models/resource.model";
import { Observable, Observer } from "rxjs";

@Injectable()
export class ResultManipulationService {
    private _searchTerm = "";
    private _orderType = "";
    private _observer: Observer<any>;
    private _resourceList: Array<ResourceModel>;
    constructor() {}

    public setSearch(searchTerm: string = "") {
        this._searchTerm = searchTerm;
        this.compute();
    }

    public setOrder(orderType: string) {
        this._orderType = orderType;
        this.compute();
    }
    public compute() {
        let newList = this._resourceList.filter(resource => {
            if (
                resource
                    .getTitle()
                    .toLowerCase()
                    .includes(this._searchTerm.toLowerCase())
            ) {
                return true;
            }
            const matchedFileTags = resource.getResourceTagModelList().filter(tagModel =>
                tagModel
                    .getName()
                    .toLowerCase()
                    .includes(this._searchTerm.toLowerCase())
            );
            if (matchedFileTags.length > 0) {
                return true;
            }
        });
        if (this._orderType) {
            newList = newList.sort((prev, next) => {
                if (prev.getSize() < next.getSize()) {
                    return -1;
                } else if (prev.getSize() === next.getSize()) {
                    return 0;
                } else {
                    return 1;
                }
            });
        }
        // newList = newList.slice(0, 20);
        this._observer.next(newList);
    }

    public manipulate(
        resourceList: Array<ResourceModel>
    ): Observable<Array<ResourceModel>> {
        this._resourceList = resourceList;
        return new Observable(observer => {
            this._observer = observer;
        });
    }
}
