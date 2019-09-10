import { Component, OnInit } from "@angular/core";
import { ProjectContextService } from "../../services/projectContext.service";
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
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            const fileId: string = params.get("fileId");
            this.file = this.projectContextService.getFile(fileId);
            // this.title = this.file.newFileName;
        });
    }

    openFile() {
        this.projectContextService.openFile(this.file.id);
    }

    saveTitle(newTitle) {
        this.file.newFileName = newTitle;
        this.projectContextService.saveProject().subscribe(() => {
        });
    }

    saveDescription(text) {
        this.file.description = text;
        this.projectContextService.saveProject().subscribe(() => {
        });
    }
}
