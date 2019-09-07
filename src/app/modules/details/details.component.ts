import { Component, OnInit } from "@angular/core";
import { ProjectContextService } from "../../services/projectContext.service";
import { ActivatedRoute } from "@angular/router";
const {shell} = (<any>window).require("electron");
import * as path from "path";
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
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            const fileId: string = params.get("fileId");
            this.file = this.projectContextService.getFile(fileId);
        });
    }

    openFile() {
        shell.openItem(path.join(this.projectContextService.getProjectPath(), this.file.filePath));
    }
}
