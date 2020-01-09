import ITag from "../../../../../shared/types/tag.interface";

export default interface ISearch {
    tagList: Array<ITag>;
    text: string;
}
