import { createSelector } from "@ngrx/store";
import IResource from "../../../../../../shared/types/resource.interface";
import ISearch from "../../types/search.interface";
import { projectFeatureSelector } from "./project.selector";
import * as ResourceListSelector from "./resource.selector";
import { searchSelector } from "./search.selector";
import * as OrderSelector from "./order.selector";
import { ProjectState } from "../reducers/index.reducer";
import { TagState } from "../reducers/tag.reducer";
import ITag from "../../../../../../shared/types/tag.interface";

export const tagListSelector = createSelector(
    projectFeatureSelector,
    (project: ProjectState) => project.tagList
);

export const listSelector = createSelector(
    tagListSelector,
    (tagList: TagState) => tagList.list
);

export const treeOrderedListSelector = createSelector(
    listSelector,
    (list: Array<ITag>) => {
        const mainList = list.filter((tag: ITag) => !tag.parentId);
        const threeOrderdList = [];
        for (const mainTag of mainList) {
            threeOrderdList.push(mainTag);
            for (const subTag of list) {
                if (subTag.parentId === mainTag.id) {
                    threeOrderdList.push(subTag);
                }
            }
        }
        return threeOrderdList;
    }
);
