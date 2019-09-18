import {Component, OnInit, ViewChild} from "@angular/core";
import { ProjectContextService } from "../../../../services/projectContext.service";
import { Router } from "@angular/router";
import File from "../../../../types/File";
import {DetailsComponent} from "../../components/details/details.component";

@Component({
    templateUrl: "files.component.html",
    styleUrls: ["./files.component.scss"]
})
export class FilesComponent implements OnInit {
    @ViewChild(DetailsComponent, {static: true}) detailsComponentModal: DetailsComponent;

    files: Array<File>;
    searchInput;
    constructor(
        private projectContextService: ProjectContextService,
        private router: Router
    ) {}
    ngOnInit() {
        this.files = this.projectContextService.getFiles();
    }

    openFile(fileId) {
        this.projectContextService.openFile(fileId);
    }

    showFileDetails(fileId) {
        this.detailsComponentModal.show(fileId);
        // this.router.navigate([`/files/${fileId}`]);
    }

    startSearch() {
        const projectTags = this.projectContextService
            .getTags()
            .filter(tag => tag.name.toLowerCase().includes(this.searchInput.toLowerCase()));
        this.files = this.projectContextService.getFiles().filter(file => {
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
