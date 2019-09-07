import { Component, OnInit } from "@angular/core";
import { ProjectContextService } from "../../services/projectContext.service";
import { Router } from "@angular/router";

@Component({
    templateUrl: "files.component.html"
})
export class FilesComponent implements OnInit {
    fileList;
    constructor(
        private projectContextService: ProjectContextService,
        private router: Router
    ) {}
    ngOnInit() {
        const files = this.projectContextService.getFiles();
        this.fileList = files;
    }

    openFile(fileId) {
        this.projectContextService.openFile(
            fileId
        );
    }

    showFileDetails(fileId) {
        console.log(fileId);
        this.router.navigate([`/files/${fileId}`]);
    }
}
