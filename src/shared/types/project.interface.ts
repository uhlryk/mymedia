import ResourceInterface from "./resource.interface";
import TagInterface from "./tag.interface";
export default interface ProjectInterface {
    resourceList: Array<ResourceInterface>;
    tagList: Array<TagInterface>;
}
