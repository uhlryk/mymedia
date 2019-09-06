import { ChangeDetectorRef, Component, NgZone, OnInit } from "@angular/core";
import { ProjectContextService } from "../../services/projectContext.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    templateUrl: "files.component.html"
})
export class FilesComponent implements OnInit {
    fileList;
    constructor(
        private projectContextService: ProjectContextService,
        private activeRoute: ActivatedRoute,
        private cdr: ChangeDetectorRef,
        private _ngZone: NgZone
    ) {
        this.fileList = [];
        activeRoute.params.subscribe(val => {
            console.log("WWWWWWWWW");
            // const files = this.projectContextService.getFiles().slice(0,10);

            // this.cdr.markForCheck();
            // console.log("AAAAAAA");

            console.log(this.fileList);
            this.cdr.detectChanges();
            // this._ngZone.run(() => {
            this.fileList = [
                {
                    orgFileName: "A1",
                    id: 1
                },
                {
                    orgFileName: "A2",
                    id: 2
                }
            ];
            // });
        });
    }
    ngOnInit() {
        console.log("ZZZZZZZzz");
    }

    openFile(fileId) {
        const selectedFile = this.projectContextService
            .getFiles()
            .find(file => file.id === fileId);
        console.log(selectedFile);
    }
}
