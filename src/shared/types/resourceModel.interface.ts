export default interface ResourceModelInterface {
    filePath: string;
    fileName: string;
    title: string;
    size: number;
    duration: number;
    width: number;
    height: number;
    ranking: number;
    description: string;
    id: string;
    tags: Array<string>;
    isRemoved: boolean;
    isNew: boolean;
    thumbnailPath?: string;
}
