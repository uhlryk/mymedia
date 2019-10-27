export default interface ResourceInterface {
    filePath: string;
    fileName: string;
    title: string;
    size: number;
    ranking: number;
    description: string;
    id: string;
    tags: Array<string>;
    isRemoved: boolean;
    isNew: boolean;
    thumbnailPath: string;
}
