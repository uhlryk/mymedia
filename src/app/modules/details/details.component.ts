import { Component, OnInit } from "@angular/core";
import { ProjectContextService } from "../../services/projectContext.service";
import { FileService } from "../../services/file.service";
import { ActivatedRoute } from "@angular/router";
import File from "../../types/File";

@Component({
    selector: "app-file",
    templateUrl: "./details.component.html",
    styleUrls: ["./details.component.scss"]
})
export class DetailsComponent implements OnInit {
    file: File;
    constructor(
        private projectContextService: ProjectContextService,
        private fileService: FileService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            const fileId: string = params.get("fileId");
            this.file = this.projectContextService.getFile(fileId);
        });
    }

    openFile() {
        this.fileService.open(
            this.projectContextService.getProjectPath(),
            this.file.filePath
        );
    }
}
