import { Component, OnInit } from "@angular/core";
import { ProjectContextService } from "../../services/projectContext.service";
import { FileService } from "../../services/file.service";
import { Router } from "@angular/router";

@Component({
    templateUrl: "files.component.html"
})
export class FilesComponent implements OnInit {
    fileList;
    constructor(
        private projectContextService: ProjectContextService,
        private fileService: FileService,
        private router: Router
    ) {}
    ngOnInit() {
        const files = this.projectContextService.getFiles();
        this.fileList = files;
    }

    openFile(fileId) {
        const selectedFile = this.projectContextService.getFile(fileId);

        this.fileService.open(
            this.projectContextService.getProjectPath(),
            selectedFile.filePath
        );
    }

    showFileDetails(fileId) {
        console.log(fileId);
        this.router.navigate([`/files/${fileId}`]);
    }
}
