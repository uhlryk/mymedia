import {
    Component,
    ElementRef,
    TemplateRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild
} from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import File from "../../../../types/File";
import Tag from "../../../../types/Tag";
import { ProjectContextService } from "../../../../services/projectContext.service";

@Component({
    selector: "app-details",
    templateUrl: "./details.component.html",
    styleUrls: ["./details.component.scss"]
})
export class DetailsComponent implements OnInit {
    @Output() openFile = new EventEmitter<string>();
    @Output() showDetails = new EventEmitter<string>();

    modalRef: BsModalRef;
    constructor(
        private modalService: BsModalService,
        private projectContextService: ProjectContextService
    ) {}

    file: File;
    fileTags: Array<Tag>;
    projectTags: Array<Tag>;
    selectedTagId: string;

    @ViewChild("template", { static: false }) elementView: TemplateRef;

    show(fileId: string) {
        console.log("AAAA", fileId);
        this.projectTags = this.projectContextService.getTags().slice();
        this.file = this.projectContextService.getFile(fileId);
        this.fileTags = this.projectContextService.getFileTags(fileId);
        this.fileTags.forEach(fileTag => {
            this.projectTags.splice(
                this.projectTags.findIndex(tag => tag.id === fileTag.id),
                1
            );
        });
        this.selectedTagId = "";

        this.modalRef = this.modalService.show(this.elementView);
    }

    ngOnInit() {}

    openFile() {
        this.projectContextService.openFile(this.file.id);
    }

    addTag() {
        console.log(this.selectedTagId);
        this.projectTags.splice(
            this.projectTags.findIndex(tag => tag.id === this.selectedTagId),
            1
        );

        this.projectContextService.addTagToFile(this.file.id, this.selectedTagId);
        this.selectedTagId = "";
        this.projectContextService.saveProject().subscribe(() => {
            this.file = this.projectContextService.getFile(this.file.id);
            this.fileTags = this.projectContextService.getFileTags(this.file.id);
        });
    }

    removeTag(tagId) {
        this.projectContextService.removeTagFromFile(this.file.id, tagId);
        this.projectContextService.saveProject().subscribe(() => {
            this.file = this.projectContextService.getFile(this.file.id);
            this.fileTags = this.projectContextService.getFileTags(this.file.id);
            this.projectTags = this.projectContextService.getTags().slice();
            this.fileTags.forEach(fileTag => {
                this.projectTags.splice(
                    this.projectTags.findIndex(tag => tag.id === fileTag.id),
                    1
                );
            });
        });
    }

    saveTitle(newTitle) {
        this.file.newFileName = newTitle;
        this.projectContextService.saveProject().subscribe(() => {});
    }

    saveDescription(text) {
        this.file.description = text;
        this.projectContextService.saveProject().subscribe(() => {});
    }
}
