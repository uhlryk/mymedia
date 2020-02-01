import { createSelector } from "@ngrx/store";
import IResource from "../../../../../../shared/types/resource.interface";
import ISearch from "../../types/search.interface";
import { projectFeatureSelector } from "./project.selector";
import { resourceListSelector } from "./resource.selector";
import { searchSelector } from "./search.selector";
import { orderSelector } from "./order.selector";
import { ProjectState } from "../reducers/index.reducer";

export const tagListSelector = createSelector(
    projectFeatureSelector,
    (project: ProjectState) => project.tagList
);
export const listSelector = createSelector(
    resourceListSelector,
    searchSelector,
    orderSelector,
    (resourceList: Array<IResource>, search: ISearch, order: string) => {
        console.log("Selector recalculated");
        return resourceList
            .filter((resource: IResource) => {
                if (
                    resource.isRemoved === false &&
                    resource.title.toLowerCase().includes(search.text.toLowerCase())
                ) {
                    if (search.tagIdList.length) {
                        return search.tagIdList.every(
                            (searchTagId: string) => !!resource.tags.includes(searchTagId)
                        );
                    }
                    return true;
                }
            })
            .sort((prev, next) => {
                switch (order) {
                    case "NAME_DESC":
                        return prev.title > next.title ? -1 : 1;
                    case "RATING_ASC":
                        return prev.ranking - next.ranking;
                    case "RATING_DESC":
                        return next.ranking - prev.ranking;
                    case "SIZE_ASC":
                        return prev.size - next.size;
                    case "SIZE_DESC":
                        return next.size - prev.size;
                    case "":
                    case "NAME_ASC":
                    default:
                        return prev.title < next.title ? -1 : 1;
                }
            })
            .map((resource: IResource) => resource.id);
    }
);
