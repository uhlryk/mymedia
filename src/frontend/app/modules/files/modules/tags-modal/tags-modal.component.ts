import { Component } from "@angular/core";

// import { ProjectContextService } from "../../../../services/projectContext.service";
import { DialogService } from "primeng/api";
import {ContentComponent} from "./components/content/content.component";

@Component({
    selector: "app-tags-modal",
    template: "<div></div>",
    styleUrls: ["./tags-modal.component.scss"]
})
export class TagsModalComponent {
    // @Output() showDetails = new EventEmitter<string>();
    constructor(
        // private projectContextService: ProjectContextService,
        public dialogService: DialogService
    ) {}

    show() {
        this.dialogService.open(ContentComponent, {
            data: {
            },
            header: "Tags Manager",
            width: "90%",
            height: "100%",
            dismissableMask: true,
            contentStyle: { height: "calc(100% - 50px)", overflow: "auto" },
            autoZIndex: true,
            baseZIndex: 20000
        });
    }
}