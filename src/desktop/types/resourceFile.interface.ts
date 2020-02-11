export default interface ResourceFileInterface {
    id: string;
    filePath: string;
    fileName: string;
    title: string;
    ranking: number;
    size: number;
    duration: number;
    width: number;
    height: number;
    description: string;
    tags: Array<string>;
    isNew: boolean;
    isRemoved: boolean;
    thumbnailPath: string;
}
