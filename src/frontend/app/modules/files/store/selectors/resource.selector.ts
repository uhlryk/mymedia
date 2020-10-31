import { createSelector } from "@ngrx/store";
import IResource from "../../../../../../shared/types/resource.interface";
import { projectFeatureSelector } from "./project.selector";
import { ProjectState } from "../reducers/index.reducer";
import { ResourceState } from "../reducers/resource.reducer";
import { searchSelector } from "./search.selector";
import * as TagSelector from "./tag.selector";
import * as OrderSelector from "./order.selector";
import ISearch from "../../types/search.interface";
import ITag from "../../../../../../shared/types/tag.interface";

export const resourceListSelector = createSelector(
    projectFeatureSelector,
    (project: ProjectState) => project.resourceList
);

export const listSelector = createSelector(
    resourceListSelector,
    (resourceList: ResourceState) => resourceList.list
);

export const resourceSelector = createSelector(
    listSelector,
    (list: Array<IResource>, props: { resourceId: string }) =>
        list.find((resource: IResource) => resource.id === props.resourceId)
);

export const managedListSelector = createSelector(
    listSelector,
    searchSelector,
    TagSelector.listSelector,
    OrderSelector.typeSelector,
    (list: Array<IResource>, search: ISearch, tagList, orderType: string) => {
        const searchTags = search.tagIdList.map(tagId =>
            tagList.find(tag => tag.id === tagId)
        );
        return list
            .filter((resource: IResource) => {
                if (
                    //       resource.isRemoved === false &&
                    !search.text ||
                    resource.title.toLowerCase().includes(search.text.toLowerCase())
                ) {
                    if (searchTags.length) {
                        const resourceTags = resource.tagIdList.map(tagId =>
                            tagList.find(tag => tag.id === tagId)
                        );
                        return searchTags.every(
                            (searchTag: ITag) =>
                                !!resourceTags.find(
                                    resourceTag =>
                                        resourceTag.id === searchTag.id ||
                                        resourceTag.parentId === searchTag.id
                                )
                        );

                        /*             return search.tagIdList.every(
                            (searchTagId: string) => !!resource.tagIdList.includes(searchTagId)
                        );*/
                    }
                    return true;
                }
            })
            .sort((prev, next) => {
                switch (orderType) {
                    case "NAME_DESC":
                        return prev.title > next.title ? -1 : 1;
                    case "CREATED_ASC":
                        return prev.added - next.added;
                    case "CREATED_DESC":
                        return next.added - prev.added;
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
