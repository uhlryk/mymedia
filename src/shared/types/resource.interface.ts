export default interface ResourceInterface {
    filePath: string;
    fileName: string;
    title: string;
    size: number;
    length: number;
    ranking: number;
    description: string;
    id: string;
    tags: Array<string>;
    isRemoved: boolean;
    isNew: boolean;
    thumbnailPath: string;
}
