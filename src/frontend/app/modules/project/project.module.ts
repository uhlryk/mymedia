import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ProjectPathComponent } from "./pages/project-path/project-path.component";
import { ProjectContextService } from "../../services/projectContext.service";
import { ButtonModule } from "primeng/button";
import { CheckboxModule } from "primeng/checkbox";
import { CreateProjectComponent } from "./pages/create-project/create-project.component";
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        CheckboxModule
    ],
    providers: [ProjectContextService],
    declarations: [ProjectPathComponent, CreateProjectComponent]
})
export class ProjectModule {}
