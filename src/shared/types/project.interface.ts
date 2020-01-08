import IResource from "./resource.interface";
import ITag from "./tag.interface";
export default interface IProject {
    resourceList: Array<IResource>;
    tagList: Array<ITag>;
}
