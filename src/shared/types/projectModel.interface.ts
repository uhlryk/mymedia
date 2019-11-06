import ResourceModelInterface from "./resourceModel.interface";
import TagInterface from "./tag.interface";
export default interface ProjectModelInterface {
    resourceList: Array<ResourceModelInterface>;
    tagList: Array<TagInterface>;
}
