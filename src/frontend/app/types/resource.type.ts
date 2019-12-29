import Tag from "./tag.type";

export default interface Card {
    id: string;
    ranking: number;
    title: string;
    thumbnailPath: string;
    isNew: boolean;
    tagList: Array<Tag>;
}
