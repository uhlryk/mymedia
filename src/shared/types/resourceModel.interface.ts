export default interface ResourceModelInterface {
    id: string;
    ranking: number;
    title: string;
    thumbnailList?: Array<string>;
    isNew: boolean;
    filePath: string;
    fileName: string;
    size: number;
    duration: number;
    width: number;
    height: number;
    description: string;
    isRemoved: boolean;
    tags: Array<string>;
}
