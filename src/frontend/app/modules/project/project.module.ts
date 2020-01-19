import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ProjectPathComponent } from "./views/project-path/project-path.component";
import { ProjectContextService } from "../../services/projectContext.service";
import { ThumbnailService } from "../../services/thumbnail.service";
import { ButtonModule } from "primeng/button";
import { CheckboxModule } from "primeng/checkbox";
import { CreateProjectComponent } from "./views/create-project/create-project.component";
import { StoreModule } from "@ngrx/store";
import * as fromProjectList from "./store/reducers";
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        CheckboxModule,
        StoreModule.forFeature(
            fromProjectList.projectListFeatureKey,
            fromProjectList.reducers,
            {
                metaReducers: fromProjectList.metaReducers
            }
        )
    ],
    providers: [ProjectContextService, ThumbnailService],
    declarations: [ProjectPathComponent, CreateProjectComponent]
})
export class ProjectModule {}
