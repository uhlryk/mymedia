import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import File from "../../../../types/File";

@Component({
    selector: "app-list",
    templateUrl: "./list.component.html",
    styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit {
    @Input() files: Array<File>;
    @Output() openFile = new EventEmitter<string>();
    @Output() showDetails = new EventEmitter<string>();

    constructor() {}

    ngOnInit() {}

    clickOpenFile(fileId:string) {
        console.log("open file", fileId);
        this.openFile.emit(fileId);
    }
    clickShowDetails(fileId:string) {
        console.log("show file", fileId);
        this.showDetails.emit(fileId);
    }
}
