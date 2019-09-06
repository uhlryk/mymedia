import { ChangeDetectorRef, Component } from "@angular/core";
// import getFileList from "./getFileList";
import { ProjectContextService } from "../../services/projectContext.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    templateUrl: "files.component.html"
})
export class FilesComponent {
    fileList = [];
    constructor(
        private projectContextService: ProjectContextService,
        private activeRoute: ActivatedRoute,
        private cdr: ChangeDetectorRef,
        private router: Router
    ) {
        activeRoute.params.subscribe(val => {
            console.log("AAAAAAAAAAa");
            console.log(this.projectContextService.getProjectPath());
            // getFileList(this.projectContextService.getProjectPath()).then(fileList => {
            //     this.fileList = fileList;
            //     this.cdr.detectChanges();
            // });
        });
    }
}
