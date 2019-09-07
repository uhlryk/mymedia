import { Component, OnInit } from "@angular/core";
import { ProjectContextService } from "../../services/projectContext.service";

@Component({
    templateUrl: "files.component.html"
})
export class FilesComponent implements OnInit {
    fileList;
    constructor(
        private projectContextService: ProjectContextService,
    ) {

    }
    ngOnInit() {
        const files = this.projectContextService.getFiles();
        this.fileList = files;
    }

    openFile(fileId) {
        const selectedFile = this.projectContextService
            .getFiles()
            .find(file => file.id === fileId);
        console.log(selectedFile);
    }
}
