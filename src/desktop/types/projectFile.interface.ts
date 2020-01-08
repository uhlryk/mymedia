import ResourceFileInterface from "./resourceFile.interface";
import ITag from "../../shared/types/tag.interface";
export default interface ProjectFileInterface {
    resourceList: Array<ResourceFileInterface>;
    tagList: Array<ITag>;
}
