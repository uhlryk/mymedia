import { Component, OnInit, ViewChild } from "@angular/core";
import { ProjectContextService } from "../../../../services/projectContext.service";
import { DetailsModalComponent } from "../../modules/details-modal/details-modal.component";
import { ThumbnailsModalComponent } from "../../modules/thumbnails-modal/thumbnails-modal.component";
import ResourceModel from "../../../../models/resource.model";
import { LoaderService } from "../../../../services/loader.service";
import { Router } from "@angular/router";
import { ThumbnailService } from "../../../../services/thumbnail.service";
import { TagsModalComponent } from "../../modules/tags-modal/tags-modal.component";
import ProjectModel from "../../../../models/project.model";
import Tag from "../../../../types/tag.type";
import TagModel from "../../../../models/tag.model";
import Card from "../../../../types/card.type";

@Component({
    templateUrl: "files.component.html",
    styleUrls: ["./files.component.scss"]
})
export class FilesComponent implements OnInit {
    @ViewChild(DetailsModalComponent, { static: true })
    detailsModal: DetailsModalComponent;

    @ViewChild(ThumbnailsModalComponent, { static: true })
    thumbnailsModal: ThumbnailsModalComponent;

    @ViewChild(TagsModalComponent, { static: true })
    tagsModal: TagsModalComponent;

    _cardList: Array<Card>;
    _projectTagList: Array<Tag>;

    _searchTagList: Array<Tag>;
    _searchText: string;
    _orderMethod: string;
    private _isLeftMenuVisible: boolean;
    // visibleSidebar = false;
    constructor(
        private projectContextService: ProjectContextService,
        private thumbnailService: ThumbnailService,
        private loaderService: LoaderService,
        private router: Router
    ) {}
    ngOnInit() {
        this._searchTagList = [];
        this._searchText = "";
        this._orderMethod = "";
        this._isLeftMenuVisible = false;
        this.loaderService.show();
        this.projectContextService
            .projectChange()
            .subscribe((projectModel: ProjectModel) => {
                console.log("FilesComponent change in project");
                this._projectTagList = this.projectContextService
                    .getProjectTagList()
                    .map((tag: TagModel) => ({
                        id: tag.getId(),
                        name: tag.getName()
                    }));
                this._cardList = projectModel
                    .getResourceCollectionModel()
                    .getList()
                    .map((resource: ResourceModel) => ({
                        id: resource.getId(),
                        ranking: resource.ranking,
                        title: resource.getTitle(),
                        thumbnailPath: resource.thumbnailPath,
                        isNew: resource.isNew(),
                        tagList: resource.getResourceTagModelList().map(tagModel => ({
                            id: tagModel.getId(),
                            name: tagModel.getName()
                        }))
                    }));
                console.log(this._cardList);
            });
        this.projectContextService.loadProject().subscribe(isProjectExist => {
            if (!isProjectExist) {
                this.router.navigate(["/create-project"]);
            } else {
                this.thumbnailService.onThumbnailChange().subscribe(response => {
                    const resourceModer: ResourceModel = this.projectContextService.getResourceModel(
                        response.resourceId
                    );
                    resourceModer.setThumbnailPath(
                        response.resourceThumbnailPath,
                        response.videoIndex
                    );
                });

                this.loaderService.hide();
            }
        });

        this.projectContextService.listenOpenTagsManager().subscribe(() => {
            this.tagsModal.show();
        });
    }

    onClickThumbnail(resourceId) {
        this.projectContextService.openResource(resourceId);
    }

    onClickDetailsButton(resourceId) {
        this.detailsModal.show(resourceId);
    }

    onChangeSearchText(searchText: string) {
        this._searchText = searchText;
    }

    onChangeSearchTagList(searchTagList: Array<Tag>) {
        this._searchTagList = searchTagList;
    }

    onChangeOrderMethod(orderMethod: string) {
        this._orderMethod = orderMethod;
    }
}
