export default interface IResource {
    id: string;
    filePath: string;
    fileName: string;
    title: string;
    ranking: number;
    size: number;
    duration?: number;
    width?: number;
    height?: number;
    description: string;
    tagIdList: Array<string>;
    added: number;
    thumbnailList: Array<string>;
}
