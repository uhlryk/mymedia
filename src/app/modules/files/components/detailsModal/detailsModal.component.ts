import {
    Component,
    TemplateRef,
    EventEmitter,
    OnInit,
    Output,
    ViewChild
} from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { ProjectContextService } from "../../../../services/projectContext.service";
import ResourceModel from "../../../../models/resource.model";
import TagModel from "../../../../models/tag.model";

@Component({
    selector: "app-details-modal",
    templateUrl: "./detailsModal.component.html",
    styleUrls: ["./detailsModal.component.scss"]
})
export class DetailsModalComponent implements OnInit {
    @Output() showDetails = new EventEmitter<string>();

    modalRef: BsModalRef;
    constructor(
        private modalService: BsModalService,
        private projectContextService: ProjectContextService
    ) {}

    resource: ResourceModel;
    availableProjectTagModelList: Array<TagModel>;
    selectedTagId: string;

    @ViewChild("template", { static: false }) elementView: TemplateRef<any>;

    show(resourceId: string) {
        this.resource = this.projectContextService.getResourceModel(resourceId);
        this.availableProjectTagModelList = this.resource.getOtherProjectTagModelList();
        this.selectedTagId = "";
        this.modalRef = this.modalService.show(this.elementView);
    }

    ngOnInit() {}

    clickOpenFile() {
        this.projectContextService.getProjectModel().open(this.resource.getId());
    }

    clickChangeRanking(value) {
        this.resource.setRanking(value);
        this.projectContextService.saveProject().subscribe(() => {});
    }

    addTag() {
        console.log(this.selectedTagId);
        this.projectContextService.addResourceTag(
            this.resource.getId(),
            this.selectedTagId
        );
        this.availableProjectTagModelList = this.resource.getOtherProjectTagModelList();
        this.selectedTagId = "";
        this.projectContextService.saveProject().subscribe(() => {});
    }

    removeTag(tagId) {
        this.projectContextService.removeResourceTag(this.resource.getId(), tagId);
        this.availableProjectTagModelList = this.resource.getOtherProjectTagModelList();
        this.selectedTagId = "";
        this.projectContextService.saveProject().subscribe(() => {});
    }

    saveTitle(newTitle) {
        this.resource.setTitle(newTitle);
        this.projectContextService.saveProject().subscribe(() => {});
    }

    saveDescription(text) {
        this.resource.setDescription(text);
        this.projectContextService.saveProject().subscribe(() => {});
    }
}
