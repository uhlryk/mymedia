import File from "./File";
import Tag from "./Tag";
import TagGroup from "./TagGroup";

export  default class Project {
    files: File[] = [];
    tags: Tag[] = [];
    tagGroups: TagGroup[] = [];
}
