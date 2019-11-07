import ResourceFileInterface from "./resourceFile.interface";
import TagInterface from "../../shared/types/tag.interface";
export default interface ProjectFileInterface {
    resourceList: Array<ResourceFileInterface>;
    tagList: Array<TagInterface>;
}
