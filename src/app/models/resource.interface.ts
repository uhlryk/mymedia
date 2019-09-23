export default interface ResourceInterface {
    filePath: string;
    fileName: string;
    title: string;
    size: number;
    rating: number;
    description: string;
    id: string;
    tags: Array<string>;
}
