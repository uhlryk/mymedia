import { Injectable } from "@angular/core";
import ResourceModel from "../models/resource.model";
import { Observable, Observer } from "rxjs";

@Injectable()
export class ResultManipulationService {
    private _searchTerm = "";
    private _observer: Observer<any>;
    private _resourceList: Array<ResourceModel>;
    constructor() {}

    public setSearch(searchTerm: string = "") {
        console.log("A2");
        this._searchTerm = searchTerm;
        this.compute();
    }

    public compute() {
        const newList = this._resourceList
            .filter(resource => {
                if (
                    resource
                        .getTitle()
                        .toLowerCase()
                        .includes(this._searchTerm.toLowerCase())
                ) {
                    return true;
                }
                const matchedFileTags = resource
                    .getResourceTagModelList()
                    .filter(tagModel =>
                        tagModel
                            .getName()
                            .toLowerCase()
                            .includes(this._searchTerm.toLowerCase())
                    );
                if (matchedFileTags.length > 0) {
                    return true;
                }
            })
            .slice(0, 20);
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
