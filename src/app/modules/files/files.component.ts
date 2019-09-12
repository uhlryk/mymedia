import { Component, OnInit } from "@angular/core";
import { ProjectContextService } from "../../services/projectContext.service";
import { Router } from "@angular/router";

@Component({
    templateUrl: "files.component.html",
    styleUrls: ["./files.component.scss"]
})
export class FilesComponent implements OnInit {
    fileList;
    searchInput;
    constructor(
        private projectContextService: ProjectContextService,
        private router: Router
    ) {}
    ngOnInit() {
        this.fileList = this.projectContextService.getFiles();
    }

    openFile(fileId) {
        this.projectContextService.openFile(fileId);
    }

    showFileDetails(fileId) {
        this.router.navigate([`/files/${fileId}`]);
    }

    startSearch() {
        const projectTags = this.projectContextService
            .getTags()
            .filter(tag => tag.name.toLowerCase().includes(this.searchInput.toLowerCase()));
        this.fileList = this.projectContextService.getFiles().filter(file => {
            if (file.newFileName.toLowerCase().includes(this.searchInput.toLowerCase())) {
                return true;
            }
            const matchedFileTags = file.tags.filter(fileTagId =>
                !!projectTags.find(tag => (tag.id === fileTagId))
            );
            if (
                matchedFileTags.length > 0
            ) {
                return true;
            }
        });

    }
}
