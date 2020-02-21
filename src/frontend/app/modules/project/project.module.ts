import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ProjectListComponent } from "./views/project-list/project-list.component";
import { ProjectContextService } from "../../services/projectContext.service";
import { ButtonModule } from "primeng/button";
import { CheckboxModule } from "primeng/checkbox";
import { TableModule } from "primeng/table";
import { StoreModule } from "@ngrx/store";
import * as fromProjectList from "./store/reducers/index.reducer";
import {EffectsModule} from "@ngrx/effects";
import {ProjectListEffects} from "./store/effects/index.effect";
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        TableModule,
        CheckboxModule,
        StoreModule.forFeature(
            fromProjectList.projectListFeatureKey,
            fromProjectList.InitialResourceReducer
        ),
        EffectsModule.forFeature([ProjectListEffects])
    ],
    providers: [ProjectContextService],
    declarations: [ProjectListComponent]
})
export class ProjectModule {}
