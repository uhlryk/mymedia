import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ProjectPathComponent } from "./components/project-path/project-path.component";
import { ProjectContextService } from "../../services/projectContext.service";
@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule ],
    providers: [ProjectContextService],
    declarations: [ProjectPathComponent, ]
})
export class ProjectModule {}
