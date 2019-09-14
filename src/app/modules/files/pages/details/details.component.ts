import { Component, OnInit } from "@angular/core";
import { ProjectContextService } from "../../../../services/projectContext.service";
import { ActivatedRoute } from "@angular/router";
import File from "../../../../types/File";
import Tag from "../../../../types/Tag";

@Component({
    selector: "app-file",
    templateUrl: "./details.component.html",
    styleUrls: ["./details.component.scss"]
})
export class DetailsComponent implements OnInit {
    file: File;
    fileTags: Array<Tag>;
    projectTags: Array<Tag>;
    selectedTagId: string;
    constructor(
        private projectContextService: ProjectContextService,
        private route: ActivatedRoute
    ) {
        this.projectTags = this.projectContextService.getTags().slice();
    }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            const fileId: string = params.get("fileId");
            this.file = this.projectContextService.getFile(fileId);
            this.fileTags = this.projectContextService.getFileTags(fileId);
            this.fileTags.forEach(fileTag => {
                this.projectTags.splice(
                    this.projectTags.findIndex(tag => tag.id === fileTag.id),
                    1
                );
            });
            this.selectedTagId = "";
        });
    }

    openFile() {
        this.projectContextService.openFile(this.file.id);
    }

    addTag() {
        console.log(this.selectedTagId);
        this.projectTags.splice(
            this.projectTags.findIndex(tag => tag.id === this.selectedTagId),
            1
        );

        // this.selectedTag = this.initTag;
        this.projectContextService.addTagToFile(this.file.id, this.selectedTagId);
        this.selectedTagId = "";
        this.projectContextService.saveProject().subscribe(() => {
            this.file = this.projectContextService.getFile(this.file.id);
            this.fileTags = this.projectContextService.getFileTags(this.file.id);
        });
    }

    removeTag(tagId) {
        this.projectContextService.removeTagFromFile(this.file.id, tagId);
        this.projectContextService.saveProject().subscribe(() => {
            this.file = this.projectContextService.getFile(this.file.id);
            this.fileTags = this.projectContextService.getFileTags(this.file.id);
            this.projectTags = this.projectContextService.getTags().slice();
            this.fileTags.forEach(fileTag => {
                this.projectTags.splice(
                    this.projectTags.findIndex(tag => tag.id === fileTag.id),
                    1
                );
            });
        });
    }

    saveTitle(newTitle) {
        this.file.newFileName = newTitle;
        this.projectContextService.saveProject().subscribe(() => {});
    }

    saveDescription(text) {
        this.file.description = text;
        this.projectContextService.saveProject().subscribe(() => {});
    }
}
