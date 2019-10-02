import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ProjectPathComponent } from "./pages/project-path/project-path.component";
import { ProjectContextService } from "../../services/projectContext.service";

import { CreateProjectComponent } from "./pages/create-project/create-project.component";
@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    providers: [ProjectContextService],
    declarations: [ProjectPathComponent, CreateProjectComponent]
})
export class ProjectModule {}
